import React from 'react';
import { Link } from 'react-router-dom';
import { FaList } from 'react-icons/fa';

export const Home = () => {
    return (
        <div>
            <Link to='/customers'>
                <FaList className='margin-top: 12px' />
                Go to Customer List
            </Link>
        </div>
    );
};
