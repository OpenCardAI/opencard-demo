import { createOpenCardProvider } from "@opencard/sdk/server";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { isTestEnvironment } from "../constants";

export const myProvider = isTestEnvironment
  ? (() => {
      const {
        artifactModel,
        chatModel,
        reasoningModel,
        titleModel,
      } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "chat-model-reasoning": reasoningModel,
          "title-model": titleModel,
          "artifact-model": artifactModel,
        },
      });
    })()
  : (() => {
      const opencard = createOpenCardProvider();
      return customProvider({
        languageModels: {
          "chat-model": opencard("gpt-4o-mini"),
          "chat-model-reasoning": opencard("gpt-4o-mini"),
          "title-model": opencard("gpt-4o-mini"),
          "artifact-model": opencard("gpt-4o-mini"),
        },
      });
    })();
