const express = require('express');
const router = express.Router();

const { addVote, getContestants } = require('../controllers/vote');
const { validateCreateVote } = require('../validations/vote.validator')


router.post('/vote', validateCreateVote(), addVote);
router.get('/contestants', getContestants);

module.exports = router