require('dotenv').config();
const express = require('express');
const cors = require('cors');

const routes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json({
  limit: '50mb'
}));

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('', routes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
