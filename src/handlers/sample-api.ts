import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { healthcheckHandler } from '../route-handlers/healthcheck';
// import { exit } from 'process';

export const handler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    // Validating environment variables
    // if (!process.env.ENV_VAR_NAME_1) {
    //     console.error('No ENV_VAR_NAME_1 env var defined');
    //     exit(1);
    // }

    console.log('Received event:', event);

    let status = 200;
    let body: object | null = null;

    try {
        switch (event.resource) {
            case '/healthcheck':
                if (event.httpMethod === 'GET') {
                    body = healthcheckHandler();
                } else {
                    throw new Error('Endpoint not recognized');
                }
                break;

            default:
                // We should never reach this point if the API Gateway is configured properly
                throw new Error('Endpoint not recognized');
        }
    } catch (err) {
        console.error(err);

        status = 500;
        body = {
            message: 'Unexpected Server Error',
        };
    }

    return {
        statusCode: status,
        body: JSON.stringify(body),
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    };
};
