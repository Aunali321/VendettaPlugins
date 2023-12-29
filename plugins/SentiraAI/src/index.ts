import { logger } from "@vendetta";
import { storage } from "@vendetta/plugin";
import { SentiraAI } from "./lib/api";
import Settings from "./settings";
import { registerCommand } from "@vendetta/commands";
import { findByProps } from "@vendetta/metro";
const MessageActions = findByProps("sendMessage", "receiveMessage");
const { sendBotMessage } = findByProps("sendBotMessage")

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
    defaultLength?: SummaryLength;
    apiKey?: string;
} = storage;

settings.model = "command-light";
settings.format = "paragraph";
settings.defaultLength = "medium";

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

        async function getSummary(args, ctx) {
            logger.info("SentiraAI summarize command executed");
            const message = args[0].value;
            const length = args[1]?.value;
            const format = settings.format;
            const model = settings.model;
            const sentiraAI = new SentiraAI(
                "http://sentiraai.auna.li",
                storage.apiKey || "54321"
            );
            let summary = await sentiraAI
                .summarize({
                    text: message,
                    summaryLength: length,
                    summaryFormat: format,
                    model: model,
                })

            return {
                content: summary.response
            }
            // .then((response) => {
            //     sendBotMessage(ctx.channel.id, {
            //         response
            //     });
            //     MessageActions.sendMessage(ctx.channel.id, {
            //         content: response.response
            //     });
            // }
            // ).catch((error) => {
            //     sendBotMessage(ctx.channel.id, {
            //         error
            //     });
            //     MessageActions.sendMessage(ctx.channel.id, {
            //         content: error
            //     });
            // });
        }
    },

    onUnload: () => {
        logger.info("SentiraAI unloaded");
        for (const unpatch of patches) unpatch();
    },
    settings: Settings,

};
