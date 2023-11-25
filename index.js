const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db')
const port = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(cors());

app.get('/api/countries', (req, res) => {

    let query = 'SELECT * FROM countries;';

    if(req.query.sort?.toLocaleLowerCase() === 'true' && req.query.visited?.toLocaleLowerCase() === 'true'){
        query = 'SELECT * FROM countries as c WHERE c.visited = true AND ORDER BY c.name ASC;';
    } else if(req.query.sort?.toLocaleLowerCase() === 'true'){
        query = 'SELECT * FROM countries as c ORDER BY c.name ASC;';
    }else if(req.query.visited?.toLocaleLowerCase() === 'true'){
        query = 'SELECT * FROM countries as c WHERE c.visited = true;';
    }

    pool.query(query)
    .then((data) => {res.json(data)})
    .catch((err) => res.status(500).json({ error: 'There was a problem with the request' }))

    // url = '/api/countries'
    // SELECT * FROM countries as c;

    // url = '/api/countries?sort=true'
    // SELECT * FROM countries as c
    // ORDER BY c.name ASC;

    // url = '/api/countries?visited=true'
    // SELECT * FROM countries as c
    // WHERE c.visited = true;

    // url = '/api/countries?sort=true&visited=true'
    // SELECT * FROM countries as c
    // WHERE c.visited = true 
    // AND ORDER BY c.name ASC;

});


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}/api/countries`);
});
