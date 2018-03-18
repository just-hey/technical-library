## A simple API created from scratch that:

1. Follows RESTful patterns
1. Uses an opinionated architecture (MVC)
1. Includes error handling
1. Includes nested resources
1. Reads and writes to a JSON file

Deployed: [HERE]()


### GET all BOOKS:
/books

### GET one BOOK:
/books/:id

### GET all AUTHORS for a BOOK:
/books/:id/authors

### GET one AUTHOR for a BOOK:
/books/:id/authors/:aId

### POST a new BOOK:
/books

### POST a new AUTHOR to a BOOK:
/books/:id/authors

### PUT a BOOK:
/books/:aId

### PUT an AUTHOR for a BOOK:
/books/:id/authors/:aId

### DELETE a BOOK:
/books/:id

### DELETE an AUTHOR for a BOOK:
/books/:id/authors/:aId


## Setup

1. Fork and clone this repository
1. Run `npm install`
1. Run the server in development mode with `npm run dev` or run it in production mode with `npm start`
