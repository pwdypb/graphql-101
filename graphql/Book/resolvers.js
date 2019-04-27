import Book from "../../models/Book";
import Author from "../../models/Author";

const books = "books";
const bookAdded = "bookAdded";
const bookDeleted = "bookDeleted";

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
        createBook: async (parent, {title, description, language, author}, {pubsub}, info) => {
            const newBook = await new Book({
                title,
                description,
                language,
                author
            });

            return new Promise((resolve, reject) => {
                newBook.save((err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        pubsub.publish(books, {
                            books: Book.find()
                                .populate()
                                .then(books => books)
                                .catch(err => err)
                        });
                        pubsub.publish(bookAdded, {bookAdded: newBook});
                        resolve(res);
                    }
                    // err ? reject(err) : resolve(res, pubsub.publish(books, {
                    //         books: Book.find()
                    //             .populate()
                    //             .then(books => books)
                    //             .catch(err => err)
                    //     }),
                    //     pubsub.publish(bookAdded, {bookAdded: newBook}));
                });
            })
        },
        deleteBook: async (parent, {_id}, context, info) => {
            return await Book.findOneAndDelete({_id});
        }
    },
    Subscription: {
        books: {
            subscribe: (parent, args, {pubsub}) => pubsub.asyncIterator(books)
        },
        bookAdded: {
            subscribe: (parent, args, {pubsub}) =>
                pubsub.asyncIterator(bookAdded)
        },
        bookDeleted: {
            subscribe: (parent, args, {pubsub}) =>
                pubsub.asyncIterator(bookDeleted)
        }
    },
    Book: {
        author: async ({author: authorID}, args, context, info) => {
            return await Author.findById(authorID);
        }
    }
};

export default resolvers;
