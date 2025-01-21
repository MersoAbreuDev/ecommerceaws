#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { EcommerceawsStack } from '../lib/ecommerceaws-stack';

const app = new cdk.App();
new EcommerceawsStack(app, 'EcommerceawsStack', {
 
});