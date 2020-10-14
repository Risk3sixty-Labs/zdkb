#!/usr/bin/env node

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
// import minimist from 'minimist'
const uuid_1 = require("uuid");
const aws_1 = require("./libs/aws");
const zendesk_1 = __importDefault(require("./libs/zendesk"));
(async function zdkb() {
    try {
        const backupInstancePrefix = `${Date.now()}__${uuid_1.v4()}`;
        const fullPrefixBase = [
            process.env.AWS_S3_PREFIX || 'zdkb',
            backupInstancePrefix,
        ];
        const zendesk = zendesk_1.default();
        await zendesk.getArticles(async function processArticle(article, ind) {
            const filePathInBucket = [
                ...fullPrefixBase,
                `${ind}__${article.title}.json`,
            ];
            await aws_1.uploadObject(filePathInBucket.join('/'), JSON.stringify(article));
        });
        console.log(`Successfully saved your articles to`);
        console.log(`s3://${process.env.AWS_S3_BUCKET}/${fullPrefixBase.join('/')}`);
    }
    catch (err) {
        console.error(`Error processing knowledge base`, err);
    }
    finally {
        process.exit();
    }
})();
