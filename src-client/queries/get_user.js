import gql from 'graphql-tag'

export default gql`
  {
    user {
      _id
      email
	    username
	    age
	    location
	    name
	    website
	    description
	    createdAt
	    posts {
	    	_id
	    	text
		    createdAt
		    likes
		    totalLikes
		    creator {
			    _id
			    name
			    username
		    }
	    }
	    followers {
		    posts {
			    _id
			    text
			    createdAt
			    likes
			    creator {
				    _id
				    name
				    username
			    }
		    }
	    }
    }
  }
`
