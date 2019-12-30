const Book = require('../models/book');
const Genre = require('../models/genre')
const mongoose = require('mongoose');
const async = require('async');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.genre_detail = function(req, res, next) {
  const id = mongoose.Types.ObjectId(req.params.id);
  async.parallel({
      genre: function(callback) {
          Genre.findById(id)
            .exec(callback);
      },

      genre_books: function(callback) {
        Book.find({ 'genre': id })
        .exec(callback);
      },

  }, function(err, results) {
      if (err) { return next(err); }
      if (results.genre==null) { // No results.
          const err = new Error('Genre not found');
          err.status = 404;
          return next(err);
      }
      // Successful, so render
      res.render('genre_detail', { title: 'Genre Detail', genre: results.genre, genre_books: results.genre_books } );
  });
};

exports.genre_create_get = function(req, res, next) {       
  res.render('genre_form', { title: 'Create Genre' });
};

exports.genre_create_post =  [
   
  // Validate that the name field is not empty.
  body('name', 'Genre name required').isLength({ min: 1 }).trim(),
  
  // Sanitize (trim and escape) the name field.
  sanitizeBody('name').trim().escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);

      // Create a genre object with escaped and trimmed data.
      const genre = new Genre(
        { name: req.body.name }
      );

      if (!errors.isEmpty()) {
          // There are errors. Render the form again with sanitized values/error messages.
          res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array()});
      return;
      }
      else {
          // Data from form is valid.
          // Check if Genre with same name already exists.
          Genre.findOne({ 'name': req.body.name })
              .exec( function(err, found_genre) {
                   if (err) { return next(err); }

                   if (found_genre) {
                       // Genre exists, redirect to its detail page.
                       res.redirect(found_genre.url);
                   }
                   else {

                       genre.save(function (err) {
                         if (err) { return next(err); }
                         // Genre saved. Redirect to genre detail page.
                         res.redirect(genre.url);
                       });

                   }

               });
      }
  }
];