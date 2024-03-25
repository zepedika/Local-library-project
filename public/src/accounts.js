function findAccountById(accounts, id) {
  let foundId = accounts.find((account) => account.id === id)
  return foundId;
}

function sortAccountsByLastName(accounts) {
  accounts.sort((lastNameA, lastNameB) => lastNameA.name.last.toLowerCase() > lastNameB.name.last.toLowerCase() ? 1 : -1);
  return accounts; 
}


function getTotalNumberOfBorrows(account, books) {
 const accountId = account.id;
    
    const borrowCount = books.reduce((accumulator, book) => {
        const count = book.borrows.filter(borrow => borrow.id === accountId).length;
        return accumulator + count;
    }, 0);

    return borrowCount;
}

function getBooksPossessedByAccount(account, books, authors) {
 const { id: accountId } = account;

    const currentlyBorrowedBooks = books.filter(book => {
        const { borrows } = book;
        return borrows.some(borrow => borrow.id === accountId && !borrow.returned);
    }).map(book => {
        const author = authors.find(author => author.id === book.authorId);
        return { ...book, author };
    });

    return currentlyBorrowedBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
