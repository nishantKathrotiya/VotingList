const dataSchema = require("../modal/DataSchema")
const pollSchema  = require("../modal/PollDetails")


const getStatistics = async (req, res) => {
    try {
        // Get the count of votes for each party where 'votted' is 'y'
        const voteCounts = await dataSchema.aggregate([
            {
                $match: { votted: 'y' } // Only consider members who have voted ('y')
            },
            {
                $group: {
                    _id: "$party", // Group by the 'party' field (a, b, c)
                    voteCount: { $sum: 1 } // Count the number of votes per party
                }
            },
            {
                $project: {
                    _id: 0,       // Exclude _id from the result
                    party: "$_id", // Rename _id to 'party'
                    voteCount: 1   // Include the count
                }
            }
        ]);

        // List of all possible parties
        const allParties = ['a', 'b', 'c'];

        // Create a map of the result for easier lookup
        const voteCountMap = voteCounts.reduce((acc, item) => {
            acc[item.party] = item.voteCount;
            return acc;
        }, {});

        // Ensure all parties ('a', 'b', 'c') are included in the map with default vote count of 0
        allParties.forEach(party => {
            if (!voteCountMap[party]) {
                voteCountMap[party] = 0; // Default to 0 if no vote exists for the party
            }
        });

        // Get the total number of members for each party (all members, regardless of votted)
        const totalMembers = await dataSchema.aggregate([
            {
                $group: {
                    _id: "$party", // Group by the 'party' field
                    totalMembers: { $sum: 1 } // Count the total members for each party
                }
            },
            {
                $project: {
                    _id: 0,          // Exclude _id from the result
                    party: "$_id",   // Rename _id to 'party'
                    totalMembers: 1  // Include the total count
                }
            }
        ]);

        // Create a map of total members for each party
        const totalMembersMap = totalMembers.reduce((acc, item) => {
            acc[item.party] = item.totalMembers;
            return acc;
        }, {});

        // Ensure all parties ('a', 'b', 'c') are included in the map with default total members count of 0
        allParties.forEach(party => {
            if (!totalMembersMap[party]) {
                totalMembersMap[party] = 0; // Default to 0 if no members exist for the party
            }
        });

        // Get the poll details (the previous functionality)
        const pollRes = await pollSchema.find({}, { _id: 0, currentPoll: 1,totalMembers:1 });

        // Construct the final response by combining the previous details and the new vote statistics
        res.status(200).json({
            success: true,
            data: voteCountMap,       // Votes for each party (only 'votted: y')
            totalMembers: totalMembersMap, // Total members for each party
            pollDetails: pollRes[0]   // Previous poll details
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const vote = async (req, res) => {
    try {
        const {  memberNo } = req.body;

        if (!memberNo) {
            return res.status(400).json({
                success: false,
                message: "Member number is required.",
            });
        }

        // Fetch the current poll number from the Poll schema
        const pollDetails = await pollSchema.findOne();
        if (!pollDetails) {
            return res.status(404).json({
                success: false,
                message: "Poll details not found.",
            });
        }
        const currentPoll = pollDetails.currentPoll;

        // Update the member's vote and votes map
        const updatedMember = await dataSchema.findOneAndUpdate(
            { memberNo: Number(memberNo) }, // Find member by memberNo
            {
                $set: {
                    votted: 'y', // Update the currentPollVote field
                    [`votes.poll${currentPoll}`]: { // Dynamically add/update the poll entry
                        vote: 'y',
                        updatedAt: new Date(), // Record the update time
                    },
                },
            },
            { new: true } // Return the updated document
        );

        if (!updatedMember) {
            return res.status(404).json({
                success: false,
                message: "Member not found.",
            });
        }

        // Return success response
        // res.status(200).json({
        //     success: true,
        //     message: "Vote recorded successfully.",
        //     data: updatedMember,
        // });

        getStatistics(req,res);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ success: false, message: error.message });
    }
};

const getVoteDetails = async (req, res) => {
    try {
        const { memberNo } = req.params;


        if (!memberNo) {
            return res.status(400).json({
                success: false,
                message: "Member number is required.",
            });
        }

        const member = await dataSchema.findOne({memberNo:memberNo},{_id:0,memberNo:1,name:1,votted:1,party:1});

        if (!member) {
            return res.status(404).json({
                success: false,
                message: "Member not found.",
            });
        }

        // Return success response
        res.status(200).json({
            success: true,
            data: member,
        });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ success: false, message: error.message });
    }
};

const unvote = async (req, res) => {
    try {
        const { memberNo } = req.params;

        if (!memberNo) {
            return res.status(400).json({
                success: false,
                message: "memberNo is required.",
            });
        }

        // Fetch the current poll number from the pollSchema
        const poll = await pollSchema.findOne({}, { currentPoll: 1 });
        if (!poll) {
            return res.status(404).json({
                success: false,
                message: "No active poll found.",
            });
        }

        const currentPollNumber = poll.currentPoll;

        // Update the member's currentPollVote and the corresponding poll object in votes
        const updatedMember = await dataSchema.findOneAndUpdate(
            { memberNo: Number(memberNo) }, // Find the member by memberNo
            {
                $set: {
                    votted: 'n',
                    [`votes.poll${currentPollNumber}.vote`]: 'n',
                },
            },
            { new: true } // Return the updated document
        );

        if (!updatedMember) {
            return res.status(404).json({
                success: false,
                message: "Member not found.",
            });
        }

        // res.status(200).json({
        //     success: true,
        //     message: "Unvoted successfully.",
        //     data: updatedMember,
        // });
        getStatistics(req,res);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const newPoll = async (req, res) => {
    try {
        
        const poll = await pollSchema.findOneAndUpdate(
            {}, // Assuming there's only one poll document
            { $inc: { currentPoll: 1 } }, // Increment the currentPoll value
            { new: true } // Return the updated document
        );

        if (!poll) {
            return res.status(404).json({
                success: false,
                message: "No poll configuration found.",
            });
        }

        // Get the updated currentPoll value
        const currentPollNumber = poll.currentPoll;

        // Update all members' currentPollVote to 'n'
        const updateResult = await dataSchema.updateMany(
            {}, // Apply to all members
            {
                $set: {
                    votted: 'n',
                },
            }
        );

        res.status(200).json({
            success: true,
            message: "New poll created successfully.",
            currentPoll: currentPollNumber,
            membersUpdated: updateResult.nModified, // Number of members updated
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getCookies = async (req, res) => {
    try {
        
        res.cookie('user', 'JohnDoe', {
            httpOnly: false,        // makes the cookie accessible only by the server (security)
            secure: true, // ensures cookies are only sent over HTTPS in production
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: 'none'     // strict same-site policy
          });
          res.send({
            success:true
          })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {  getStatistics , vote ,getVoteDetails,unvote , newPoll,getCookies};
