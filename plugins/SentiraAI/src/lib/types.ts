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

export type SummaryLength = "auto" | "short" | "medium" | "long";

export const FriendlyLengthNames: Record<SummaryLength, string> = {
    auto: "Auto",
    short: "Short",
    medium: "Medium",
    long: "Long",
};

export type SummaryFormat = "paragraph" | "bullets";

export const FriendlyFormatNames: Record<SummaryFormat, string> = {
    paragraph: "Paragraph",
    bullets: "Bullets",
};

export type SummaryModel =
    | "command"
    | "command-light"
    | "command-nightly"
    | "command-light-nightly";

export const FriendlyModelNames: Record<SummaryModel, string> = {
    command: "Slow",
    "command-light": "Fast",
    "command-nightly": "Slow (Nightly)",
    "command-light-nightly": "Fast (Nightly)",
};

export interface SummarizeRequestBody {
    text: string;
    summaryLength?: SummaryLength;
    summaryFormat?: SummaryFormat;
    model: SummaryModel;
}
