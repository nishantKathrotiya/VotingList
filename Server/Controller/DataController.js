const dataSchema = require("../modal/DataSchema")

// Get all data
const getAllData = async (req, res) => {
    try {
        const data = await dataSchema.find(); // Fetch all documents from the 'User' collection
        res.status(200).json(data); // Respond with the fetched data
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle errors
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
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllData, getDataByName };
