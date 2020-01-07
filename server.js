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

app.get('/searches/new', searchForm); // function one 
app.post('/searches', getDataFromForm); // function two 
app.get ('/' , getAllBooks); // function three 
app.get('/books/detail' , addBook); // function four
app.post('/books/detail' , processBook); // function five
app.get('/books/detail/:allbooks_id' , addBookById) // function six
// app.get('/add',getDataFromHidden)// function 7
// app.post('/add',renderHiddenForm) // function 8

function handleError(error, response){
    response.render('pages/error', {error: error});
}
// function one new.ejs
function searchForm (req, res) {
    res.render('pages/searches/new');
};

// function two
function getDataFromForm(req, res) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${req.body.selectBy}+${req.body.input}`;
   return superagent.get(url)
        .then(data => {
            let element = data.body.items;
            let book = element.map(data => {return new Book(data)});
            res.render('pages/searches/show', { books: book });
        })
    };
// function three 
function getAllBooks(req ,res){
    let SQL = `SELECT * FROM books ;`;
    client.query(SQL)
    .then( data => {
        res.render('pages/index.ejs' , {allbooks : data.rows});
    }).catch(err => handleError(err));
}
// function four
function addBook(req , res){
    res.render('pages/books/detail');
}
// function five
function processBook (req ,res){
    let {title, author, isbn, image_url, description, bookshelf} =req.body;
    let SQL = `INSERT INTO books (title, author, isbn, image_url, description, bookshelf) VALUES ($1 , $2 , $3 , $4 , $5 ,$6) ;`;
    let values = [title, author, isbn, image_url, description, bookshelf];
    client.query(SQL ,values)
    .then( () => {
        res.redirect('/');
    }).catch( err => handleError(err));
}

// function six
function addBookById( req ,res){
    // from database books_id_seq
    let id = req.params.allbooks_id;
    let SQL =`SELECT * FROM books WHERE id=$1`;
    let values = [id];
    client.query(SQL ,values)
    .then ( data =>{
        res.render( 'pages/books/detail' , { bookChouse : data.rows[0]})
    }).catch(err => handleError(err));

}
//function 7 
// function getDataFromHidden(req ,res) {
//     res.render('pages/searches');
// }
// function renderHiddenForm(req,res){
//     res.redirect('pages/searches');

// }
// constractuer function 
        function Book(data) {
            // The if statment inside this function from the demo // but it's really amazing and we learn sth new 
            this.id = data.id;
            this.etag=data.etag;
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