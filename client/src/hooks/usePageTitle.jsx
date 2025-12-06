import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTitle = (title) => {
    useEffect(() => {
        document.title = title ? `MedStack | ${title}` : 'MedStack | Home';
    }, [title]);
};

// Map routes to page titles
const routeTitles = {
    '/': 'Home',
    '/login': 'Login',
    '/register': 'Register',
    '/ask': 'Ask Question',
    '/tags': 'Tags',
    '/profile': 'Profile',
    '/stats': 'Analytics',
};

export const PageTitleUpdater = () => {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;

        // Check for question detail pages
        if (path.startsWith('/question/') || path.startsWith('/questions/')) {
            document.title = 'MedStack | Question';
        } else {
            const title = routeTitles[path] || 'Home';
            document.title = `MedStack | ${title}`;
        }
    }, [location]);

    return null;
};

export default usePageTitle;
