import SCR_key from "../utils/globals.js"
import queryAsync from "../helpers/query.js"
import { verifyTokenAsync } from "../helpers/token.js"

const detailChallenge = async (req, res) => {
  try {
    const challengeId = parseInt(req.params.id);

    if (Number.isNaN(challengeId) || challengeId < 0) {
      return res.status(400).json({ status: 'error', message: 'Invalid challenge ID' });
    }

    const sql = 'SELECT * FROM Challenges WHERE id = ?';

    const results = await queryAsync(sql, [challengeId]);

    if (results.length > 0) {
      return res.status(200).json({ status: 'success', data: results[0] });
    } else {
      return res.status(404).json({ status: 'error', message: 'Challenge ID not found' });
    }
  } catch (error) {
    console.error('Error in detailChallenge:', error);
    return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

const searchChallenge = async (req, res) => {
  try {
    const limit = (req.query.limit) || 10;
    const page = (req.query.page) || 1;
    const offset = (page - 1) * limit;
    const query = `%${req.query.query}%`.toLowerCase();

    let sortField = ['name', 'created_date'].includes(req.query.sortField) ;
    let sortOrder = ['asc', 'desc'].includes(req.query.sortOrder) ; 

    let sql = `SELECT * FROM Challenges WHERE LOWER(author) LIKE ? OR LOWER(name) LIKE ? OR LOWER(description) LIKE ? LIMIT ? OFFSET ?`;
    
     if (sortField && sortOrder) { 
      sql = `SELECT * FROM Challenges
      WHERE LOWER(author) LIKE ? OR LOWER(name) LIKE ? OR LOWER(description) LIKE ?
      ORDER BY ${req.query.sortField} ${req.query.sortOrder}
      LIMIT ? OFFSET ?
      `
       
      
    }
    let results = await queryAsync(sql, [query, query, query, limit, offset]);
    
    // Sort the results based on the specified fields
    await sortResults(results,sortField,sortOrder)
    if (results.length > 0) {
      
      return res.status(200).json(results);
    } else {
      return res.status(404).json({ status: 'error', message: 'Cannot find Challenge' });
    }
  } catch (error) {
    console.error('Error in searchChallenge:', error);
    return res.status(500).json({ status: 'error', message: 'Internal Server Error', error: error });
  }
};

const viewChallenge = async (req, res) => {
  const limit = parseInt(req.query.limit) || 3;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;

  const sql =
    'SELECT submission.*, account.email FROM submission JOIN account ON submission.account = account.id WHERE email = ? LIMIT ? OFFSET ?';

  try {
    const result = await verifyTokenAsync(req.query.token, SCR_key);
    const email = result.email;

    const results = await queryAsync(sql, [email, limit, offset]);

    if (results.length > 0) {
      return res.status(200).json(results);
    } else {
      return res.status(404).json({ status: 'error', message: 'Challenge not found' });
    }
  } catch (jwtError) {
    console.error('Error verifying JWT:', jwtError);
    return res.status(401).json({ status: 'error', message: 'Unauthorized', error: jwtError });
  }
};

const sortResults = (results, sortField, sortOrder) => {
  return results.sort((a, b) => {
    const valueA = a[sortField];
    const valueB = b[sortField];

    if (sortOrder === 'asc') {
      return valueA - (valueB);
    } else {
      return valueB - (valueA);
    }
  });
};  

export { viewChallenge, searchChallenge, detailChallenge }