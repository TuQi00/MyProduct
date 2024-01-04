import queryAsync from "../helpers/query.js"
import { verifyTokenAsync } from "../helpers/token.js"


export const searchAssginment = async (req, res) => {
    try {
        const limit = (req.query.limit) || 10;
        const page = (req.query.page) || 1;
        const offset = (page - 1) * limit;
        const query = `%${req.query.query}%`.toLowerCase();
    
        let sortField = ['name', 'created_date'].includes(req.query.sortField) ;
        let sortOrder = ['asc', 'desc'].includes(req.query.sortOrder) ; 
    
        let sql = `SELECT * FROM Challenges WHERE LOWER(author) LIKE ? OR LOWER(name) LIKE ? OR LOWER(description) LIKE ? LIMIT ? OFFSET ?`;
        
         if (sortField && sortOrder) { 
          sql = `SELECT * FROM Challenges WHERE LOWER(author) LIKE ? OR LOWER(name) LIKE ? OR LOWER(description) LIKE ? ORDER BY ${req.query.sortField} ${req.query.sortOrder} LIMIT ? OFFSET ?` 
          
        }
        let results = await queryAsync(sql, [query, query, query, limit, offset]);
        
        // Sort the results based on the specified fields
        
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


export const detailAssginment = async (req, res) => {
  console.log(1);
  console.log(req.body);
    res.send(req.body)

}

export const viewAssginment = async (req, res) => {
    res.send("viewAssginment")

}
