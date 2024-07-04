const Comment = require('../models/Comment');
const Reply = require('../models/Reply');

exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const comment = new Comment({ text, author: req.user.userId });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { sortBy, page = 1, limit = 10 } = req.query;
    const sortOptions = {
      newest: '-createdAt',
      mostLiked: '-likes.length',
      mostDisliked: '-dislikes.length'
    };
    const comments = await Comment.find()
      .populate('author', 'username')
      .populate({
        path: 'replies',
        populate: { path: 'author', select: 'username' }
      })
      .sort(sortOptions[sortBy] || '-createdAt')
      .skip((page - 1) * limit)
      .limit(Number(limit));
      
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.likes.includes(req.user.userId)) {
      return res.status(400).json({ error: 'You already liked this comment' });
    }
    comment.likes.push(req.user.userId);
    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.dislikeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.dislikes.includes(req.user.userId)) {
      return res.status(400).json({ error: 'You already disliked this comment' });
    }
    comment.dislikes.push(req.user.userId);
    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.replyToComment = async (req, res) => {
  try {
    const { text } = req.body;
    const parentComment = await Comment.findById(req.params.id);
    if (!parentComment) {
      return res.status(404).json({ error: 'Parent comment not found' });
    }
    const reply = new Reply({ text, author: req.user.userId });
    await reply.save();
    parentComment.replies.push(reply._id);
    await parentComment.save();
    res.status(201).json(reply);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
