var mongoose = require('mongoose');

var booksSchema = mongoose.Schema({
    
    title: String,
    author: String,
   
    created: { 
        type: Date,
        default: Date.now
    }
});

const Books = mongoose.model('Books', booksSchema);

module.exports = Books;

// testingBook.save(function(err) {
//     if (err) throw err;
//     console.log('Book successfully saved.');
// });
 
// Books.find({}, function(err, Books) {
//     if (err) throw err;
//     console.log(Books);
//   });

