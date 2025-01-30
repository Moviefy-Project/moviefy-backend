const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
})