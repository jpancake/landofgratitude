import gql from 'graphql-tag'

export default gql`
  {
    profile: user {
      _id
    }
  }
`
