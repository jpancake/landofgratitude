import gql from 'graphql-tag'

export default gql`
  query FetchLikedPosts($username: String){
    likedPosts(username: $username) {
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
