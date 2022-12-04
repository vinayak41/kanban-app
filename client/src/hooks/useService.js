import { useEffect, useRef, useState } from "react";
import { object_equals } from "utils/helper";

const useService = (service, params) => {
  const prevParams = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (!object_equals(prevParams.current, params)) {
      prevParams.current = params;
      setLoading(true);
      setError(null);
      service(params)
        .then((response) => {
          setLoading(false);
          setResponse(response);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
        });
    }
  });

  return { loading, error, response };
};

export default useService;
