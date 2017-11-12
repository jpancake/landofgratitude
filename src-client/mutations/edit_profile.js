import gql from 'graphql-tag'

export default gql`
  mutation EditProfile($age: Int, $location: String, $website: String, $description: String, $name: String) {
    editProfile(age: $age, location: $location, website: $website, name: $name, description: $description) {
      age
      location
      website
      email
      name
      description
    }
  }
`
