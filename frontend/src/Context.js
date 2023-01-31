import React, { useState, useEffect, createContext } from "react";
import { gql, useSubscription, useQuery, useMutation } from '@apollo/client';

const CONTESTANTS_VOTES = gql`
subscription{
    contestantVotes {
      data {
        contestant
        id
        voteCount
      }
    }
  }
`;


const ALL_CONTESTANTS = gql`
query RootQuery { votes {
      data {
        contestant
        id
        voteCount
      }
      success
    }}`


const UPDATE_VOTE = gql`
  mutation RootMutation ($contestantId: String!, $timestamp: String!) {
        addVote( voteInput: {contestantId: $contestantId, timestamp: $timestamp}) {
            contestant {
                id
                name
            }
        }
  }
`;


export const Context = createContext();

export const ContextProvider = ({children}) => {

    const [contestants, setContestants] = useState([]);
    const [loadContestants, setLoadContestants] = useState(false);
    const [errorContestants, setErrorContestants] = useState(false);
    const queryData = useQuery(ALL_CONTESTANTS);
    const { data, error } = useSubscription(
        CONTESTANTS_VOTES,
        {}
    );
    const [updateVotes, {loading}] = useMutation(UPDATE_VOTE);

    useEffect(() => {
        if(queryData && queryData.data && queryData.data.votes) {
            setLoadContestants(queryData.loading);
            if(queryData.data && queryData.data.votes) {
                const {data} = queryData.data.votes;
                setContestants(data);
            }
            setErrorContestants(queryData.error)
        }
    }, [queryData]);

    useEffect(() => {
        if(data && data.votes) {
            const votes = data.votes;
            setContestants(votes.data);
        }
    }, [data]);

    const updatePost = (id) => {
        const time = new Date().toISOString();
        updateVotes({ variables: { contestantId: id, timestamp: time }});
    }

    return <Context.Provider value={{
        contestants,
        loadContestants,
        errorContestants,
        updatePost
    }} >{children} </Context.Provider>
}