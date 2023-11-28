import { ReactNative as RN, React } from "@vendetta/metro/common";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";
import { Forms } from "@vendetta/ui/components";
import icons from "./common/icons";
const { FormRow, FormDivider, FormInput, FormSection } = Forms;

export default () => {
    useProxy(storage);

    return (
        <RN.ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 38 }}>
            <FormSection title="Authentication" titleStyleType="no_border">
                 <FormInput
                 title='SentiraAI API Key'
                 leading={<FormRow.Icon source={icons.Edit} />}
                 placeholder={"Enter your SentiraAI API Key"}
                  value={storage.authToken}
                  onChange={v => {
                        storage.authToken = v;
                  }}
               />
                <FormDivider />
                <FormRow
                    label="Log out of SentiraAI"
                    subLabel="This will clear your API token."
                    leading={<FormRow.Icon source={icons.Delete} />}
                    disabled={storage.authToken.length === 0}
                    onPress={() => storage.authToken = ""}
                />
            </FormSection>
        </RN.ScrollView>
    )
}