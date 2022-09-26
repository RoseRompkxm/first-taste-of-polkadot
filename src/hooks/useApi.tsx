import { useContext } from 'react';
import { ApiContext } from 'context/ApiContext';

const useApi = () => {
    const { api } = useContext(ApiContext);
    return { api };
};

export default useApi;
