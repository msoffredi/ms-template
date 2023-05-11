// Environment variables
// process.env.ENV_VAR_NAME_1 = 'value';

if (!process.env.DEBUG) {
    global.console.log = jest.fn();
    global.console.error = jest.fn();
}

// beforeAll(async () => {
// });

// beforeEach(async () => {
// });
