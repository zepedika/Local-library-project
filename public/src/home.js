function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}


function getBooksBorrowedCount(books) {
  const currentlyBorrowedBooks = books.filter(book => { 
  return book.borrows.some(borrow => !borrow.returned)});
  return currentlyBorrowedBooks.length;
}

function getMostCommonGenres(books) {  
    const genreCounts = books.reduce((accumulator, { genre }) => {
        if (accumulator[genre]) {
            accumulator[genre]++;
        } else {
            accumulator[genre] = 1;
        }
        return accumulator;
    }, {});

    const genreCountsArray = Object.entries(genreCounts).map(([genre, count]) => ({
        name: genre,
        count
    }));

    genreCountsArray.sort((a, b) => b.count - a.count);
    const topFiveGenres = genreCountsArray.slice(0, 5);
    return topFiveGenres.map(genre => ({ name: genre.name, count: genre.count}));
}

function getMostPopularBooks(books) {
    const popularBooks = books.map(book => ({
        name: book.title,
        count: book.borrows.length
    }));

    popularBooks.sort((a, b) => b.count - a.count);
    return popularBooks.slice(0, 5); 
}

function getMostPopularAuthors(books, authors) {
    const authorBorrowCounts = {};

    books.forEach(book => {
        const { authorId, borrows } = book;
        authorBorrowCounts[authorId] = (authorBorrowCounts[authorId] || 0) + borrows.length;
    });

    const popularAuthors = Object.keys(authorBorrowCounts).map(authorId => ({
        name: `${authors.find(author => author.id === parseInt(authorId)).name.first} ${authors.find(author => author.id === parseInt(authorId)).name.last}`,
        count: authorBorrowCounts[authorId]
    }));

    return popularAuthors.sort((a, b) => b.count - a.count).slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
