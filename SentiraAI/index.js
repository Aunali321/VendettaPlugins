(function(exports,_vendetta,commands$1,common,storage,plugin,components,assets){'use strict';var icons = {
  Delete: assets.getAssetIDByName("ic_message_delete"),
  Edit: assets.getAssetIDByName("ic_edit_24px")
};const { FormRow, FormDivider, FormInput, FormSection } = components.Forms;
function Settings() {
  storage.useProxy(plugin.storage);
  return /* @__PURE__ */ common.React.createElement(common.ReactNative.ScrollView, {
    style: {
      flex: 1
    },
    contentContainerStyle: {
      paddingBottom: 38
    }
  }, /* @__PURE__ */ common.React.createElement(FormSection, {
    title: "Authentication",
    titleStyleType: "no_border"
  }, /* @__PURE__ */ common.React.createElement(FormInput, {
    title: "SentiraAI API Key",
    leading: /* @__PURE__ */ common.React.createElement(FormRow.Icon, {
      source: icons.Edit
    }),
    placeholder: "Enter your SentiraAI API Key",
    value: plugin.storage.apiKey,
    onChange: function(v) {
      plugin.storage.apiKey = v;
    }
  }), /* @__PURE__ */ common.React.createElement(FormDivider, null), /* @__PURE__ */ common.React.createElement(FormRow, {
    label: "Log out of SentiraAI",
    subLabel: "This will clear your API token.",
    leading: /* @__PURE__ */ common.React.createElement(FormRow.Icon, {
      source: icons.Delete
    }),
    onPress: function() {
      return plugin.storage.apiKey = "";
    }
  })));
}function _class_call_check(instance, Constructor) {
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
}();var ApplicationCommandInputType;
(function(ApplicationCommandInputType2) {
  ApplicationCommandInputType2[ApplicationCommandInputType2["BUILT_IN"] = 0] = "BUILT_IN";
  ApplicationCommandInputType2[ApplicationCommandInputType2["BUILT_IN_TEXT"] = 1] = "BUILT_IN_TEXT";
  ApplicationCommandInputType2[ApplicationCommandInputType2["BUILT_IN_INTEGRATION"] = 2] = "BUILT_IN_INTEGRATION";
  ApplicationCommandInputType2[ApplicationCommandInputType2["BOT"] = 3] = "BOT";
  ApplicationCommandInputType2[ApplicationCommandInputType2["PLACEHOLDER"] = 4] = "PLACEHOLDER";
})(ApplicationCommandInputType || (ApplicationCommandInputType = {}));
var ApplicationCommandOptionType;
(function(ApplicationCommandOptionType2) {
  ApplicationCommandOptionType2[ApplicationCommandOptionType2["SUB_COMMAND"] = 1] = "SUB_COMMAND";
  ApplicationCommandOptionType2[ApplicationCommandOptionType2["SUB_COMMAND_GROUP"] = 2] = "SUB_COMMAND_GROUP";
  ApplicationCommandOptionType2[ApplicationCommandOptionType2["STRING"] = 3] = "STRING";
  ApplicationCommandOptionType2[ApplicationCommandOptionType2["INTEGER"] = 4] = "INTEGER";
  ApplicationCommandOptionType2[ApplicationCommandOptionType2["BOOLEAN"] = 5] = "BOOLEAN";
  ApplicationCommandOptionType2[ApplicationCommandOptionType2["USER"] = 6] = "USER";
  ApplicationCommandOptionType2[ApplicationCommandOptionType2["CHANNEL"] = 7] = "CHANNEL";
  ApplicationCommandOptionType2[ApplicationCommandOptionType2["ROLE"] = 8] = "ROLE";
  ApplicationCommandOptionType2[ApplicationCommandOptionType2["MENTIONABLE"] = 9] = "MENTIONABLE";
  ApplicationCommandOptionType2[ApplicationCommandOptionType2["NUMBER"] = 10] = "NUMBER";
  ApplicationCommandOptionType2[ApplicationCommandOptionType2["ATTACHMENT"] = 11] = "ATTACHMENT";
})(ApplicationCommandOptionType || (ApplicationCommandOptionType = {}));
var ApplicationCommandType;
(function(ApplicationCommandType2) {
  ApplicationCommandType2[ApplicationCommandType2["CHAT"] = 1] = "CHAT";
  ApplicationCommandType2[ApplicationCommandType2["USER"] = 2] = "USER";
  ApplicationCommandType2[ApplicationCommandType2["MESSAGE"] = 3] = "MESSAGE";
})(ApplicationCommandType || (ApplicationCommandType = {}));let commands = [];
const onLoad = function() {
  _vendetta.logger.info("SentiraAI loaded");
  _vendetta.logger.info("Registering commands");
  commands.push(commands$1.registerCommand({
    name: "summarize",
    displayName: "Summarize",
    description: "Summarize text",
    displayDescription: "Summarize text",
    applicationId: "-1",
    inputType: 1,
    type: 1,
    options: [
      {
        name: "message",
        displayName: "Message to summarize",
        description: "Message to summarize",
        displayDescription: "Message to summarize",
        type: ApplicationCommandOptionType.STRING,
        required: true
      },
      {
        name: "length",
        displayName: "Length of summary",
        description: "Length of summary",
        displayDescription: "Length of summary",
        type: ApplicationCommandOptionType.STRING,
        required: false,
        // @ts-ignore
        choices: [
          {
            name: "Short",
            value: "short"
          },
          {
            name: "Medium",
            value: "medium"
          },
          {
            name: "Long",
            value: "long"
          }
        ]
      },
      {
        name: "format",
        displayName: "Format of summary",
        description: "Format of summary",
        displayDescription: "Format of summary",
        type: ApplicationCommandOptionType.STRING,
        required: false,
        // @ts-ignore
        choices: [
          {
            name: "Paragraph",
            value: "paragraph"
          },
          {
            name: "Bullets",
            value: "bullets"
          }
        ]
      },
      {
        name: "model",
        displayName: "Model to use",
        description: "Model to use",
        displayDescription: "Model to use",
        type: ApplicationCommandOptionType.STRING,
        required: true,
        // @ts-ignore
        choices: [
          {
            name: "Fast",
            value: "command-light"
          },
          {
            name: "Slow",
            value: "command"
          },
          {
            name: "Fast Nightly",
            value: "command-light-nightly"
          },
          {
            name: "Slow Nightly",
            value: "command-nightly"
          }
        ]
      }
    ],
    execute: async function(args, ctx) {
      _vendetta.logger.info("SentiraAI summarize command executed");
      const message = args.message;
      const length = args.length;
      const format = args.format;
      const model = args.model;
      const sentiraAI = new SentiraAI("http://sentiraai.auna.li", _vendetta.storage.apiKey || "54321");
      sentiraAI.summarize({
        userId: "123",
        text: message,
        summaryLength: length,
        summaryFormat: format,
        model: model || "command-light"
      }).then(function(response) {
        console.log(response);
      }).catch(function(error) {
        console.error(error);
      });
    }
  }));
};
const onUnload = function() {
  _vendetta.logger.info("SentiraAI unloaded");
  for (const unregisterCommands of commands)
    unregisterCommands();
};
const settings = Settings;exports.onLoad=onLoad;exports.onUnload=onUnload;exports.settings=settings;return exports;})({},vendetta,vendetta.commands,vendetta.metro.common,vendetta.storage,vendetta.plugin,vendetta.ui.components,vendetta.ui.assets);