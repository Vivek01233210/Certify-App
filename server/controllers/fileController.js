import Certificate from "../models/certificateModel.js";
import User from "../models/userModel.js";
import xlsx from "xlsx";
import { formatDate } from "../utils/dateFormatter.js";

export const fileUpload = async (req, res) => {
    try {
        const filePath = req.file.path;

        // Read the uploaded Excel file with cellDates option
        const workbook = xlsx.readFile(filePath, { cellDates: true });
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const worksheet = workbook.Sheets[sheetName];

        // Convert the sheet data to JSON
        let jsonData = xlsx.utils.sheet_to_json(worksheet);

        // Format dates in jsonData
        // jsonData = jsonData.map(row => {
        //     for (const key in row) {
        //         if (row[key] instanceof Date) {
        //             row[key] = formatDate(row[key]);
        //         }
        //     }
        //     return row;
        // });

        // console.log(jsonData);

        const mapKeys = (row) => {
            return {
                certificateId: row["Certificate ID"], // Replace with your actual keys
                studentName: row.Name, // Replace with your actual keys
                domain: row.Domain, // Replace with your actual keys
                duration: row.Duration, // Replace with your actual keys
                startDate: row["Start Date"], // Replace with your actual keys
                endDate: row["End Date"], // Replace with your actual keys
                // Add more mappings as needed
            };
        };

        // Transform the JSON data
        const transformedData = jsonData.map(mapKeys);

        console.log(transformedData)

        // Insert data into MongoDB
        await Certificate.insertMany(transformedData);

        res.status(200).json({ message: 'Data uploaded and stored successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing the file' });
    }
};
