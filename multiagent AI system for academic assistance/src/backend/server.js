const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

const chatRoutes = require('./routes/chatRoutes');
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
    res.send("Academic Agent Hub Online.");
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server executing securely on port ${PORT}`);
});