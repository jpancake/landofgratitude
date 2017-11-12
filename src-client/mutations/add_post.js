import gql from 'graphql-tag'

export default gql`
  mutation AddPost($text: String, $createdAt: Float) {
    addPost(text: $text, createdAt: $createdAt) {
      _id
      text
      createdAt
    }
  }
`
