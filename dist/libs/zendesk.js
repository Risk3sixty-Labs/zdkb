"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
function ZendeskClient(emailAddress = process.env.ZENDESK_AUTH_EMAIL, apiToken = process.env.ZENDESK_AUTH_TOKEN, zendeskUrl = process.env.ZENDESK_URL) {
    return {
        client: axios_1.default.create({
            baseURL: zendeskUrl,
            headers: {
                Authorization: `Basic ${Buffer.from(`${emailAddress}/token:${apiToken}`).toString('base64')}`,
                'Content-Type': 'application/json',
            },
        }),
        async getArticles(callback, locale = 'en-US', endpoint, currentIndex = 1) {
            endpoint =
                endpoint || `/api/v2/help_center/${locale.toLowerCase()}/articles.json`;
            const { data } = await this.client.get(endpoint);
            await Promise.all(data.articles.map(async (article, ind) => {
                await callback(article, currentIndex * (ind + 1));
            }));
            if (data.next_page)
                await this.getArticles(callback, locale, data.next_page, currentIndex + 1);
        },
    };
}
exports.default = ZendeskClient;
