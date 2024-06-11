import mysql from "mysql";

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'booking',
})


db.connect((err) => {
    if (err) return console.log("lỗi connect DB", err.message)
        console.log("Connected the DB") 
})


export default db