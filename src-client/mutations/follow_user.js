import gql from 'graphql-tag'

export default gql`
  mutation FollowUser($id: String, $follow: Boolean) {
    followUser(id: $id, follow: $follow) {
      _id
    }
  }
`
