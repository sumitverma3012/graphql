import { gql } from '@apollo/client';

const getAuthorsQuery = gql`
  {
    authors{
      name
      id
    }
  }
`;


const getBooksQuery = gql`
  {
    books{
      name
      genre
      id
      author{
        name
      }
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!){
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
      id
    }
  }
`;

const getBookQuery = gql`
  query($id: ID!) {
    book(id: $id){
      name
      id
      genre
      author{
        name
        id
        age
        books{
          name
          id
        }
      }
    }
  }
`;

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery };