export interface SummarizeResponse {
    result: string;
    creditsUsed: number;
    tokensProcessed: number;
    response: Response;
}

export interface Response {
    id: string;
    summary: string;
}

export interface SummarizeRequestBody {
    userId: string;
    text: string;
    summaryLength?: "short" | "medium" | "long";
    summaryFormat?: "paragraph" | "bullets";
    model: 'command' | 'command-light' | 'command-nightly' | 'command-light-nightly';
}