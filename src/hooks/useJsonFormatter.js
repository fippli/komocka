const { useEffect } = require("react");

const useJsonFormatter = (state, dispatch) => {
  const { endpoints, readyToFormat } = state;

  useEffect(() => {
    if (readyToFormat) {
      try {
        dispatch({
          type: "FORMAT",
          payload: {
            endpoints: endpoints.map((endpoint) => {
              return {
                ...endpoint,
                mock: JSON.stringify(JSON.parse(endpoint.mock), null, 2),
              };
            }),
            readyToFormat: false,
          },
        });
      } catch {}
    }
  }, [endpoints, readyToFormat, dispatch]);
};

export default useJsonFormatter;
