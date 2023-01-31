const Contestant = require('../models/contestants');

/**
 * Get contestant details by id
 * @param id 
 * @returns contestant object
 */
exports.getContestantById = async (id) => {
    if (!id) {
      const error = new Error('data missing');
      error.statusCode = 422;
      throw error;
    }
    
    try {
      const contestant = await Contestant.findOne({ id: id });

      if (!contestant) {
          const error = new Error('Invalid contestant id!');
          error.statusCode = 422;
          throw error;
      }
  
      return contestant;
      
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    }
};


/**
 * 
 * @returns contestant object array with vote count
 */
exports.getContestantsVoteCount = async () => {
  try {
    const contestantsData = await Contestant.aggregate([
      {
        $lookup: {
          from: 'votes',
          localField: "_id",
          foreignField: 'contestant',
          as: "contestantData"
        } 
      },
      {
          $project: {
              _id: 1,
              name: 1,
              id: 1,
              count: { $size : '$contestantData' },
          }
      }
    ]);

    const data = contestantsData.map(vote => {
      return {
        contestant: vote.name,
        id: vote.id,
        voteCount: vote.count
      };
    });

    return data;
    
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw err;
  }
};