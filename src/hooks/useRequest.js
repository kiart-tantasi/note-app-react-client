import { useEffect, useState } from 'react';

export default function useRequest(requestFunction) {

    useEffect(() => {
        console.log("useRequest called.");
    }, [])

    const [data, setData] = useState(null);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState({error:null})

    const sendRequest = async() => {
        setPending(true);
        try {
            const data = await requestFunction();
            setData(data);
        } catch (err) {
            setError(err.message || "sending request failed.");
        }
        setPending(false);
    }    

  return {data, pending, error, sendRequest};
}
