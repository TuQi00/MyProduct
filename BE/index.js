import express from 'express'
import bodyParser from 'body-parser'
import  queryAsync  from './helpers/query.js'
import bookingRoute from './routes/bookingRoute.js'
const app = express();
const port = 3000;

// Sử dụng body-parser để parse dữ liệu từ form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())
// CORS Middleware để cho phép frontend truy cập backend
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use("/", bookingRoute)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
