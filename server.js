const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({
  extended: false
}));

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use('/api/county', require('./routes/api/county'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`));