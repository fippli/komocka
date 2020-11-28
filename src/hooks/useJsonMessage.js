const { useEffect } = require("react");

const useJsonMessage = (state, dispatch) => {
  const { mock } = state;

  useEffect(() => {
    try {
      JSON.parse(mock);
      dispatch({ type: "SET_MESSAGE", payload: "Valid JSON" });
    } catch (error) {
      dispatch({ type: "SET_MESSAGE", payload: error.message });
    }
  }, [mock, dispatch]);
};

export default useJsonMessage;
