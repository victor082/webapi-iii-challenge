const express = 'express';

const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
    const user = req.body;
    Users.insert(user)
    .then(user => {
        res.status(201).json(user);
    })
});

router.post('/:id/posts', validateUserId, (req, res) => {
    const post = req.body;
    Posts.insert(post)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(err => {
        res.status(500).json({ error: "Error: cannot save post to DB"})
    })

});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const id = req.params.id;
    Users.getById(id)
    .then(user => {
        console.log(user);
        if(!user) {
            res.status(400).json({ message: "invalid user id" })
        } else {
            req.user = user;
            next();
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: "user could not be retrieved" })
    })

};

function validateUser(req, res, next) {
    if (!req.body) {
     res.status(400).json({ message: "missing data" })
   } else if (!req.body.name) {
     res.status(400).json({ message: "missing name data" })
   } else {
     next();
   }
 };
 
 
function validatePost(req, res, next) {
    if (!req.body) {
     res.status(400).json({ message: "missing post data" })
   } else if (!req.body.text) {
     res.status(400).json({ message: "missing text data" })
   } else if (!req.body.user_id) {
     res.status(400).json({ message: "missing user id" })
   } else {
     next();
   }
 }

module.exports = router;
