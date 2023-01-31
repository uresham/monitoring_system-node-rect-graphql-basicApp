import React, {useContext} from 'react';

import {Context} from '../../Context';
import { StyledVote } from './Vote.styled';

const Vote = () => {
    const { 
        contestants,
        updatePost} = useContext(Context)

return (
    <StyledVote>
        {contestants.map((data) => {
                    if(data && data.contestant != undefined) {
                        return(<>
                        <button className='vote-btn' onClick={()=>updatePost(data.id)}>
                            {data.contestant}
                        </button>
                        </>)
                    }
                })}
    </StyledVote>
)
}

export default Vote;