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
    Author: {
        books: async ({_id}, args, context, info) => {
            return await Book.find({ author: _id});
        }
    }
};

export default resolvers;
