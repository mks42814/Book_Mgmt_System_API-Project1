//book management project

const express = require("express");
//database
const database = require("./database");
//initialize express
const booky = express(); //instance

// ==================BOOKS=================
//to get all the BOOKS
/*
route : /
descripiton get all the BOOKS
ACCESS    PUBLIC
parameters  None
methods     get
*/
booky.get("/",(req, res) => {
  return res.json({books: database.books});
});

//to get a specific books
/*
 : /is/book-isbn
descripiton get the specific BOOK
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
descripiton   get the specific BOOK
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


// ==============Server Status=============
booky.listen(3000, () => {
  console.log("Server is up and running on port: 3000");
});
