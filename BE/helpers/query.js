import db from "../models/ConnectDB.js";
 // Wrap db.query in a promise-based function


 const queryAsync = (sql, values) => {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
export default queryAsync