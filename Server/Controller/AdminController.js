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



module.exports = {  getStatistics};
