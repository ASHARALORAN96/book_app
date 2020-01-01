'use strict';
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');
const app = express();

const PORT = process.env.PORT || 3000;
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {

    res.render('pages/index')


});

app.post('/searches',(req, res) => {

    const url = `https://www.googleapis.com/books/v1/volumes?q=${req.body.selectBy}+${req.body.input}`;
    superagent.get(url)
        .then(data => {
            let element = data.body.items;
            let book = element.map(data => new Book(data));
            res.render('pages/searches/show', { books: book });
        })
    });

        function Book(data) {
            // The if statment inside this function from the demo // but it's really amazing and we learn sth new 
            this.title = data.volumeInfo.title ? data.volumeInfo.title : "No Title Available";
            this.imgUrl = (data.volumeInfo.imageLinks && data.volumeInfo.imageLinks.thumbnail) ? data.volumeInfo.imageLinks.thumbnail : "https://i.imgur.com/J5LVHEL.jpg";
            this.authors = data.volumeInfo.authors ? data.volumeInfo.authors : "No Authors";
            this.desc = data.volumeInfo.description ? data.volumeInfo.description : "No description available";
        }





app.get('*', (req, res) => {
    res.status(404).send('not found');
});
client.connect()
.then( () => {
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
});