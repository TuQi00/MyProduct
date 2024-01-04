import db from "../models/ConnectDB.js";
import queryAsync from "../helpers/query.js"

const searchQuestion = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;
    const query = `%${req.query.query}%`;

    const sql = 'SELECT * FROM Question WHERE tags LIKE ? OR name LIKE ? LIMIT ? OFFSET ?';

    const results = await queryAsync(sql, [query, query, limit, offset]);

    if (results.length > 0) {
      return res.status(200).send(results);
    } else {
      return res.status(404).send('Cannot find Question');
    }
  } catch (error) {
    console.error('Error in searchQuestion:', error);
    return res.status(500).send('Internal Server Error');
  }
};

export default searchQuestion;
