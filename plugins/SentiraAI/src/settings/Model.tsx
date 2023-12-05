import { getAssetIDByName } from "@vendetta/ui/assets"
import { React, ReactNative } from "@vendetta/metro/common"
import { showToast } from "@vendetta/ui/toasts"
import { useProxy } from "@vendetta/storage"
import { settings } from ".."
import { Forms } from "@vendetta/ui/components"
import { FriendlyModelNames, SummaryModel } from "../lib/types"

const { FormRow } = Forms
const { ScrollView } = ReactNative

const models: SummaryModel[] = ["command", "command-light", "command-nightly", "command-light-nightly"]

export default () => {
    useProxy(settings);

    return (
        <ScrollView style={{ flex: 1 }}>
            {
                models.map((model) => <FormRow
                    label={FriendlyModelNames[model]}
                    trailing={() => <FormRow.Arrow />}
                    onPress={() => {
                        if (settings.model === model) return
                        settings.model = model
                        showToast(`Saved model to ${FriendlyModelNames[model]}`, getAssetIDByName("check"))
                    }}
                />)
            }
        </ScrollView>
    );
};