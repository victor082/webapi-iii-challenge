const express = 'express';

const Posts = require('./postDb.js')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.get(req.query);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'The post could not be retrieved' });
    }

});

router.get('/:id', async (req, res) => {
    try {
        const posts = await PostData.getById(req.params.id);
        if (posts) {
            res.status(200).json(posts);
        } else {
            res.status(404).json({ message: "The post with that ID does not work" });
        }
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({ error: "The post could not be retrieved" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const posts = await  Posts.remove(req.params.id);

        if (posts > 0) {
            res.status(200).json({ message: 'The post has been deleted' });
        } else {
            res.status(404).json({ message: 'The post with this id does not exist'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'The post could not be deleted'})
    }
});

router.put('/:id', (req, res) => {
    try {
        const posts = await Posts.update(req.params.id, req.body);
        if (posts) {
            res.status(200).json(posts);
        } else {
            res.status(404).json({ message: 'The post cannot be found' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'Error updating the post'
        })
    }
});

// custom middleware


module.exports = router;