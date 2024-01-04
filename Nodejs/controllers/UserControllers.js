import SCR_key from "../utils/globals.js"
import hashPassword from "../helpers/hashPw.js"
import bcrypt from "bcrypt";
import queryAsync from "../helpers/query.js"
import { verifyTokenAsync, generateToken } from "../helpers/token.js"

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validate if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ status: 'error', message: 'Please enter email and password' });
    }

    // Retrieve user account based on the provided email
    const results = await queryAsync('SELECT * FROM account WHERE email = ?', [email]);

    if (results.length > 0) {
      const account = results[0];

      // Compare hashed password using bcrypt
      const passwordMatch = await bcrypt.compare(password, account.password);
      if (passwordMatch) {
        // Generate JWT tokens upon successful authentication

        const Accesstoken = await generateToken({ email }, '15m');
        const Refreshtoken = await generateToken({ email }, '1d');

        return res.status(200).json({ Access_token: Accesstoken, Refresh_token: Refreshtoken });
      } else {
        return res.status(401).json({ status: 'error', message: 'Invalid password' });
      }
    } else {
      return res.status(401).json({ s: 'error', message: 'Incorrect email' });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

const changepassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, reNewPassword } = req.body;
    const { token } = req.query;

    if (oldPassword === newPassword) {
      return res.status(401).json({ status: 'error', message: 'oldPassword and newPassword are the same' });
    }

    if (newPassword !== reNewPassword) {
      return res.status(401).json({ status: 'error', message: 'Passwords do not match' });
    }

    try {
      const user = await verifyTokenAsync(token, SCR_key);
      const results = await queryAsync('SELECT * FROM account WHERE email = ?', [user.email]);

      if (results.length > 0) {
        const account = results[0];
        const passwordMatch = await bcrypt.compare(oldPassword, account.password);

        if (passwordMatch) {
          const hashedPassword = await hashPassword(newPassword);

          const updateResults = await queryAsync('UPDATE account SET password = ? WHERE email = ?', [
            hashedPassword,
            user.email,
          ]);

          if (updateResults.changedRows === 1) {
            return res.status(200).json({ status: 'success', message: 'Password updated successfully' });
          } else {
            return res.status(500).json({ status: 'error', message: 'Password update failed' });
          }
        } else {
          return res.status(401).json({ status: 'error', message: 'Old Password is not correct' });
        }
      }
    } catch (error) {
      console.error('Error in changepassword:', error);
      return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

export { signin, changepassword }
