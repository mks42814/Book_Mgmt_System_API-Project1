//-----BOOK MANAGEMENT SYSTEM -----//

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

//inport database
const database = require("./database");
//initialize express
const booky = express(); //instance

//for POST REQUEST
booky.use(bodyParser.urlencoded({extended: true})); //allows express to read the body and pass it in json format
booky.use(bodyParser.json());

//mongodb connection
mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connection Established with server!"));

//==================BOOKS=================
//to GET all the BOOKS
/*
route : /
descripiton   get/print all the BOOKS
ACCESS    PUBLIC
parameters  None
methods     GET
*/
booky.get("/",(req, res) => {
  return res.json({books: database.books});
});

//to GET a specific books
/*
route : /is/book-isbn
descripiton get/print a specific BOOK
ACCESS    PUBLIC
parameters  book-isbn
methods     GET
*/
booky.get("/is/:isbn", (req, res) => {
  const getSpecificBook = database.books.filter (
    (book) => book.ISBN === req.params.isbn
  );
  if(getSpecificBook.length === 0){
    return res.json({error: `No book found  for the ISBN of ${req.params.isbn}`});
  }

  return res.json({book: getSpecificBook});
})

//to get a specific book on category
/*
route : /c/category-name
descripiton   get the specific category BOOK
ACCESS    PUBLIC
parameters  category-name
methods     GET
*/
booky.get("/c/:category", (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.category.includes(req.params.category)
  )

  if(getSpecificBook.length === 0) {
    return res.json({error:`No book found for the categroy of ${req.params.category}`})
  }

  return res.json({book: getSpecificBook});
});

//to get specific books on language
/*
route : /lang/language-name
descripiton   get the specific BOOK
ACCESS    PUBLIC
parameters  language-name
methods     GET
*/
booky.get("/lang/:language", (req, res) => {
  const getSpecificBook = database.books.filter (
    (book) => book.language === req.params.language
  );
  if(getSpecificBook.length === 0){
    return res.json({error: `No book found for the language of ${req.params.language}`});
  }

  return res.json({book: getSpecificBook});
})

// ==================AUTHOR=================

//to get all  author s
/*
route : /author
descripiton   get the all authors
ACCESS    PUBLIC
parameters  none
methods     GET
*/
booky.get("/author/",(req, res) => {
  return res.json({authors: database.author});
});

/*
route : /author/is/author-id
descripiton   get the specific authors based on his/her id
ACCESS    PUBLIC
parameters  author-id
methods     GET
*/
booky.get("/author/is/:id", (req, res) => {
  const getSpecificAuthor = database.author.filter (
    (author) => author.id === parseInt(req.params.id)
  );
  if(getSpecificAuthor.length === 0){
    return res.json({error: `No author found for the author id of ${req.params.id}`});
  };

  return res.json({author: getSpecificAuthor});
});

/*
route : /author/book/book-name
descripiton   get the all authors of a book
ACCESS    PUBLIC
parameters  book-name
methods     GET
*/
booky.get("/author/book/:book", (req, res) => {
  const getSpecificAuthor = database.author.filter (
    (author) => author.books.includes(req.params.book)
  );
  if(getSpecificAuthor.length === 0){
    return res.json({error: `No author found for the book of ${req.params.book}`});
  }
  return res.json({authors: getSpecificAuthor});
});

// ==================PUBLICATION=================

/*
route : /publications
descripiton   get the all publications
ACCESS    PUBLIC
parameters  none
methods     GET
*/
booky.get("/publications/",(req, res) => {
  return res.json({publications: database.publication});
});

/*
route : /publication/publication-id
descripiton   get the a publication by its id
ACCESS    PUBLIC
parameters  publication-id
methods     GET
*/
booky.get("/publications/is/:id", (req, res) => {
  const getSpecificPublication = database.publication.filter (
    (publication) => publication.id === parseInt(req.params.id)
  );
  if(getSpecificPublication.length === 0){
    return res.json({error: `No publication found for the publication id of ${req.params.id}`});
  };
  return res.json({publication: getSpecificPublication});
});

