import express from "express";
import userRoute from "./routes/UserRoute.js"
import assignmentRoute from "./routes/AssignmentRoute.js"
import challengeRoute from "./routes/ChallengeRoute.js"
import questionRoute from "./routes/QuestionRoute.js"
import refreshToken from "./routes/refreshToken.js"
const app = express()
import * as dotenv from 'dotenv'
dotenv.config()

app.use(express.json())
app.use("/api/user", userRoute)
app.use("/api/assignment", assignmentRoute)
app.use("/api/challenge", challengeRoute)
app.use("/api/question", questionRoute) 
app.use("/token", refreshToken)


app.listen(process.env.PORT, () => {
   console.log(process.env.PORT);
    console.log("Connected the server")
})
