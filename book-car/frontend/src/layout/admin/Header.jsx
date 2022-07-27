import React from 'react';

const Header = ({ title }) => {
    return (
        <div className='main-header'>
            <div className='mobile-toggle' id='mobile-toggle'>
                <i className='bx bx-menu-alt-right'></i>
            </div>
            <div className='main-title'>{title}</div>
        </div>
    );
};

export default Header;
