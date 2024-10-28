// Hook for listening to location changes
// and returning the path

import { useEffect, useState} from 'react';

export function useLocation(): [string, string] {
    const [path, setPath] = useState(window.location.pathname);
    const [hash, setHash] = useState(window.location.hash);

    useEffect(() => {
        const handleLocationChange = () => {
            setPath(window.location.pathname);
            setHash(window.location.hash);
        };

        window.addEventListener('popstate', handleLocationChange);
        window.addEventListener('hashchange', handleLocationChange);

        return () => {
            window.removeEventListener('popstate', handleLocationChange);
            window.removeEventListener('hashchange', handleLocationChange);
        };
    }, []);

    return [path, hash];
}

export function useHash(): string {

    const [hash, setHash] = useState(window.location.hash);

    useEffect(() => {
        const handleHashChange = () => {
            setHash(window.location.hash);
        };

        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };

    }, []);

    return hash;
}