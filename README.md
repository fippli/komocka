# Minimalistic API mock app

A mock server app for quick json mocks.

## Features

- Incredible art of cow pooping.
- Edit a json with parsing error message in the textarea.
- Drag and drop a json file to the ui to replace the current mock with the file contents.
- Simple auto format on textarea blur.
- Custom `port/endpoint` where the json mock should be served.
- Set http response status.
- Set a response delay.
- Simulate file uploads on endpoint `/file`.

<img src="image.png" alt="" width="300" />

## API
The json mock is served on `http://localhost:<por>/endpoint`. Available methods are `GET`, `POST`, `PUT`, `DELETE`.

### File uploads
It is also possible to simulate file uploads on the endpoint `http://localhost:<port>/file`. Available methods are `POST`.

A feature of storing files to serve later is under development.

## Contribution
Please let me know if you have feedback or ideas how Komocka can improve. Easiest way is to put an issue. Thanks!
