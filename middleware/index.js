var ethnicMarket = require('../models/market');
var Comment = require('../models/comment');
var middlewareObj = {};

middlewareObj.checkShopOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    ethnicMarket.findById(req.params.id, function (err, foundShop) {
      if (err) {
        req.flash('error', 'Shop not found');
        res.redirect('back');
      } else {
        // checking user ownership (authorization) using .equals mongoose method
        // foundShop.author.id - mongoose object, req.user._id - string
        if (foundShop.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', 'You do not have permission to do that');
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'You need to login first!');
    res.redirect('back');
  }
};

middlewareObj.checkCommentOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
      if (err) {
        res.redirect('back');
      } else {
        // checking user ownership (authorization) using .equals mongoose method
        // foundShop.author.id - mongoose object, req.user._id - string
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', 'You do not have permission to do that');
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'You need to login first!');
    res.redirect('back');
  }
};

middlewareObj.isLoggedIn = function (req, res, next) {
  // middleware - checks if user is logged in;
  // put in crate new comment route
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'You need to login first!');
  res.redirect('/login');
};

module.exports = middlewareObj;
