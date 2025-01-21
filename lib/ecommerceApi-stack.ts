import * as lambdaNodeJs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as cdk from 'aws-cdk-lib';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';
import * as cwlogs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

interface EcommerceApiStackProps extends cdk.StackProps {
   productsFetchHandler: lambdaNodeJs.NodejsFunction
}

export class EcommerceApiStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: EcommerceApiStackProps) {
        super(scope, id, props);
        const logGroup = new cwlogs.LogGroup(this, 'EcommerceApiLogs');
        const api = new apiGateway.RestApi(this, 'EcommerceApi', {
            restApiName: 'EcommerceApi',
            description: 'API para Ecommerce',
            deployOptions:{
                accessLogDestination: new apiGateway.LogGroupLogDestination(logGroup),
                accessLogFormat: apiGateway.AccessLogFormat.jsonWithStandardFields({
                    httpMethod:true,
                    ip:true,
                    protocol:true,
                    requestTime:true,
                    resourcePath:true,
                    responseLength:true,
                    status:true,
                    caller:true,
                    user:true
                })
            }
        });

       const productFetchIntegration = new apiGateway.LambdaIntegration(props.productsFetchHandler);

       //Se receber uma requisição para /products, chama a função productsFetchHandler
       const productsResource = api.root.addResource("products");
       productsResource.addMethod("GET", productFetchIntegration);
    }
}