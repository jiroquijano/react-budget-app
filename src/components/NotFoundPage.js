import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <div>
        Page not found
        <Link to="/">Return to Home Page</Link>
    </div>
);

export default NotFoundPage;