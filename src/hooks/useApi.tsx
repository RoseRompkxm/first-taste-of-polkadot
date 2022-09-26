import { useContext } from 'react';
import { ApiContext } from 'context/ApiContext';

const useApi = () => {
    const { api, extensionReady } = useContext(ApiContext);
    return { api, extensionReady };
};

export default useApi;
