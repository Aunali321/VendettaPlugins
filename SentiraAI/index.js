(function(exports,_vendetta,plugin,assets,common,components,storage,commands,metro,toasts){'use strict';function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}let SentiraAI = /* @__PURE__ */ function() {
  function SentiraAI2(baseUrl, apiKey) {
    _class_call_check(this, SentiraAI2);
    _define_property(this, "baseUrl", void 0);
    _define_property(this, "apiKey", void 0);
    _vendetta.logger.info("SentiraAI API initialized");
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }
  _create_class(SentiraAI2, [
    {
      key: "summarize",
      value: async function summarize(body) {
        _vendetta.logger.info("Summarize method called");
        _vendetta.logger.info(`Summarize request body: ${JSON.stringify(body)}`);
        const response = await fetch(`${this.baseUrl}/summarize`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": this.apiKey
          },
          body: JSON.stringify(body)
        });
        if (!response.ok) {
          throw new Error(`Failed to summarize: ${response.statusText}`);
        }
        const data = await response.json();
        _vendetta.logger.info(`Summarize response: ${JSON.stringify(data)}`);
        return {
          result: data.result,
          creditsUsed: data.creditsUsed,
          tokensProcessed: data.tokensProcessed,
          response: {
            id: data.response.id,
            summary: data.response.summary
          }
        };
      }
    }
  ]);
  return SentiraAI2;
}();var icons = {
  Delete: assets.getAssetIDByName("ic_message_delete"),
  Edit: assets.getAssetIDByName("ic_edit_24px")
};const FriendlyLengthNames = {
  auto: "Auto",
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
};const { FormRow: FormRow$3 } = components.Forms;
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
    return /* @__PURE__ */ common.React.createElement(FormRow$3, {
      label: FriendlyModelNames[model],
      trailing: function() {
        return /* @__PURE__ */ common.React.createElement(FormRow$3.Arrow, null);
      },
      onPress: function() {
        if (settings.model === model)
          return;
        settings.model = model;
        toasts.showToast(`Saved model to ${FriendlyModelNames[model]}`, assets.getAssetIDByName("check"));
      }
    });
  }));
}const { FormRow: FormRow$2 } = components.Forms;
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
    return /* @__PURE__ */ common.React.createElement(FormRow$2, {
      label: FriendlyFormatNames[format],
      trailing: function() {
        return /* @__PURE__ */ common.React.createElement(FormRow$2.Arrow, null);
      },
      onPress: function() {
        if (settings.format === format)
          return;
        settings.format = format;
        toasts.showToast(`Saved model to ${FriendlyFormatNames[format]}`, assets.getAssetIDByName("check"));
      }
    });
  }));
}const { FormRow: FormRow$1 } = components.Forms;
const { ScrollView: ScrollView$1 } = common.ReactNative;
const lengths = [
  "auto",
  "short",
  "medium",
  "long"
];
function DefaultLength() {
  storage.useProxy(settings);
  return /* @__PURE__ */ common.React.createElement(ScrollView$1, {
    style: {
      flex: 1
    }
  }, lengths.map(function(length) {
    return /* @__PURE__ */ common.React.createElement(FormRow$1, {
      label: FriendlyLengthNames[length],
      trailing: function() {
        return /* @__PURE__ */ common.React.createElement(FormRow$1.Arrow, null);
      },
      onPress: function() {
        if (settings.defaultLength == length)
          return;
        settings.defaultLength = length;
        toasts.showToast(`Saved format to ${FriendlyLengthNames[length]}`, assets.getAssetIDByName("check"));
      }
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
      settings.apiKey = v;
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
    let { label, sublabel, icon, render } = param;
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
          title: "Model",
          render
        });
      }
    });
  }));
}const MessageActions = metro.findByProps("sendMessage", "receiveMessage");
const { sendBotMessage } = metro.findByProps("sendBotMessage");
let patches = [];
const settings = plugin.storage;
settings.model = "command-light";
settings.format = "paragraph";
settings.defaultLength = "medium";
const lengthChoices = [
  "auto",
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
      execute: async function(args, ctx) {
        _vendetta.logger.info("SentiraAI summarize command executed");
        const message = args[0].value;
        const length = args[1]?.value;
        const format = settings.format;
        const model = settings.model;
        const sentiraAI = new SentiraAI("http://sentiraai.auna.li", plugin.storage.apiKey || "54321");
        await sentiraAI.summarize({
          text: message,
          summaryLength: length,
          summaryFormat: format,
          model
        }).then(function(response) {
          sendBotMessage(ctx.channel.id, {
            response
          });
          MessageActions.sendMessage(ctx.channel.id, {
            content: response.response
          });
        }).catch(function(error) {
          sendBotMessage(ctx.channel.id, {
            error
          });
          MessageActions.sendMessage(ctx.channel.id, {
            content: error
          });
        });
      }
    }));
  },
  onUnload: function() {
    _vendetta.logger.info("SentiraAI unloaded");
    for (const unpatch of patches)
      unpatch();
  },
  settings: Settings
};exports.default=index;exports.settings=settings;Object.defineProperty(exports,'__esModule',{value:true});return exports;})({},vendetta,vendetta.plugin,vendetta.ui.assets,vendetta.metro.common,vendetta.ui.components,vendetta.storage,vendetta.commands,vendetta.metro,vendetta.ui.toasts);