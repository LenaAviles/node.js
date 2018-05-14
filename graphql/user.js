const User = require('./../models/user');

// The GraphQL schema in string form
const userTypeDefs = `
  type Query {       
    users: [User]
    user(id: String!): User
  }
  
  type Mutation {
    addUser(user:UserInput!): User
    updateUser(id: String!, user:UserInput!): User
    deleteUser(id: String!): User
  }
  
  input UserInput {
    name: String!,
    email: String,
    password: String!
  }
  
  type User {
    id: ID
    name: String!
    email: String
    password: String!
  }
`;

// The resolvers
const userResolvers = {
  Query: {    
    async users() {
      return await User.find({})
    },
    async user(root, {id}) {
      return await User.findById(id);
    },
  },

  Mutation: {
    async addUser(root, {user:userInput}) {
      const user = new User(userInput);      
      await user.save();      
      return user.toObject();
    },
    async updateUser(root, {id, user:userInput}) {              
      return await User.findByIdAndUpdate(id, {$set: userInput});;
    },
    async deleteUser(root, {id}) {      
      return await User.findByIdAndRemove(id);
    }
  },

  // Book: {
  //   async author({authorId}) {
  //     return authors[authorId];
  //   },
  //   async authors(book) {
  //     return [authors[book.authorId]]
  //   }
  // }

}; 

module.exports = {
    userTypeDefs,
    userResolvers
}