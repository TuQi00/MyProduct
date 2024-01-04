import jwt from "jsonwebtoken";
import SCR_key from "../utils/globals.js"
import right from "./right.js";


const validateToken = async (req, res, next) => {
    try {
      if (req.query.token) {
        const result = await verifyTokenAsync(req.query.token, SCR_key);
        // Check user permissions
        const email = result.email;
        const hasAccess = await right(email, req.method);
  
        if (!hasAccess) {
          return res.status(401).json({ status: 'error', message: 'You do not have access' });
        }
  
        next();
      } else {
        return res.status(401).json({ status: 'error', message: 'Please sign in again' });
      }
    } catch (error) {
      console.error('Error validating token:', error);
      return res.status(401).json({ status: 'error', message: 'Unauthorized', error });
    }
};

// Assuming you have a function to promisify jwt.verify
const verifyTokenAsync = (token, key) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, key, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

const createAccessToken = async (req, res) => {
    try {
        const { RefreshToken } = req.query;

        const result = await verifyTokenAsync(RefreshToken, SCR_key);

        const Accesstoken = jwt.sign({ email: result.email }, SCR_key, { expiresIn: '1d' });
        return res.status(200).json({ status: 'success', accessToken: Accesstoken });
    } catch (err) {
        console.error('Error verifying refresh token:', err);
        return res.status(401).json({ status: 'error', message: 'Unauthorized', error: err });
    }
};

const generateToken = async (payload, expiresIn = '15m') => {
    const Token = jwt.sign(payload, SCR_key, { expiresIn });
    return Token;
};


export { validateToken, verifyTokenAsync, createAccessToken, generateToken }