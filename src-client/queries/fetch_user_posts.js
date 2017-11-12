import gql from 'graphql-tag'

export default gql`
  query FindPosts($username: String) {
    posts(username: $username) {
      _id
      text
      createdAt
      likes 
	    totalLikes
      creator {
        _id
        username
        name
      }
    }
  }
`
