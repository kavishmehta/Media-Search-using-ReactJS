import React from 'react';
import { Link } from 'react-router';

const HomePage = () => (
    <div className="container-fluid">
        <div className="jumbotron">
            <h1 className="lead">React App </h1>
        </div>
        <div>
            <Link to="media-search" className="link">
                <div>
                    <h3>1. Media Search</h3>
                </div>
            </Link>
        </div>
    </div>
);

export default HomePage;