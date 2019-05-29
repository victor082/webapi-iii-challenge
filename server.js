const express = 'express';
const helmet = require('helmet');
const server = express();
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

server.use(express.json());
server.use('/api/posts', postRouter)
server.use('/api/users', userRouter)
server.use(helmet());
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(`A ${req.method} request to ${req.url}`);
  next();
};

module.exports = server;
