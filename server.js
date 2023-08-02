const express = require('express');
const app = express();
const cors = require('cors');
const itemsRoutes = require('./routes/items');

app.use(cors());
app.use(express.json());
app.use("/items", itemsRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

module.exports = app; 
