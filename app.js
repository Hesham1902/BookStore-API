const express = require("express");
// const { getDb, connectToDb } = require("./db");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Book = require("./models/books");
// init app & middleware
const app = express();
app.use(express.json());

//using Mongoose
const MONGODB_URI = "mongodb://localhost:27017/bookstore";

app.get("/books", (req, res, next) => {
  const pages = req.query.p || 0;
  const BooksPerPage = 3;
  Book.find()
    .sort({ author: 1 })
    .skip(pages * BooksPerPage)
    .limit(BooksPerPage)
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((err) => {
      console.log(err);
      // next(err);
    });
});

app.get("/books/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    Book.findById(req.params.id)
      .then((book) => {
        if (!book) {
          res.status(404).json({ error: "Book not found" });
        }
        res.status(200).json(book);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.post("/books", (req, res) => {
  const newBook = req.body;
  const book = new Book({
    title: newBook.title,
    author: newBook.author,
    publication_year: newBook.publication_year,
    genre: newBook.genre,
    price: newBook.price,
    reviews: newBook.reviews,
  });
  book
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Handling POST requests to /books",
        createdBook: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  Book.deleteOne({ _id: id })
    .then((result) => {
      res.status(200).json({
        message: "Book deleted",
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

app.patch("/books/:id", (req, res) => {
  Book.updateOne({ _id: req.params.id }, { $set: req.body })
    .then((result) => {
      res.status(200).json({
        message: "Book updated",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

// using MongoDB
// db connection
// let db;
// connectToDb((err) => {
//   if (!err) {
//     app.listen("3000", () => {-
//       console.log("app listening on port 3000");
//     });
//     db = getDb();
//   }
// });

// routes
//using pagination
// app.get("/books", (req, res) => {
//   let books = [];
//   const pages = req.query.p || 0;
//   const BooksPerPage = 3;
//   db.collection("books")
//     .find()
//     .sort({ author: 1 })
//     .skip(pages * BooksPerPage)
//     .limit(BooksPerPage)
//     .forEach((book) => books.push(book))
//     .then(() => {
//       res.status(200).json(books);
//     })
//     .catch(() => {
//       res.status(500).json({ error: "Could not fetch the documents" });
//     });
// });

// app.get("/books/:id", (req, res) => {
//   const id = req.params.id;
//   if (ObjectId.isValid(id)) {
//     db.collection("books")
//       .findOne({ _id: new ObjectId(id) })
//       .then((doc) => {
//         if (doc) {
//           res.status(200).json(doc);
//         } else {
//           res.status(404).json({ error: "Book not found" });
//         }
//       })
//       .catch((err) => {
//         res.status(500).json({ error: "could not fetch the data" });
//       });
//   } else {
//     res.status(500).json({ error: "Not A valid ID" });
//   }
// });

// app.post("/books", (req, res) => {
//   const book = req.body;
//   db.collection("books")
//     .insertOne(book)
//     .then((result) => {
//       res.status(201).json(result);
//     })
//     .catch((err) =>
//       res.status(500).json({ err: "Could not create new document" })
//     );
// });

// app.delete("/books/:id", (req, res) => {
//   if (ObjectId.isValid(req.params.id)) {
//     db.collection("books")
//       .deleteOne({ _id: new ObjectId(req.params.id) })
//       .then((result) => {
//         res.status(200).json(result);
//       })
//       .catch((err) => {
//         res.status(500).json({ err: "could not delete the doc" });
//       });
//   } else {
//     res.status(500).json({ err: "Not A valid ID" });
//   }
// });

// app.patch("/books/:id", (req, res) => {
//   if (ObjectId.isValid(req.params.id)) {
//     db.collection("books")
//       .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
//       .then((result) => {
//         res.status(200).json(result);
//       })
//       .catch((err) => {
//         res.status(500).json({ err: "could not upate the document" });
//       });
//   } else {
//     res.status(500).json({ err: "Not A valid ID" });
//   }
// });
