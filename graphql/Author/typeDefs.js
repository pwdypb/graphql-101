const typeDefs = `
    type Author {
        _id: ID!
        firstName: String!
        lastName: String!
        age: Int!
        books: [Book!]!
    },
    type Query {
        getAuthor(_id: ID!): Author!
        getAllAuthors: [Author!]!
    }
`;

export default typeDefs;
