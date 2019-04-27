import Book from "../../models/Book";
import Author from "../../models/Author";

const resolvers = {
    Query: {
        getBook: async (parent, {_id}, context, info) => {
            return await Book.findById(_id)
                .populate()
                .then(book => book)
                .catch(err => err);
        },
        getAllBooks: async (parent, args, context, info) => {
            return await Book.find()
                .populate()
                .then(book => book)
                .catch(err => err);
        }
    },
    Mutation: {
        createBook: async (parent, {title, description, language, author}, context, info) => {
            const newBook = await new Book({
                title,
                description,
                language,
                author
            });

            return new Promise((resolve, reject) => {
                newBook.save((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            })
        },
        deleteBook: async (parent, {_id}, context, info) => {
            return await Book.findOneAndDelete({_id});
        }
    },
    Book: {
        author: async ({author: authorID}, args, context, info) => {
            return await Author.findById(authorID);
        }
    }
};

export default resolvers;
