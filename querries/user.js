import gql from 'graphql-tag'

const GET_USER_NAME = gql`
  query {
    viewer {
      username
    }
  }
`
const REGISTER_USER = gql`
  mutation($input: RegisterUserInput!) {
    registerUser(input: $input) {
      user {
        username
      }
    }
  }
`
const GET_USER_DATA = gql`
  query {
    viewer {
      description
      email
      firstName
      lastName
      username
    }
  }
`

export { GET_USER_NAME, REGISTER_USER, GET_USER_DATA }
