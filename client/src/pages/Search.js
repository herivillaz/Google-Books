import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Input, TextArea, FormBtn } from "../components/Form";



function Search(props) {
  const [books, setBooks] = useState({})
  const [title, setTitle] = useState("")


  // When this component mounts, grab the book with the _id of props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
const searchforBook = () => {
  API.getBook(title)
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
          <Col size="md-10 md-offset-1">
            {/* map books from google */}
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Authors</Link>
          </Col>
        </Row>
      </Container>
    );
  }


export default Search;
