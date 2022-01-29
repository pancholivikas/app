import { useState, useEffect } from "react";
const useFetch = (url, method, query, responseHandler, initialData) => {
  const [data, setData] = useState(initialData);

  useEffect(async () => {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        token: "a123gjhgjsdf6576",
      },
      body: JSON.stringify({
        query,
      }),
    });
    const data = await response.json();
    setData(responseHandler(data));
  }, []);

  return { data };
};

export default useFetch;
