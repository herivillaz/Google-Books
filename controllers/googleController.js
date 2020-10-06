const axios = require('axios');
// Defining methods for the booksController
module.exports = {

 findbytitle: function(req, res) {
     console.log(req.params.title);
    axios.get ("https://www.googleapis.com/books/v1/volumes?q="+req.params.title)
      
      .then(googleResponse => {
          res.json(googleResponse.data.items)
      })
      .catch(err => res.status(422).json(err));
  },
//   findById: function(req, res) {
//     db.Book
//       .findById(req.params.id)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   }
}