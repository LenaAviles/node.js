const List = require('./../models/list');

// The GraphQL schema in string form
const listTypeDefs = `
  type ListQuery {       
    lists: [List]
    list(id: String!): List
  }
  
  type ListMutation {
    addList(list:ListInput!): List
    updateList(id: String!, list:ListInput!): List
    deleteList(id: String!): List
  }
  
  input ListInput {
    name: String!,
    boardId: String!,
    tasks: [String]
  }
  
  type List {
    id: ID
    name: String!
    boardId: String!
    tasks: [Task]
  }

  type Task {
    title: String!,
    listId: String!,
    description: String,
    category: String,
    order: Int,
    author: User,
    assignees: User
  }
`;

// The resolvers
const listResolvers = {
    ListQuery: {    
    async lists() {
      return await List.find({})
    },
    async list(root, {id}) {
      return await List.findById(id);
    },
  },

  ListMutation: {
    async addList(root, {list:listInput}) {
      const list = new List(listInput);      
      await list.save();      
      return list.toObject();
    },
    async updateList(root, {id, list:listInput}) {              
      return await List.findByIdAndUpdate(id, {$set: listInput});;
    },
    async deleteList(root, {id}) {      
      return await List.findByIdAndRemove(id);
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
    listTypeDefs,
    listResolvers
}