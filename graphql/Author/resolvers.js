import Author from "../../models/Author";
import Book from "../../models/Book";

const resolvers = {
    Query: {
        getAuthor: async (parent, {_id}, context, info) => {
            return await Author.findById(_id)
                .populate()
                .then(author => author)
                .catch(err => err);
        },
        getAllAuthors: async (parent, args, context, info) => {
            return await Author.find()
                .populate()
                .then(author => author)
                .catch(err => err);
        }
    },
    Mutation: {
        createAuthor: async (parent, {firstName, lastName, age}, context, info) => {
            const newAuthor = await new Author({
                firstName,
                lastName,
                age
            });

            return new Promise((resolve, reject) => {
                newAuthor.save((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            })
        },
        removeAuthor: async (parent, {_id}, context, info) => {
            return await Author.findOneAndDelete({_id});
        }
    },
    Author: {
        books: async ({_id}, args, context, info) => {
            return await Book.find({ author: _id});
        }
    }
};

export default resolvers;
