import { logger } from "@vendetta";
import { settings } from "..";
import { SentiraAI } from "./api";
import { storage } from "@vendetta/plugin";

export async function getSummary(args) {
    logger.info("SentiraAI summarize command executed");
    const message = args[0].value;
    const length = args[1]?.value;
    const format = settings.format;
    const model = settings.model;
    const sentiraAI = new SentiraAI(
        "https://api.sentiraai.com",
        storage["apiKey"]
    );
    let summary = await sentiraAI.summarize({
        text: message,
        summaryLength: length,
        summaryFormat: format,
        model: model,
    });

    return { content: summary.response.summary };
}
