import gql from 'graphql-tag'

export default gql`
  query fetchProfile($username: String) {
    userProfile: user(username: $username) {
      _id
      email
      username
      age
      location
      name
      website
      description
      createdAt
    }
  }
`

