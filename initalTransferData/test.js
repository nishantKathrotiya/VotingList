const fs = require("fs");
const XLSX = require("xlsx");
const DataModel = require("./dataModal");
const pollModal = require('./PollSchema')
const mongoose = require("mongoose");

//Provide XLSX File to Get Data and Store to DB
const excelFilePath = "path_to_xlsx.xlsx";
const workbook = XLSX.readFile(excelFilePath);

// Get the first sheet
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Step 2: Convert the sheet data to JSON format
const jsonData = XLSX.utils.sheet_to_json(sheet);
const batchSize = 10;  // Adjust batch size (number of documents per batch)
const totalRecords = jsonData.length;

const url = 'DBURL';  

mongoose.connect(url).then(() => {
    console.log("Connected to MongoDB using Mongoose");
    uploadData();
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });


  const uploadData = async () => {
    try {
      let batchStart = 0;
      let batchEnd = batchSize;
  
      console.log(`Starting insertion of ${totalRecords} records...`);
  
      while (batchStart < totalRecords) {
        const batchData = jsonData.slice(batchStart, batchEnd);
  
        try {
          const result = await DataModel.insertMany(batchData);
          console.log(`${result.length} records inserted from ${batchStart + 1} to ${batchEnd}`);
        } catch (error) {
          console.error('Error inserting batch:', error);
        }
  
        // Move to the next batch
        batchStart += batchSize;
        batchEnd = Math.min(batchStart + batchSize, totalRecords);  // Ensure batchEnd doesn't go beyond total records
      }
  
      console.log('Data upload completed.');
      uploadPoll(totalRecords);
      
    } catch (error) {
      console.error("Error during data upload:", error);
    }
  };

  const uploadPoll = async(totalRecords)=>{
    try {
      
          const result = await pollModal.create({
            currentPoll:1,
            totalMembers:totalRecords,
          });
          mongoose.connection.close();
    } catch (error) {
      console.error("Error during data upload:", error);
    }
  }
