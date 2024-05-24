require('dotenv').config();

const app = require('./app');

require('./db');

const PORT = 8080;

app.listen( {port: PORT}, () => {
    console.log(`Server started on port ${PORT}`);
});