import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook( $book: String!) {
    saveBook( book: $book) {
      _id
      username
      savedBooks{
        bookId,
        title, 
        description, 
        authors,
        link,
        image
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(book: $bookId) {
      _id
      username
      savedBooks {
        bookId,
        title, 
        description, 
        authors,
        link,
        image
      }s
    }
  }
`;


