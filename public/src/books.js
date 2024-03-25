function findAuthorById(authors, id) {
  let foundAuthor = authors.find((author) => author.id === id);
  return foundAuthor;
  }
  
  function findBookById(books, id) {
    let foundBook = books.find((book) => book.id === id);
  return foundBook;
  }
  
  function partitionBooksByBorrowedStatus(books) {
    const currentlyBorrowedBooks = books.filter(book => { 
    return book.borrows.some(borrow => !borrow.returned)});
    
    const returnedBooks = books.filter(book => {
      return !book.borrows.some(borrow => !borrow.returned);
    });
    return [currentlyBorrowedBooks, returnedBooks];
  }
  
  function getBorrowersForBook(book, accounts) {
    const borrows = book.borrows;
    const borrowers = borrows.map(borrow => {
      const account = accounts.find(account => account.id === borrow.id);
      return { 
      ...borrow,
      ...account, 
      returned: borrow.returned };
    }).slice(0, 10); 
    return borrowers 
  }
  

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
