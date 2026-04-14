const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const nodemailer = require("nodemailer")
const mongoose = require("mongoose")

dotenv.config()

const app = express()
app.use(express.json({ limit: "20kb" }))

const allowedOrigins = (process.env.CLIENT_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }
      return callback(new Error("Not allowed by CORS"))
    },
  }),
)

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, maxlength: 150 },
    subject: { type: String, required: true, trim: true, maxlength: 150 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
  },
  { timestamps: true },
)

const Message = mongoose.model("Message", messageSchema)

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

function buildEmailBody(data) {
  const safeText = (value) => String(value || "").replace(/\r?\n/g, "<br>")

  return `
    <h2>New Portfolio Message</h2>
    <p><strong>Name:</strong> ${safeText(data.name)}</p>
    <p><strong>Email:</strong> ${safeText(data.email)}</p>
    <p><strong>Subject:</strong> ${safeText(data.subject)}</p>
    <p><strong>Message:</strong><br>${safeText(data.message)}</p>
  `
}

app.get("/health", (req, res) => {
  res.json({ ok: true })
})

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body || {}

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ ok: false, error: "Missing required fields." })
  }

  try {
    await Message.create({ name, email, subject, message })

    const mailFrom = process.env.MAIL_FROM || process.env.SMTP_USER
    const mailTo = process.env.MAIL_TO || process.env.SMTP_USER

    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: buildEmailBody({ name, email, subject, message }),
    })

    return res.json({ ok: true })
  } catch (error) {
    console.error("Contact submission failed:", error)
    return res.status(500).json({ ok: false, error: "Failed to send message." })
  }
})

const port = Number(process.env.PORT || 5000)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Contact server running on port ${port}`)
    })
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error)
    process.exit(1)
  })
