import { getAssetIDByName } from "@vendetta/ui/assets";
import {
    React,
    ReactNative,
    NavigationNative,
} from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import { useProxy } from "@vendetta/storage";
import { settings } from ".."
import icons from ".././common/icons";
import Model from "./Model";
import Format from "./Format";
import DefaultLength from "./DefaultLength";
import { FriendlyFormatNames, FriendlyLengthNames, FriendlyModelNames } from "../lib/types";
const { FormRow, FormDivider, FormInput, FormSection } = Forms;
const { ScrollView } = ReactNative;

export default () => {
    const navigation = NavigationNative.useNavigation();
    useProxy(settings);

    const categories = [
        {
            label: "Model to use",
            sublabel: FriendlyModelNames[settings.model],
            icon: "ic_activity_24px",
            render: Model,
            renderTitle: "Model"
        },
        {
            label: "Format of summary",
            sublabel: FriendlyFormatNames[settings.format],
            icon: "ic_activity_24px",
            render: Format,
            renderTitle: "Format"
        },
        {
            label: "Default length of summary",
            sublabel: FriendlyLengthNames[settings.defaultLength],
            icon: "ic_activity_24px",
            render: DefaultLength,
            renderTitle: "DefaultLength"
        }
    ]

    return (
        <ScrollView>
            <FormSection title="Authentication" titleStyleType="no_border">
                <FormInput
                    title='SentiraAI API Key'
                    leading={<FormRow.Icon source={icons.Edit} />}
                    placeholder={"Enter your SentiraAI API Key"}
                    value={settings.apiKey}
                    onChange={(v: string) => {
                        settings.apiKey = v.trim();
                    }}
                />
                <FormDivider />
                <FormRow
                    label="Log out of SentiraAI"
                    subLabel="This will clear your API token."
                    leading={<FormRow.Icon source={icons.Delete} />}
                    onPress={() => settings.apiKey = ""}
                />
            </FormSection>

            {
                categories.map(({ label, sublabel, icon, render }) => (
                    <FormRow
                        label={label}
                        subLabel={sublabel}
                        leading={
                            <FormRow.Icon
                                source={getAssetIDByName(icon)}
                            />
                        }
                        trailing={() => <FormRow.Arrow />}
                        onPress={() =>
                            navigation.push("VendettaCustomPage", {
                                title: "Model",
                                render: render,
                            })
                        }
                    />
                ))
            }
        </ScrollView>
    );
};
