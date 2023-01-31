const Vote = require('../models/votes');

/**
 * Create Vote
 * @param  _id 
 * @param  dateTime 
 * @returns created vote object
 */
exports.createVote = async (_id, dateTime) => {
    if (!_id || !dateTime) {
      const error = new Error('data missing');
      error.statusCode = 422;
      throw error;
    }
    
    try {
      const vote = new Vote({
          contestant: _id,
          votedAt: dateTime
      });
      const createdVote = await vote.save();
  
      return createdVote;
      
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    }
};