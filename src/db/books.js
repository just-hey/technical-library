// ID: (You Choose) A unique id that represents the book. Created automatically.
// Name: (String) Name of the book. Cannot be longer than 30 characters. Required.
// Borrowed: (Boolean) True/false value that represents whether or not the book has been borrowed. Required. Defaults to false.
// Description: (String) A description of the book. Optional.
// Authors: (Array) An array of authors.

module.exports = [
  {
    id: '040f873d-df27-4f5c-8161-25ac0357ea35',
    name: 'A Tale',
    borrowed: true,
    description: 'This is for sure a book about some story... I promise.',
    authors: ['Eric the Fish', 'Sir. Monty Snek']
  },
  {
    id: 'b373072c-80df-4fae-8cfd-e8cfb07a0498',
    name: 'Fable',
    borrowed: false,
    description: 'This is for real a fable about some characters... maybe.',
    authors: ['Daniel Harrison']
  },
  {
    id: 'b373072c-80df-4fae-8cfd-e8cfb07a0498',
    name: 'Booky Book',
    borrowed: false,
    description: 'This is a book that has pages!',
    authors: ['Cassandra Torrances', 'Bob Dole', 'George Washington', 'Daniel Harrison']
  }
]
