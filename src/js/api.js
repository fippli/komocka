const POST = (() => {
  'use strict';

  const headers = {
    'Content-Type': 'application/json'
  };

  const options = {
    method: 'POST',
    headers,
  }

  const getEndpoint = (port, endpoint) => `http://localhost:${port}/${endpoint}`;

  return (callback, endpoint, body, settings) => {
    fetch(
      getEndpoint(settings.port, endpoint),
      { ...options, body },
    )
      .then(response => response.json())
      .then(callback)
      .catch(error => {
        console.log(error);
      });
  };
})();