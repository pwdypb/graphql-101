const typeDefs = `
    type Book {
        _id: ID!
        title: String!
        description: String!
        language: String!
        author: Author
    },
    type Query {
        getBook(_id: ID!): Book!
        getAllBooks: [Book!]!
    }
`;

export default typeDefs;
