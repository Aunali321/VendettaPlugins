import { logger, storage } from "@vendetta";
import { registerCommand } from "@vendetta/commands";
import { ApplicationCommandOptionType } from "./lib/ApplicationCommandTypes";
import Settings from "./Settings";
import { SentiraAI } from "./lib/api";

logger.info("SentiraAI loaded");

interface Plugin {
    onLoad: () => void;
    onUnload: () => void;
    settings: React.ComponentType;
}

let commands = [];

const SentiraAIPlugin: Plugin = {
    onLoad() {
        commands.push(
            registerCommand({
                name: "summarize",
                description: "Summarize text",
                options: [
                    {
                        name: "message",
                        description: "Message to summarize",
                        type: ApplicationCommandOptionType.STRING,
                        required: true,
                    },
                    {
                        name: "length",
                        description: "Length of summary",
                        type: ApplicationCommandOptionType.STRING,
                        required: false,
                        choices: [
                            {
                                name: "Short",
                                value: "short",
                            },
                            {
                                name: "Medium",
                                value: "medium",
                            },
                            {
                                name: "Long",
                                value: "long",
                            },
                        ],
                    },
                    {
                        name: "format",
                        description: "Format of summary",
                        type: ApplicationCommandOptionType.STRING,
                        required: false,
                        choices: [
                            {
                                name: "Paragraph",
                                value: "paragraph",
                            },
                            {
                                name: "Bullets",
                                value: "bullets",
                            },
                        ],
                    },
                    {
                        name: "model",
                        description: "Model to use",
                        type: ApplicationCommandOptionType.STRING,
                        required: false,
                        choices: [
                            {
                                name: "Fast",
                                value: "command-light",
                            },
                            {
                                name: "Slow",
                                value: "command",
                            },
                            {
                                name: "Fast Nightly",
                                value: "command-light-nightly",
                            },
                            {
                                name: "Slow Nightly",
                                value: "command-nightly",
                            },
                        ],
                    },
                ],
                execute: async (args, ctx) => {
                    const message = args[0];
                    const length = args[1];
                    const format = args[2];
                    const model = args[3];
                    const sentiraAI = new SentiraAI(
                        "http://sentiraai.auna.li",
                        storage.authToken
                    );
                    sentiraAI
                        .summarize({
                            userId: "123",
                            text: message,
                            summaryLength: length,
                            summaryFormat: format,
                            model: model,
                        })
                        .then((response) => {
                            console.log(response);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                },
            })
        );
    },

    onUnload() {
        for (const unregisterCommands of commands) unregisterCommands();
    },

    settings: Settings
};

export default SentiraAIPlugin;