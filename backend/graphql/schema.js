const { buildSchema } = require('graphql');

const typeDefs = `
type Contestant {
    _id: ID!
    name: String!,
    id: String!
}

type Vote {
    _id: ID!
    contestant: Contestant!
    votedAt: String!
}

type ContestantData {
    contestant: String!
    id: String!
    voteCount: Int!
}

type VoteData {
    data: [ContestantData!]!,
    success: Boolean!
}

input VoteInputData {
    contestantId: String!
    timestamp: String!
}

type RootQuery {
    votes: VoteData!
}

type RootMutation {
    addVote(voteInput: VoteInputData): Vote!
}

type RootSubscription {
    contestantVotes: VoteData!
}

schema {
    query: RootQuery
    mutation: RootMutation
    subscription: RootSubscription
}
`;

const graphqlSchema =  buildSchema(typeDefs);

 module.exports = {
    typeDefs,
    graphqlSchema
 }
