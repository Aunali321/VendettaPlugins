import { logger } from "@vendetta";
import { storage } from "@vendetta/plugin";
import Settings from "./settings";
import { registerCommand } from "@vendetta/commands";
import { getSummary } from "./lib/request";

import {
    FriendlyLengthNames,
    SummaryFormat,
    SummaryLength,
    SummaryModel,
} from "./lib/types";

let patches = [];

export const settings: {
    model?: SummaryModel;
    format?: SummaryFormat;
    length?: SummaryLength;
    apiKey?: string;
} = storage;

settings.model = "command-light";
settings.format = "paragraph";
settings.length = "medium";

const lengthChoices: SummaryLength[] = ["auto", "short", "medium", "long"];

export default {
    onLoad: () => {
        logger.info("SentiraAI loaded");

        logger.info("Registering commands");
        patches.push(
            registerCommand({
                name: "summarize",
                displayName: "Summarize",
                description: "Summarize text",
                displayDescription: "Summarize text",
                options: [
                    {
                        name: "message",
                        displayName: "message",
                        description: "Message",
                        displayDescription: "Message",
                        required: true,
                        type: 3,
                    },
                    {
                        name: "length",
                        displayName: "length",
                        description: "Length of summary",
                        displayDescription: "Length of summary",
                        required: true,
                        type: 3,
                        // @ts-ignore
                        choices: lengthChoices.map((length) => ({
                            name: FriendlyLengthNames[length],
                            displayName: FriendlyLengthNames[length],
                            value: length,
                        })),
                    },
                ],
                // @ts-ignore
                applicationId: -1,
                inputType: 1,
                type: 1,
                execute: getSummary,
            })
        );
    },

    onUnload: () => {
        logger.info("SentiraAI unloaded");
        for (const unpatch of patches) unpatch();
    },
    settings: Settings,
};
