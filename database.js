const books = [
  {
    ISBN: "12345Book",
    title:"Tesla",
    pubDate: "2021-08-05",
    language: "en",
    numPage: "250",
    author:[1,2],
    publication: [1],
    category: ["tech", "space", "education"]
  },
  {
    ISBN: "123456Book",
    title:"Geeta",
    pubDate: "2021-08-05",
    language: "hin",
    numPage: "990",
    author:[2],
    publication: [2],
    category: ["divotional", "sanatan"]
  }
]

const author = [
  {
    id: 1,
    name: "Harry",
    books: ["12345Book", "secretBook"]
  },
  {
    id:2,
    name: "Ray",
    books: ["12345Book"]
  }
]

const publication = [
  {
    id: 1,
    name: "Oxford",
    books: ["12345Book"]
  },
  {
    id: 2,
    name: "Classmate",
    books: ["secretBook"]
  }
]

//exporting this data to other sources
module.exports = {books, author, publication};
