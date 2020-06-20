# YelpEthnicMarket

YelpEthnicMarket is a clone of YelpCamp project (The Web Developer Bootcamp @ Udemy, instructor Colt Steele). The main idea of this project is to map all ethnic markets in Oslo (possibly in the whole Norway). As of now it contains only few food markets in Oslo.

## How to run the app

1. Web app is served on Hekoru - go to [YelpEthnicMarket web site](https://localethnicmarket.herokuapp.com/) in your browser

## How to use the app:

1. On landing page click on 'View all food markets' button. User will be transfered to the main page with all food shops available.
2. To add a new shop or comment about any shop, user has to register.
3. To register a new user, click 'Sign up' button on top menu. Enter login and password on the register page.
4. To login to existing account, click 'Log in' button on top menu. Enter login and password on the login page.
5. When existing user logged in, he/she can create new comment under any shop as well as create new shop. User can edit comment or shop features only if he/she created them, i.e. if they pass authorization check.
6. To create a new shop, registered and logged in user has to click on 'Add new shop' button on the main page. User needs to provide name, image url and description of a new shop and hit 'Submit'. User will be transfered to the main page where new shop will appear at the bottom.
7. To add a new comment, registered and logged in user has to click 'Add new comment' under shop description. User needs to provide text of the comment and hit 'Submit' button. User will be transfered to the selected shop post page.

## Features

**Sign in**

- user can register with login and password
- data persistence (MongoDB: User)

**Log in**

- existing user can log in with login and password

**Shop**

- only registered user can create new shop
- only author of the shop post can edit it later
- new shop post has author stamp below description
- data persistence (MongoDB: Market, object referencing - Market:Comment)

**Comment**

- only registered user can add comment under any shop
- only author of the comment can edit it later
- each comment has a timestamp (updated if comment was edited)
- data persistence (MongoDB: Comment, object referencing - User:Comment)

**Other**

- Authentication and Authorization checks
- helpful errors with Flash js
- landing page background animation (CSS)
- responsive app

## Future features

- locate shops on Google map
- add possibility to have several pictures per shop post - to have a carousell instead of one image only
- add shop contact info, opening hours, etc.
- add user rating to shops
- add answer to comment with a new comment (nested)
- add city and type (food, clothes) to each shop
- add filter/search to select different types of shops
- add search field to select shops across Norway
- further UI styling

## Dependencies

* mongoose
* express
* ejs
* body-parser
* express-session
* method-override
* passport
* passport-local
* passport-local-mongoose
* connect-flash
* moment
