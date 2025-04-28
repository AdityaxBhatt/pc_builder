require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require("./configs/db.js");
const componentsRoutes = require('./routes/componentsRoutes.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/components',componentsRoutes);

app.get('/',(req, res)=>{
    res.send('Pc builder is running');
});

app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW();");
        res.json({ message: "Database connected!", time: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`);
})
module.exports = app;