/*
route : /publications/book/book-name
descripiton   get the all publications of a book
ACCESS    PUBLIC
parameters  book-name
methods     GET
*/
booky.get("/publications/book/:book", (req, res) => {
  const getSpecificPublication = database.publication.filter (
    (publication) => publication.books.includes(req.params.book)
  );
  if(getSpecificPublication.length === 0){
    return res.json({error: `No author found for the book of ${req.params.book}`});
  }
  return res.json({publication: getSpecificPublication});
});

//POST methods

//ADD new book
/*
route : /book/new
descripiton   add new books
ACCESS    PUBLIC
parameters  none
methods     POST
*/

booky.post("/book/new", (req,res) => {
  const newBook = req.body;
  database.books.push(newBook);
  return res.json({updatedBooks: database.books});
});

//ADD new author
/*
route : /author/new
descripiton   add new authors
ACCESS    PUBLIC
parameters  none
methods     POST
*/

booky.post("/author/new", (req,res) => {
  const newAuthor = req.body;
  database.author.push(newAuthor);
  return res.json({updatedAuthor: database.author});
});

//ADD new publication
/*
route : /publication/new
descripiton   add new publications
ACCESS    PUBLIC
parameters  none
methods     POST
*/

booky.post("/publication/new", (req,res) => {
  const newPublication = req.body;
  database.publication.push(newPublication);
  return res.json({updatedPublication: database.publication});
});

//PUT methods

//ADD new publication for a specific book
/*
route : /publication/update/book/
descripiton   update/add new publications for a book
ACCESS    PUBLIC
parameters  isbn
methods     put
*/

booky.put("/publication/update/book/:isbn", (req, res) => {
  //update the publication database
  database.publication.forEach((pub) => {
      if(pub.id === req.body.pubId) {
        return pub.books.push(req.params.isbn)
      }
  });
  //update the books database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.publication = req.body.pubId;
      return;
    }
  });
//printing the books and publication database
  return res.json(
    {
      bools: database.books,
      publications: database.publication,
      message:"Successfully updated publication"
    }
  );
});

//DELETE methods

//DELETE a specific book
/*
route : /book/delete/
descripiton   delete a book
ACCESS    PUBLIC
parameters  isbn
methods     delete
*/
booky.delete("/book/delete/:isbn", (req,res) => {
  //whichever book that doesnt match witn the isbn just send it an updated databaseBookDatabase array and rest will be filtered out
  const updatedBookDatabase = database.books.filter (
    (book) => book.ISBN !== req.params.isbn
  )
  database.books = updatedBookDatabase;

  return res.json({ books: database.books});
});

//DELETE a specific author from a specific book
/*
route : /book/delete/author/
descripiton   delete a author
ACCESS    PUBLIC
parameters  isbn and authorId
methods     delete
*/

booky.delete("/book/author/delete/:isbn/:authorId", (req, res) => {
  //update the book database
  database.books.forEach((book) => {
    if(book.ISBN === req.params.isbn) {
      const newAuthorList = book.author.filter(
        (eachAuthor) => eachAuthor !== parseInt (req.params.authorId)
      );
      book.author = newAuthorList;
      return;
    }
  })

return res.json ({
  book:database.books,
  message:`"Author was deleted from the book ${req.params.isbn}"`
});
});


//DELETE  a specific author from book and book form the author
/*
route : /book/delete/author/
descripiton   delete a author
ACCESS    PUBLIC
parameters  isbn and authorId
methods     delete
*/

booky.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
  //update the book database
  database.books.forEach((book) => {
    if(book.ISBN === req.params.isbn) {
      const newAuthorList = book.author.filter(
        (eachAuthor) => eachAuthor !== parseInt (req.params.authorId)
      );
      book.author = newAuthorList;
      return;
    }
  })
  //update the author database
database.author.forEach((eachAuthor) => {
  if(eachAuthor.id === parseInt(req.params.authorId)) {
    const newBookList = eachAuthor.books.filter (
      (book) => book !== req.params.isbn
    );
    eachAuthor.books = newBookList;
    return;
  }
});
return res.json ({
  book:database.books,
  author: database.author,
  message:"Author was deleted from the database"
});
});

// ==============Server Status=============
booky.listen(3000, () => {
  console.log("Server is up and running on port: 3000");
});
