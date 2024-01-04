/**
 * Processing Account model with database
 */

import { getInsertQuery, getReturnObject } from "../utils/structure.js";
import  db  from "../models/ConnectDB.js"

/**
 * Check email exists or not
 * @param {string} email The email needs to be checked if it already exists
 * @returns {object} ReturnObject
 */
const checkNotExist = async (email) => {
    let isNotExisted = true
    let result = getReturnObject("success", {isNotExisted});

    const q = "SELECT * FROM account WHERE email = ?"

    await new Promise((resolve, reject) => {
        db.query(q, [email], (err, data) => {
            if (err) {
                result = getReturnObject("error", {err})
                
            }
            else if (data.length > 0) {
                isNotExisted = false
                result = getReturnObject("fail", {isNotExisted})
            }
            resolve(result)
        })
        
        
    })
    
    return result
}
const checkFill = async (email, password) => {
    if (!email || !password) {
      return res.status(401).send('Please enter in full'); // nếu có ít nhất một trong hai tham số là rỗng
    }
  }
export {checkNotExist, checkFill};