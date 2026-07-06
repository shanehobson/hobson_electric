#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { HobsonElectricStack } from '../lib/hobson-electric-stack';

const app = new cdk.App();

new HobsonElectricStack(app, 'HobsonElectricStack', {
  env: {
    account: '730335671883',
    region: 'us-east-1',
  },
  description: 'S3 + CloudFront (OAC) hosting for hobsonelectric.com static site',
});
