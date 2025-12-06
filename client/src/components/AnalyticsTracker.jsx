import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackVisit } from '../api/stats';

const AnalyticsTracker = () => {
    const location = useLocation();

    useEffect(() => {
        trackVisit(location.pathname);
    }, [location]);

    return null;
};

export default AnalyticsTracker;
