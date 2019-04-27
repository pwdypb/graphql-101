const typeDefs = `
    type Book {
        _id: ID!
        title: String!
        description: String!
        language: String!
        author: Author!
    }
`;

export default typeDefs;
