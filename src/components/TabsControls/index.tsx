import React from 'react';

import { useLocation, Link } from 'react-router-dom';
import './styles.less';

const TabsControls = () => {
    const location = useLocation();

    if (location.pathname.startsWith('/movies/')) {
        return null;
    }

    return (
        <div className="mdb-tabs">
            <div className={`mdb-tabs__tab ${location.pathname === '/movies' && 'mtb-tabs__tab-active'}`}>
                <Link to="movies">Фильмы</Link>
            </div>
            <div className={`mdb-tabs__tab ${location.pathname === '/tv' && 'mtb-tabs__tab-active'}`}>
                <Link to="tv">Телеканалы</Link>
            </div>
        </div>
    );
};

export default TabsControls;
