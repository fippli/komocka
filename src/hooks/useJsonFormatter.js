import { formatJson } from "../core";
import { useEffect } from "react";

const useJsonFormatter = (state, dispatch) => {
  const { endpoints, readyToFormat } = state;

  useEffect(() => {
    const getFormattedEndpointMocks = (endpoints) =>
      endpoints.map((endpoint) => {
        return {
          ...endpoint,
          mock: {
            ...endpoint.mock,
            [endpoint.method]: formatJson(endpoint.mock[endpoint.method]),
          },
        };
      });

    if (readyToFormat) {
      try {
        dispatch({
          type: "FORMAT",
          payload: {
            endpoints: getFormattedEndpointMocks(endpoints),
            readyToFormat: false,
          },
        });
      } catch {}
    }
  }, [endpoints, readyToFormat, dispatch]);
};

export default useJsonFormatter;
