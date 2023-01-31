const { validationResult } = require('express-validator');

const ContestantService = require('../services/contestant.service');
const VoteService = require('../services/vote.service');


/**
 * 
 * Get all the contestants and their total votes count
 */
exports.getContestants = async (req, res, next) => {
  try {
    const contestantsData = await ContestantService.getContestantsVoteCount();

    res.status(200).json({
      message: 'Fetched all contestant data successfully.',
      data: contestantsData,
      success: true
    });
  } catch (err) {
    res.status(422).json({
        message: (err.array && err.array({ onlyFirstError: true })[0].msg) || err.message,
        data: null,
        success: false  
    });
  }
};


/**
 * 
 * Store vote details
 */
exports.addVote = async (req, res, next) => {
  
  try {
    validationResult(req).throw();

    const contestantId = req.body.contestantId;
    const timestamp = req.body.timestamp;

    const contestant = await ContestantService.getContestantById(contestantId);
    const createdVote = await VoteService.createVote(contestant._id, timestamp);

    res.status(201).json({
        message: 'Vote created successfully!',
        data: { ...createdVote._doc, _id: createdVote._id.toString(), contestant: { name: contestant.name, id: contestant.id } },
        success: true  
    });
    
  } catch (err) {
    res.status(422).json({
        message: (err.array && err.array({ onlyFirstError: true })[0].msg) || err.message,
        data: null,
        success: false  
    });
  }
};