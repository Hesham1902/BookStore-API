# Bookstore API

The Bookstore API is a Node.js project for managing a collection of books. It provides basic CRUD operations and supports pagination.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

Instructions on setting up the Bookstore API locally.

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Hesham1902/bookstore-api.git
   
2. Navigate to the project directory:
   cd bookstore-api
   
4. Install dependencies:
   npm install

5. Set up MongoDB:

    Ensure MongoDB is installed and running.
    Update MONGODB_URI=mongodb://localhost:27017/bookstore
   
6. Start the server:
   nodemon app


## Usage

The API can be accessed at http://localhost:3000.

## API Endpoints

    GET /books: Get a paginated list of books.
    GET /books/:id: Get details of a specific book.
    POST /books: Add a new book.
    PATCH /books/:id: Update details of a book.
    DELETE /books/:id: Delete a book.

## Contributing

If you'd like to contribute, please fork the repository and create a new branch. Pull requests are welcome!
