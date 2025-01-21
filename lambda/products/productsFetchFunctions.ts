import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";


export async function handler(event: APIGatewayProxyEvent, context:Context):Promise<APIGatewayProxyResult>{
   const METHOD = event.httpMethod;
   const lambdaRequestId = context.awsRequestId;
   const apirequestId = event.requestContext.requestId;

   console.log(`API Gateway RequestId: ${apirequestId} Lambda RequestId: ${lambdaRequestId}`);
    if(event.resource === '/products'){
        if( METHOD === 'GET'){
            console.log('GET');
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'GET Products chamado para teste',
                }),
            };
        }
    }
    return {
        statusCode: 400,
        body: JSON.stringify({
            message: 'Esta requisição não foi encontrada',
        }),
    };
}