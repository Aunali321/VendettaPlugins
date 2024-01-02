// Implementation of API for SentiraAI
import { logger } from "@vendetta";
import { SummarizeResponse, SummarizeRequestBody } from "./types";

export class SentiraAI {
    private readonly baseUrl: string;
    private readonly apiKey: string;

    constructor(baseUrl: string, apiKey: string) {
        logger.info("SentiraAI API initialized");
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }

    public async summarize(
        body: SummarizeRequestBody
    ): Promise<SummarizeResponse> {
        logger.info("Summarize method called");
        logger.info(`Summarize request body: ${JSON.stringify(body)}`);
        const response = await fetch(`${this.baseUrl}/summarize`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": this.apiKey,
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Failed to summarize: ${response.statusText}`);
        }

        const data = await response.json();
        logger.info(`Summarize response: ${JSON.stringify(data)}`);
        return {
            result: data.result,
            creditsUsed: data.creditsUsed,
            tokensProcessed: data.tokensProcessed,
            response: {
                id: data.response.id,
                summary: data.response.summary,
            },
        };
    }
}
