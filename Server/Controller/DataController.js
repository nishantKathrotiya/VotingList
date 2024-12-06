const dataSchema = require("../modal/DataSchema")

// Get all data
const getAllData = async (req, res) => {
    try {
        const data = await dataSchema.find({},{memberNo:1,name:1,address:1,currentPollVote:1,_id:0}); // Fetch all documents from the 'User' collection
        res.status(200).json({
            success: true,
            data:data
        }); // Respond with the fetched data
    } catch (error) {
        res.status(500).json({ success:false,message: error.message });
    }
};

const getDataByName = async (req, res) => {
    const { name } = req.query; // Extract the 'name' query parameter


    if (!name) {
        return res.status(400).json({ error: "Name query parameter is required." });
    }

    try {
        // Use regex for case-insensitive partial matching
        const data = await dataSchema.find({ name: { $regex: name, $options: 'u' } });

        if (data.length === 0) {
            return res.status(404).json({ message: "No data found with the given name." });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ success:false,message: error.message });
    }
};

const getDataByMemberID = async (req, res) => {
    const { memberNo } = req.params; // Extract the 'name' query parameter


    if (!memberNo) {
        return res.status(400).json({ success:false,message: "memberNo query parameter is required." });
    }

    try {
        // Use regex for case-insensitive partial matching
        const data = await dataSchema.find({memberNo});
     
        if (data.length === 0) {
            return res.status(404).json({ message: "No data found with the given name." });
        }

        res.status(200).json({
            success:true,
            data:data[0],
        });
    } catch (error) {
        res.status(500).json({ success:false,message: error.message });
    }
};

const updateMember = async (req, res) => {
    const { memberNo } = req.params; 
    const {data} = req.body; 

    if (!memberNo) {
        return res.status(400).json({ 
            success: false, 
            message: "Member number (memberNo) is required." 
        });
    }

    try {
        // Check if member exists
        const member = await dataSchema.findOne({ memberNo: Number(memberNo) });
        if (!member) {
            return res.status(404).json({
                success: false,
                message: "Member not found.",
            });
        }

        // Update member details
        const updatedMember = await dataSchema.findOneAndUpdate(
            { memberNo: Number(memberNo) }, // Find member by memberNo
            { $set:data }, 
            { new: true} // Return the updated document
        );

        res.status(200).json({
            success: true,
            data: updatedMember,
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

const addressUpdates = async (req, res) =>  {
    try {
        const addresses = await dataSchema.distinct('address');
         res.send({length:addresses.length , count:addresses})
    } catch (error) {
        console.error('Error fetching distinct addresses:', error);
    }
}


module.exports = { getAllData, getDataByName,getDataByMemberID,updateMember,addressUpdates };
