const dataSchema = require("../modal/DataSchema")
const pollSchema  = require("../modal/PollDetails")
// Get all data
const getStatistics = async (req, res) => {
    try {
        const result = await dataSchema.aggregate([
            {
                $group: {
                    _id: "$currentPollVote", // Group by the 'currentPollVote' field
                    count: { $sum: 1 }      // Count occurrences of each value ('a', 'b', 'c', 'n')
                }
            },
            {
                $project: {
                    _id: 0,         // Exclude _id from the result
                    vote: "$_id",   // Rename _id to 'vote' to show the actual vote value ('a', 'b', 'c', 'n')
                    count: 1
                }
            }
        ]);

        // List of all possible votes
        const allVotes = ['a', 'b', 'c', 'n'];

        // Create a map of the result for easier lookup
        const resultMap = result.reduce((acc, item) => {
            acc[item.vote] = item.count;
            return acc;
        }, {});

        // Ensure all votes ('a', 'b', 'c', 'n') are included in the map with default counts
        allVotes.forEach(vote => {
            if (!resultMap[vote]) {
                resultMap[vote] = 0; // Default to 0 if no count exists for the vote
            }
        });

        const pollRes = await pollSchema.find({}, { _id: 0 });

        // Construct the final response
        res.status(200).json({
            success: true,
            data: resultMap, // Use the transformed object
            pollDetails: pollRes[0]
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const vote = async (req, res) => {
    try {
        const { vote, memberNo } = req.body;

        // Validate input
        if (!vote || !['a', 'b', 'c', 'n'].includes(vote)) {
            return res.status(400).json({
                success: false,
                message: "Invalid vote value. Allowed values are 'a', 'b', 'c', 'n'.",
            });
        }

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
                    currentPollVote: vote, // Update the currentPollVote field
                    [`votes.poll${currentPoll}`]: { // Dynamically add/update the poll entry
                        vote: vote,
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
        res.status(200).json({
            success: true,
            message: "Vote recorded successfully.",
            data: updatedMember,
        });
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

        const member = await dataSchema.findOne({memberNo:memberNo},{_id:0,votes:0,srNo:0,createdAt:0,updatedAt:0});

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
                    currentPollVote: 'n',
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

        res.status(200).json({
            success: true,
            message: "Unvoted successfully.",
            data: updatedMember,
        });
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
                    currentPollVote: 'n',
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


module.exports = {  getStatistics , vote ,getVoteDetails,unvote , newPoll};
