// routes/commentRoutes.js
const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { addComment, getComments, likeComment, dislikeComment, replyToComment } = require('../controllers/commentController');
const router = express.Router();

router.get('/', getComments);
router.post('/', protect, addComment);
router.put('/:id/like', protect, likeComment);
router.put('/:id/dislike', protect, dislikeComment);
router.post('/:id/reply', protect, replyToComment);

module.exports = router;
