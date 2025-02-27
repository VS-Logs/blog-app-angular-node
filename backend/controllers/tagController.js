const BlogPost = require('../models/blogPost');

// Get all tags
exports.getAllTags = async (req, res) => {
    try {
        const tags = await BlogPost.distinct('tags');
        res.json(tags);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get blog posts by tag
exports.getPostsByTag = async (req, res) => {
    try {
        const tag = req.params.tag;
        const posts = await BlogPost.find({ tags: tag });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};