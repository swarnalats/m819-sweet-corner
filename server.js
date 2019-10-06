const express = require('express');
const cors = require('cors');
const statusError = require('./helpers/status_error');
const defaultErrorHandler = require('./middleware/default_error_handler');

const PORT = process.env.PORT || 9000;

global.StatusError = statusError;

const app = express();

app.use(cors());

const routes = require('./routes');
app.use(routes);

app.use(defaultErrorHandler);

app.listen(PORT, () => {
    console.log('Server running @localhost:' + PORT);
});