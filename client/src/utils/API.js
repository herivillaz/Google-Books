import axios from "axios";

export default {
  // Gets all books

  getgoogleBooks: function(title) {
    return axios.get("/api/google/"+ title);
  },

  getBooks: function() {
    return axios.get("/api/google/");
  },
  // Gets the book with the given id
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    console.log(bookData);
    return axios.post("/api/books", bookData);
  }
};
