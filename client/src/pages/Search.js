import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Input, TextArea, FormBtn } from "../components/Form";
import Card from 'react-bootstrap/Card'



function Search(props) {
  const [books, setBooks] = useState([])
  const [title, setTitle] = useState("")


  // When this component mounts, grab the book with the _id of props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
const searchforBook = (e) => {
  e.preventDefault();
  API.getgoogleBooks(title)
      .then(res => {
        console.log(res.data);
        setBooks(res.data)
      })
      .catch(err => console.log(err));


}
function handleInputChange(event) {
  const { name, value } = event.target;
  setTitle(value)
};
  
function saveBook(title,author,description) {
    API.saveBook({
      title: title,
      author: author,
      description: description
    })
      .then(() => console.log("saved Book!")) 
      .catch(err => console.log(err));
};
 
  return (
      <Container fluid>
        <Row>
          <Col size="md-12">
          <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <FormBtn
                disabled={!title}
                onClick={searchforBook}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="md-12 md-offset-1" style={{display:"flex", flexWrap: "wrap"}}>
            {/* map books from google */}
            {books.map((book) =>(
              <Card style={{ width: '18rem', marginRight: 'auto'}}>
              <Card.Body>
                <Card.Img src={book.volumeInfo.imageLinks.thumbnail}></Card.Img>
            <Card.Title>{book.volumeInfo.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{book.volumeInfo.authors.join(",")}</Card.Subtitle>
                <Card.Text>
                  {book.volumeInfo.description}
                </Card.Text>
                <Card.Link href={book.volumeInfo.infoLink} target="_blank">More info</Card.Link>
                <Card.Link onClick={()=>saveBook(book.volumeInfo.title, book.volumeInfo.authors.join(", "), book.volumeInfo.description)} href="#">Save Book</Card.Link>
              </Card.Body>
            </Card>
            ))}
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/books">← Saved Books</Link>
          </Col>
        </Row>
      </Container>
    );
  }


export default Search;
