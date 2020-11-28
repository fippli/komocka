const { useEffect } = require("react");

const useJsonFormatter = (state, dispatch) => {
  const { mock, readyToFormat } = state;

  useEffect(() => {
    if (readyToFormat) {
      try {
        dispatch({
          type: "FORMAT",
          payload: {
            mock: JSON.stringify(JSON.parse(mock), null, 2),
            readyToFormat: false,
          },
        });
      } catch {}
    }
  }, [mock, readyToFormat, dispatch]);
};

export default useJsonFormatter;
