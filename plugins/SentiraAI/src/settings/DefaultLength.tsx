import { getAssetIDByName } from "@vendetta/ui/assets"
import { React, ReactNative } from "@vendetta/metro/common"
import { Forms, Summary } from "@vendetta/ui/components"
import { showToast } from "@vendetta/ui/toasts"
import { useProxy } from "@vendetta/storage"
import { settings } from ".."
import { FriendlyLengthNames, SummaryLength } from "../lib/types"

const { FormRow } = Forms
const { ScrollView } = ReactNative

const lengths: SummaryLength[] = ["auto", "short", "medium", "long"];

export default () => {
    useProxy(settings)
    return (
        <ScrollView style={{ flex: 1 }}>
            {
                lengths.map((length) => <FormRow
                    label={FriendlyLengthNames[length]}
                    trailing={() => <FormRow.Arrow />}
                    onPress={() => {
                        if (settings.defaultLength == length) return
                        settings.defaultLength = length
                        showToast(`Saved format to ${FriendlyLengthNames[length]}`, getAssetIDByName("check"))
                    }}
                />)
            }
        </ScrollView>
    )
}