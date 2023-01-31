const ContestantService = require('../services/contestant.service');
const VoteService = require('../services/vote.service');

module.exports = {
  RootMutation: {
    addVote: async function(_, {voteInput}, {pubsub}) {
        const errors = [];
        const contestant = await ContestantService.getContestantById(voteInput.contestantId);
        if (!contestant) {
          errors.push({ message: 'Invalid contestant id!'});
        }

        if (errors.length > 0) {
          const error = new Error('Invalid input.');
          error.data = errors;
          error.code = 422;
          throw error;
        }

        const createdVote = await VoteService.createVote(contestant._id, voteInput.timestamp);

        const contestantsData = await ContestantService.getContestantsVoteCount();
        pubsub.publish('votes', {
          data: contestantsData,
          success: true
        });

        return { ...createdVote._doc, _id: createdVote._id.toString(), contestant: { name: contestant.name, id: contestant.id } };
      },
  },
  RootQuery: {
    votes: async function() {
        const contestantsData = await ContestantService.getContestantsVoteCount();
        return {
          data: contestantsData,
          success: true
        };
      },
  },
  RootSubscription: {
    contestantVotes: {
        subscribe: (ctx, args, {pubsub}) => { 
          return pubsub.subscribe('votes')
        },
        resolve: (payload) => payload 
      }
  }
};