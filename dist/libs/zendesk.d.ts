declare type ArticleCallback = (article: any, index: number) => any;
export default function ZendeskClient(emailAddress?: string | undefined, apiToken?: string | undefined, zendeskUrl?: string | undefined): {
    client: import("axios").AxiosInstance;
    getArticles(callback: ArticleCallback, locale?: string, endpoint?: string | undefined, currentIndex?: number): Promise<void>;
};
export {};
