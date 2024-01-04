import db from "../models/ConnectDB.js";
import queryAsync from "./query.js"


const right = async (email, method) => {
    const query =
        'SELECT * FROM account INNER JOIN account_type ON account.acc_type = account_type.id WHERE email = ?';

    try {
        const result = await queryAsync(query, [email]);

        // Process permissions
        if (
            (method === 'GET' && result[0].view !== 1) ||
            (method === 'POST' && result[0].view !== 1) ||
            (method === 'PUT' && result[0].view !== 1) ||
            (method === 'DELETE' && result[0].view !== 1)
        ) {
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error in right function:', error);
        return false;
    }
};

export default right