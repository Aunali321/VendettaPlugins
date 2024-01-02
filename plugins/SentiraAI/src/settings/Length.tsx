import { getAssetIDByName } from "@vendetta/ui/assets";
import { React, ReactNative } from "@vendetta/metro/common";
import { useProxy } from "@vendetta/storage";
import { settings } from "..";
import { FriendlyLengthNames, SummaryLength } from "../lib/types";
import { showToast } from "@vendetta/ui/toasts";
import { Forms } from "@vendetta/ui/components";
const { ScrollView } = ReactNative;
const { FormRadioRow } = Forms;

const lengths: SummaryLength[] = ["auto", "short", "medium", "long"];

export default () => {
    useProxy(settings);

    return (
        <ScrollView>
            {lengths.map((length) => (
                <FormRadioRow
                    label={FriendlyLengthNames[length]}
                    onPress={() => {
                        if (settings.length == length) return;
                        settings.length = length;
                        showToast(
                            `Saved format to ${FriendlyLengthNames[length]}`,
                            getAssetIDByName("check")
                        );
                    }}
                    selected={settings.length === length}
                />
            ))}
        </ScrollView>
    );
};
