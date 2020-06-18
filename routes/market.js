var express = require('express');
var router = express.Router();
var ethnicMarket = require('../models/market');
var middleware = require('../middleware');

// INDEX - show all shops in the market
router.get('/', function (req, res) {
  ethnicMarket.find({}, function (err, shops) {
    if (err) {
      console.log(err);
    } else {
      res.render('market/index', { market: shops });
    }
  });
});

// CREATE - add new shop to the market
router.post('/', middleware.isLoggedIn, function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username,
  };
  var newShop = { name: name, image: image, description: description, author: author };
  ethnicMarket.create(newShop, function (err, shop) {
    if (err) {
      req.flash('error', 'Shop already exists');
      console.log(err);
    } else {
      req.flash('success', 'Successfully added shop');
      res.redirect('/market'); // default is to redirect as GET route
    }
  });
});

// NEW - show form to create a new shop
router.get('/new', middleware.isLoggedIn, function (req, res) {
  res.render('market/new');
});

// SHOW - shows more info about shop
// '/market/:id' - this rout should be after '/market/new' GET rout
// otherwise, it will be overwritten
router.get('/:id', function (req, res) {
  ethnicMarket
    .findById(req.params.id)
    .populate('comments')
    .exec(function (err, foundShop) {
      if (err) {
        console.log(err);
      } else {
        //console.log(foundShop);
        res.render('market/show', { market: foundShop });
      }
    });
});

// EDIT ROUTE
router.get('/:id/edit', middleware.checkShopOwnership, function (req, res) {
  ethnicMarket.findById(req.params.id, function (err, foundShop) {
    res.render('market/edit', { market: foundShop });
  });
});

// UPDATE ROUTE
router.put('/:id', middleware.checkShopOwnership, function (req, res) {
  ethnicMarket.findByIdAndUpdate(req.params.id, req.body.market, function (err, updatedShop) {
    req.flash('success', 'Successfully updated shop');
    res.redirect('/market/' + req.params.id);
  });
});

// DESTROY ROUTE
router.delete('/:id', middleware.checkShopOwnership, function (req, res) {
  ethnicMarket.findByIdAndRemove(req.params.id, function (err) {
    req.flash('success', 'Successfully deleted shop');
    res.redirect('/market');
  });
});

module.exports = router;
