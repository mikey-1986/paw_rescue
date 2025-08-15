require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDatabase = require('./configs/database');


const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/auth/login', async (req, res) => {
    try {
        
    } catch (err) {
        res.status(400).json({ success : false, message : 'error occured while login', error : err })
    }
})

const PORT = process.env.PORT || 1833;
app.listen(PORT, () => {
    console.log(`Server Running in port : ${PORT}`);
    connectDatabase();
});