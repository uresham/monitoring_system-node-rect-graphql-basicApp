import React from 'react';

import { StyledNav } from './Nav.styled';
import Logo from '../../assets/logo.png';

const Nav = () => {
    return (
    <StyledNav className="container">
        <img src={Logo} className={'logo'} />
        <h2>Voting App</h2>
    </StyledNav>
    )
}

export default Nav