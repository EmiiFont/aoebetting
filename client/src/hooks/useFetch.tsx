import React, { useState } from 'react';

const useFetch = (url : string, options : any) => {
    const [response, setResponse] = useState<any>();
    const [error, setError] = useState<any>();
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(url, options);
          const json = await res.json();
          setResponse(json);
        } catch (error) {
          setError(error);
        }
      };
      fetchData();
    }, []);
    return { response, error };
  };

  export default useFetch;