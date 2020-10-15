import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import { Link } from "react-router-dom";
import {Card, Row, Col, Container, Jumbotron} from 'react-bootstrap'


function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks()
  }, [])

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then(res =>
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  // function handleFormSubmit(event) {
  //   event.preventDefault();
  //   if (formObject.title && formObject.author) {
  //     API.saveBook({
  //       title: formObject.title,
  //       author: formObject.author,
  //       synopsis: formObject.synopsis
  //     })
  //       .then(res => loadBooks())
  //       .catch(err => console.log(err));
  //   }
  // };

  return (

    <Container>
      <Row>
        <Jumbotron>
          <h1>Books On My List</h1>
        </Jumbotron>
      </Row>
      <Row>
        {books.length ? (
          <Col>
            {books.map(book => (



                <Card key={book._id}style={{ width: '18rem', marginRight: 'auto' }}>
                  <Card.Body>
                    <DeleteBtn onClick={() => deleteBook(book._id)} />
                    <Card.Img src={book.image}></Card.Img>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{book.authors}</Card.Subtitle>
                    <Card.Text>
                      {book.description}
                    </Card.Text>
                    <Card.Link href={book.link} target="_blank">More info</Card.Link>
                    {/* <Card.Link onClick={()=>saveBook(book.volumeInfo.title, book.volumeInfo.authors.join(", "), book.volumeInfo.description)} href="#">Save Book</Card.Link> */}
                  </Card.Body>
                </Card>



            ))}
          </Col>
        ) : (
            <h3>No Results to Display</h3>
          )}

      </Row>
    </Container>
  );
}


export default Books;
