import React, {useContext} from 'react';

import { StyledHome } from './Home.styled';
import {Context} from '../../Context';
import Vote from '../vote/Vote';

const Home = () => {

    const { 
        contestants,
        loadContestants,
        errorContestants} = useContext(Context)


    if (loadContestants) {
        return <div>loading</div>;
    }
    if (errorContestants) {
        return <div>encountered an error: {errorContestants}</div>;
    }

    return (
        <>
        <StyledHome>
            <div className="bg-image"></div>
            <div className="bg-text">
            <h3> Contestants Details </h3>
            <br/>
                {contestants.map((data) => {
                    if(data && data.contestant != undefined) {
                        return(<>
                            <h4>{data.contestant} - {data.voteCount}</h4>
                        </>)
                    }
                })}
            </div>
        </StyledHome>
        <hr/>
        <Vote/>



        </>
    )
}

export default Home;