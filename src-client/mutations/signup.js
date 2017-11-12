import gql from 'graphql-tag'

export default gql`
  mutation SignupUser($email: String, $username: String, $password: String) {
    signup(email: $email, username: $username, password: $password) {
      _id
      email
      username
      token
    }
  }
`
