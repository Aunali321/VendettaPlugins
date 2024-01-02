import { getAssetIDByName } from "@vendetta/ui/assets";
import { React, ReactNative } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import { showToast } from "@vendetta/ui/toasts";
import { useProxy } from "@vendetta/storage";
import { settings } from "..";
import { FriendlyFormatNames, SummaryFormat } from "../lib/types";
const { FormRadioRow } = Forms;

const { FormRow } = Forms;
const { ScrollView } = ReactNative;

const formats: SummaryFormat[] = ["paragraph", "bullets"];

export default () => {
    useProxy(settings);

    return (
        <ScrollView style={{ flex: 1 }}>
            {formats.map((format) => (
                <FormRadioRow
                    label={FriendlyFormatNames[format]}
                    onPress={() => {
                        if (settings.format === format) return;
                        settings.format = format;
                        showToast(
                            `Saved model to ${FriendlyFormatNames[format]}`,
                            getAssetIDByName("check")
                        );
                    }}
                    selected={settings.format === format}
                />
            ))}
        </ScrollView>
    );
};
