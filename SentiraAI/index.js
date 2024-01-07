(function(exports,_vendetta,plugin,assets,common,components,storage,commands,sentira_client,toasts){'use strict';var icons = {
  Delete: assets.getAssetIDByName("ic_message_delete"),
  Edit: assets.getAssetIDByName("ic_edit_24px")
};const FriendlyLengthNames = {
  short: "Short",
  medium: "Medium",
  long: "Long"
};
const FriendlyFormatNames = {
  paragraph: "Paragraph",
  bullets: "Bullets"
};
const FriendlyModelNames = {
  command: "Slow",
  "command-light": "Fast",
  "command-nightly": "Slow (Nightly)",
  "command-light-nightly": "Fast (Nightly)"
};const { FormRadioRow: FormRadioRow$2 } = components.Forms;
const { ScrollView: ScrollView$3 } = common.ReactNative;
const models = [
  "command",
  "command-light",
  "command-nightly",
  "command-light-nightly"
];
function Model() {
  storage.useProxy(settings);
  return /* @__PURE__ */ common.React.createElement(ScrollView$3, {
    style: {
      flex: 1
    }
  }, models.map(function(model) {
    return /* @__PURE__ */ common.React.createElement(FormRadioRow$2, {
      label: FriendlyModelNames[model],
      onPress: function() {
        if (settings.model === model)
          return;
        settings.model = model;
        toasts.showToast(`Saved model to ${FriendlyModelNames[model]}`, assets.getAssetIDByName("check"));
      },
      selected: settings.model === model
    });
  }));
}const { FormRadioRow: FormRadioRow$1 } = components.Forms;
const { ScrollView: ScrollView$2 } = common.ReactNative;
const formats = [
  "paragraph",
  "bullets"
];
function Format() {
  storage.useProxy(settings);
  return /* @__PURE__ */ common.React.createElement(ScrollView$2, {
    style: {
      flex: 1
    }
  }, formats.map(function(format) {
    return /* @__PURE__ */ common.React.createElement(FormRadioRow$1, {
      label: FriendlyFormatNames[format],
      onPress: function() {
        if (settings.format === format)
          return;
        settings.format = format;
        toasts.showToast(`Saved model to ${FriendlyFormatNames[format]}`, assets.getAssetIDByName("check"));
      },
      selected: settings.format === format
    });
  }));
}const { ScrollView: ScrollView$1 } = common.ReactNative;
const { FormRadioRow } = components.Forms;
const lengths = [
  "short",
  "medium",
  "long"
];
function DefaultLength() {
  storage.useProxy(settings);
  return /* @__PURE__ */ common.React.createElement(ScrollView$1, null, lengths.map(function(length) {
    return /* @__PURE__ */ common.React.createElement(FormRadioRow, {
      label: FriendlyLengthNames[length],
      onPress: function() {
        if (settings.defaultLength == length)
          return;
        settings.defaultLength = length;
        toasts.showToast(`Saved format to ${FriendlyLengthNames[length]}`, assets.getAssetIDByName("check"));
      },
      selected: settings.defaultLength === length
    });
  }));
}const { FormRow, FormDivider, FormInput, FormSection } = components.Forms;
const { ScrollView } = common.ReactNative;
function Settings() {
  const navigation = common.NavigationNative.useNavigation();
  storage.useProxy(settings);
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
  ];
  return /* @__PURE__ */ common.React.createElement(ScrollView, null, /* @__PURE__ */ common.React.createElement(FormSection, {
    title: "Authentication",
    titleStyleType: "no_border"
  }, /* @__PURE__ */ common.React.createElement(FormInput, {
    title: "SentiraAI API Key",
    leading: /* @__PURE__ */ common.React.createElement(FormRow.Icon, {
      source: icons.Edit
    }),
    placeholder: "Enter your SentiraAI API Key",
    value: settings.apiKey,
    onChange: function(v) {
      settings.apiKey = v.trim();
    }
  }), /* @__PURE__ */ common.React.createElement(FormDivider, null), /* @__PURE__ */ common.React.createElement(FormRow, {
    label: "Log out of SentiraAI",
    subLabel: "This will clear your API token.",
    leading: /* @__PURE__ */ common.React.createElement(FormRow.Icon, {
      source: icons.Delete
    }),
    onPress: function() {
      return settings.apiKey = "";
    }
  })), categories.map(function(param) {
    let { label, sublabel, icon, render, renderTitle } = param;
    return /* @__PURE__ */ common.React.createElement(FormRow, {
      label,
      subLabel: sublabel,
      leading: /* @__PURE__ */ common.React.createElement(FormRow.Icon, {
        source: assets.getAssetIDByName(icon)
      }),
      trailing: function() {
        return /* @__PURE__ */ common.React.createElement(FormRow.Arrow, null);
      },
      onPress: function() {
        return navigation.push("VendettaCustomPage", {
          title: renderTitle,
          render
        });
      }
    });
  }));
}async function getSummary(args) {
  _vendetta.logger.info("SentiraAI getSummary called");
  let client = new sentira_client.SentiraAIClient(plugin.storage["apiKey"]);
  let summarize = await client.summarize({
    text: args[0].value,
    summaryLength: args[1]?.value,
    summaryFormat: settings.format,
    model: settings.model,
    userId: ""
  });
  _vendetta.logger.info(summarize.response.summary);
  return {
    content: summarize.response.summary
  };
}let patches = [];
const settings = plugin.storage;
settings.model = "command-light";
settings.format = "paragraph";
settings.defaultLength = "medium";
const lengthChoices = [
  "short",
  "medium",
  "long"
];
var index = {
  onLoad: function() {
    _vendetta.logger.info("SentiraAI loaded");
    _vendetta.logger.info("Registering commands");
    patches.push(commands.registerCommand({
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
          type: 3
        },
        {
          name: "length",
          displayName: "length",
          description: "Length of summary",
          displayDescription: "Length of summary",
          required: true,
          type: 3,
          // @ts-ignore
          choices: lengthChoices.map(function(length) {
            return {
              name: FriendlyLengthNames[length],
              displayName: FriendlyLengthNames[length],
              value: length
            };
          })
        }
      ],
      // @ts-ignore
      applicationId: -1,
      inputType: 1,
      type: 1,
      execute: getSummary
    }));
  },
  onUnload: function() {
    _vendetta.logger.info("SentiraAI unloaded");
    for (const unpatch of patches)
      unpatch();
  },
  settings: Settings
};exports.default=index;exports.settings=settings;Object.defineProperty(exports,'__esModule',{value:true});return exports;})({},vendetta,vendetta.plugin,vendetta.ui.assets,vendetta.metro.common,vendetta.ui.components,vendetta.storage,vendetta.commands,sentira_client,vendetta.ui.toasts);