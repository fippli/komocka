const uuid = require('uuid/v1');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());

// Internal dummy state
let mock = {};
let settings = {
    delay: 0,
};

// [!] Mutating
const updateMock = (newMock) => {
    mock = newMock;
    return mock;
};

// [!] Mutating
const updateSettings = (newSettings) => {
    settings = {
        ...settings,
        ...newSettings,
    };
    return settings;
};

//
// Delay for simulating requests that take looooong time.
//
const delay = (req, res, next) => {
    setTimeout(() => {
        next();
    }, settings.delay * 1000);
};

//
// With response data
//
const respondWithData = method => (req, res) => {
    res.status(200)
        .send({
            message: `${method} successful`,
            data: {
                date: Date.now(),
                _id: uuid(),
                ...mock,
            }
        });
}

app.get('/', delay, respondWithData('GET'));
app.post('/', delay, respondWithData('POST'));
app.put('/', delay, respondWithData('PUT'));
app.delete('/', delay, respondWithData('DELETE'));

//
// Without response data
//
const respondWithoutData = method => (req, res) => {
    res.status(200)
        .send({
            message: `${method} successful`,
        });
}

app.get('/no-data', delay, respondWithoutData('GET'));
app.post('/no-data', delay, respondWithoutData('POST'));
app.put('/no-data', delay, respondWithoutData('PUT'));
app.delete('/no-data', delay, respondWithoutData('DELETE'));

//
// Error response
//
const respondWithoutError = method => (req, res) => {
    res.status(500)
        .send({
            message: `${method} failed`,
        });
}

app.get('/error', delay, respondWithoutError('GET'));
app.post('/error', delay, respondWithoutError('POST'));
app.put('/error', delay, respondWithoutError('PUT'));
app.delete('/error', delay, respondWithoutError('DELETE'));

//
// Update mock data
//
app.post('/mock', (req, res) => {
    // Read request body
    const { body } = req;
    console.log('Updating mock', body);
    const updatedMock = updateMock(body); // [!]
    res.send({ message: 'Successfully updated mock!', data: updatedMock });
});

//
// Update settings
// 
app.post('/settings', (req, res) => {
    // Read request body
    console.log('Updating settings');
    const { body } = req;
    const updatedSettings = updateSettings(body); // [!]
    res.send({ message: 'Successfully updated settings!', data: updatedSettings });
});

module.exports = (port) => app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
