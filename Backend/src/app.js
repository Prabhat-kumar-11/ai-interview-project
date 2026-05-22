const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const dns = require("dns")


const app = express()
dns.setServers(["1.1.1.1", "8.8.8.8"])
const allowedOrigins = [ "http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174" ]

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true)
        }

        callback(new Error("Not allowed by CORS"))
    },
    credentials: true
}))

/* require all the routes here */
const authRouter = require("./routes/authRoutes")
const interviewRouter = require("./routes/interviewRoutes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

app.use((err, req, res, next) => {
    if (err?.name === "MulterError") {
        return res.status(400).json({
            message: err.code === "LIMIT_FILE_SIZE" ? "Resume PDF must be 5MB or smaller" : err.message
        })
    }

    if (err?.message === "Only PDF resume files are allowed") {
        return res.status(400).json({
            message: err.message
        })
    }

    if (err?.code === 11000) {
        return res.status(409).json({
            message: "A record with these details already exists"
        })
    }

    const aiStatus = err?.status || err?.error?.code
    const aiMessage = err?.message || ""

    if (aiStatus === 503 || aiMessage.includes("UNAVAILABLE") || aiMessage.includes("high demand")) {
        console.warn("AI service temporarily unavailable:", aiMessage)
        return res.status(503).json({
            message: "AI service is busy right now. Please try again in a few minutes."
        })
    }

    console.error(err)

    res.status(500).json({
        message: "Something went wrong. Please try again."
    })
})


module.exports = app
