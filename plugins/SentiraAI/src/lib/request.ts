import { logger } from "@vendetta";
import { settings } from "..";
import { storage } from "@vendetta/plugin";
import { SentiraAIClient } from "@sentira-ai/common/sentira_client";



export async function getSummary(args) {

    logger.info("SentiraAI getSummary called");
    let client = new SentiraAIClient(storage["apiKey"]);

    let summarize = await client.summarize(
        {
            text: args[0].value,
            summaryLength: args[1]?.value,
            summaryFormat: settings.format,
            model: settings.model,
            userId: "",
        }
    )
    logger.info(summarize.response.summary);
    return { content: summarize.response.summary };

}
