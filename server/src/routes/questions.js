const express = require('express');
const { getQuestions, getQuestion, createQuestion, addAnswer, voteQuestion, deleteQuestion, deleteAnswer } = require('../controllers/questions');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(getQuestions)
    .post(protect, createQuestion);

router.route('/:id')
    .get(getQuestion)
    .delete(protect, deleteQuestion);

router.route('/:id/answers')
    .post(protect, addAnswer);

router.route('/:id/answers/:answerId')
    .delete(protect, deleteAnswer);

router.route('/:id/vote')
    .post(protect, voteQuestion);

module.exports = router;
