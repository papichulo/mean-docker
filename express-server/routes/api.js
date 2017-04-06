const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
var config = require('../config');
var User = require('../app/models/user');
var BlogPost = require('../app/models/blogpost');

const router = express.Router();
const app = express();
// MongoDB URL from the docker-compose file

// Connect to mongodb
mongoose.connect(config.database);

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

// Authentication middleware
var checkTokenFilter = function(req, res, next) {
  const authorization = req.headers.authorization;
  let token;
  if (authorization)
    token = authorization.split(' ')[1];
  else 
    token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.secret, (error, decoded) => {
      if (error) {
        return res.status(401).json({ success: false, message: 'Failed to authenticate token'});
      }
      else {
        req.decoded = decoded;
        next();
      }
    });
  }
  else {
    return res.status(403).send({
      success: false,
      message: 'No token provided'
    });
  }
}

/* User section */
/* Initial setup */
router.get('/setup', (req, res) => {
  var user = new User({
    name: config.defaultUser,
    email: config.defaultEmail,
    password: config.defaultPassword,
    admin: true
  });
  user.save(error => {
    if (error) res.status(500).send(error);

    res.status(201).json({
      message: 'User created successfully'
    });
  });
});

/* POST add or update a user */
router.post('/user', checkTokenFilter, (req, res) => {
  if (req.body.id)
    updateUser(req, res);
  else
    addUser(req, res);
});

function updateUser(req, res)
{
  User.findByIdAndUpdate({
    _id: req.query.id,
    name: req.body.name,
    password: req.body.password,
    admin: req.body.admin
  }, (err) => {
    if (err) resizeBy.status(500).send(error);
    res.status(201).json({
      message: 'User updated successfully'
    });
  })
}

function addUser(req, res)
{
    let user = new User({
        name: req.body.name,
        password: req.body.password,
        admin: req.body.admin
    });
    user.save(error => {
        if (error) res.status(500).send(error);
        res.status(201).json({
          message: 'User created successfully'
        });
    });
}

/* DELETE a user*/
router.delete('/user', checkTokenFilter, (req, res) => {
    User.findByIdAndRemove({_id: req.query.id}, (err) => {
      if (err) res.status(500).send(error);
      res.status(201).json({
        message: 'User deleted successfully'
      });
    });
});

/* GET one user by id */
router.get('/user', checkTokenFilter, (req, res) => {
  User.findById({_id: req.query.id}, (err, user) => {
    if (err) res.status(500).send(error);
    res.status(200).json(user);
  });
});

/* GET all users*/
router.get('/users', checkTokenFilter, (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.status(500).send(error);
    res.status(200).json(users);
  });
});

router.post('/authenticate', (req, res) => {
  User.findOne({name: req.body.name}, (err, user) => {
    if (err) res.status(500).send(error);
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    }
    else {
      user.validPassword(req.body.password, function(err, data){
          if (err) res.status(500).send(err);
          if (!data)
          {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          }
          // if user is found and password is right
          // create a token
          var token = jwt.sign(user, config.secret, {
            expiresIn: 60*60*24 // expires in 24 hours
          });
          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token,
            user: user.toJSON
          });
      });
    }
  });
});

/* BlogPost section */
/* GET all blogposts */
router.get('/posts', (req, res) => {
    BlogPost.find({}, (err, blogPosts) => {
        if (err) res.status(500).send(error)
        res.status(200).json(blogPosts);
    });
});

/* GET one blogpost */
router.get('/posts/:id', (req, res) => {
    BlogPost.findById(req.param.id).populate('_user').exec((err, blogPosts) => {
        if (err) res.status(500).send(error)
        res.status(200).json(blogPosts);
    });
});

/* Create a blogpost */
router.post('/posts', checkTokenFilter, (req, res) => {
    let blogPost = new BlogPost({
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags,
        _user: req.body.user_id
    });
    blogPost.save(error => {
        if (error) res.status(500).send(error);
        res.status(201).json({
          message: 'Blogpost created successfully'
        });
    });
});

module.exports = router;
