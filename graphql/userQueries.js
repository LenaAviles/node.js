const query = `query getUsers {    
    users {
        id
        name
        email    
    }     
  }
  
  query getUser {
    user(id: "5af7d753c8b18d10803db1d1"){
      id
      name
      email
    }
  }
  
  mutation updateUser {
    updateUser(id: "5af7d753c8b18d10803db1d1", user: {name: "user19", password: "1919"}) {
      id
      name
      email
    }
  }
  
  mutation addUser {
    addUser(user: {name: "user19", password: "1919"}) {
      id
      name
      email
    }
  }
  
  mutation deleteUser {
    deleteUser(id: "5af7d753c8b18d10803db1d1") {
      id
      name
      email
    }
  }`;

  module.exports = query;