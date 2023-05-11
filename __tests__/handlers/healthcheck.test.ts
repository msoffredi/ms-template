import { handler } from '../../src/handlers/sample-api';
import { constructAPIGwEvent } from '../utils/helpers';

// This includes all tests for auth.handler()
it('should return a 200 and a valid status as healthy on GET over healthcheck endpoint', async () => {
    const event = constructAPIGwEvent(
        {},
        { method: 'GET', resource: '/healthcheck' },
    );
    const result = await handler(event);

    expect(result.body).toEqual(JSON.stringify({ serviceStatus: 'healthy' }));
});
