import gql from 'graphql-tag'

export default gql`
  mutation LikePost ($_id: String, $liked: Boolean) {
    likePost(_id: $_id, liked: $liked) {
      _id
      text
    }
  }
`
