var express = require('express');
var router = express.Router({ mergeParams: true }); // merge params from market and comments to access /market/:id/comments
var ethnicMarket = require('../models/market');
var Comment = require('../models/comment');
var middleware = require('../middleware');
var moment = require('moment');

// NEW Comment route
router.get('/new', middleware.isLoggedIn, function (req, res) {
  ethnicMarket.findById(req.params.id, function (err, shop) {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { market: shop });
    }
  });
});

// CREATE Comment route
router.post('/', middleware.isLoggedIn, function (req, res) {
  ethnicMarket.findById(req.params.id, function (err, shop) {
    if (err) {
      console.log(err);
      res.redirect('/market');
    } else {
      // req.body.comment contains text and author of comment
      // in new.ejs text and author are grouped: comment[text] and comment[author]
      Comment.create(req.body.comment, function (err, comment) {
        if (err) {
          req.flash('error', 'Something went wrong');
          console.log(err);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.created = moment().format('lll');
          comment.save();
          shop.comments.push(comment);
          shop.save();
          req.flash('success', 'Successfully added comment');
          res.redirect('/market/' + shop._id);
        }
      });
    }
  });
});

// EDIT ROUTE
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function (req, res) {
  Comment.findById(req.params.comment_id, function (err, foundComment) {
    if (err) {
      res.redirect('back');
    } else {
      foundComment.created = String(moment().format('lll'));
      res.render('comments/edit', {
        market_id: req.params.id,
        comment: foundComment,
      });
    }
  });
});

// UPDATE ROUTE
router.put('/:comment_id', middleware.checkCommentOwnership, function (req, res) {
  req.body.comment.created = moment().format('lll');
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (
    err,
    updatedComment,
  ) {
    if (err) {
      res.redirect('back');
    } else {
      req.flash('success', 'Successfully updated comment');
      res.redirect('/market/' + req.params.id);
    }
  });
});

// DESTROY ROUTE
router.delete('/:comment_id', middleware.checkCommentOwnership, function (req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function (err) {
    if (err) {
      res.redirect('back');
    } else {
      req.flash('success', 'Successfully deleted comment');
      res.redirect('/market/' + req.params.id);
    }
  });
});

module.exports = router;
