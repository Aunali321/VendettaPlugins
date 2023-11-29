import { logger, storage } from "@vendetta";
import { registerCommand } from "@vendetta/commands";
import Settings from "./Settings";
import { SentiraAI } from "./lib/api";
import { ApplicationCommandOptionType } from "./lib/ApplicationCommandTypes";

let commands = []

export const onLoad = () => {
    logger.info("SentiraAI loaded");

    logger.info("Registering commands");
    commands.push(registerCommand({
        name: "summarize",
        displayName: "Summarize",
        description: "Summarize text",
        displayDescription: "Summarize text",
        applicationId: "-1",
        inputType: 1,
        type: 1,
        options: [
            {
                name: "message",
                displayName: "Message to summarize",
                description: "Message to summarize",
                displayDescription: "Message to summarize",
                type: ApplicationCommandOptionType.STRING,
                required: true
            },
            {
                name: "length",
                displayName: "Length of summary",
                description: "Length of summary",
                displayDescription: "Length of summary",
                type: ApplicationCommandOptionType.STRING,
                required: false,
                // @ts-ignore
                choices: [
                    {
                        name: "Short",
                        value: "short"
                    },
                    {
                        name: "Medium",
                        value: "medium"
                    },
                    {
                        name: "Long",
                        value: "long"
                    }
                ]
            },
            {
                name: "format",
                description: "Format of summary",
                type: ApplicationCommandOptionType.STRING,
                required: false,
                // @ts-ignore
                choices: [
                    {
                        name: "Paragraph",
                        value: "paragraph"
                    },
                    {
                        name: "Bullets",
                        value: "bullets"
                    }
                ]
            },
            {
                name: "model",
                description: "Model to use",
                type: ApplicationCommandOptionType.STRING,
                required: true,
                // @ts-ignore
                choices: [
                    {
                        name: "Fast",
                        value: "command-light"
                    },
                    {
                        name: "Slow",
                        value: "command"
                    },
                    {
                        name: "Fast Nightly",
                        value: "command-light-nightly"
                    },
                    {
                        name: "Slow Nightly",
                        value: "command-nightly"
                    }
                ]
            }
        ],


        execute: async (args, ctx) => {
            logger.info("SentiraAI summarize command executed");
            const message = args.message || 'test';
            const length = args.length || 'medium';
            const format = args.format || 'paragraph';
            const model = args.model || 'command-light';
            const sentiraAI = new SentiraAI('http://sentiraai.auna.li', storage.apiKey || '54321');
            sentiraAI.summarize({
                userId: '123',
                text: message,
                summaryLength: length,
                summaryFormat: format,
                model: model
            }).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.error(error);
            });
        }
    }))
}

export const onUnload = () => {
    logger.info("SentiraAI unloaded");
    for (const unregisterCommands of commands) unregisterCommands()
}

export const settings = Settings
