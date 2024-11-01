import zhCN from "@/locales/zh-CN.json";
import enUS from "@/locales/en-US.json";

export const i18nConfig: I18nConfig = {
  initialLang: "zh-CN",
  locales: {
    "zh-CN": {
      title: "中文简体",
      messages: zhCN,
    },
    "en-US": {
      title: "English(US)",
      messages: enUS,
    },
  },
};

export const website_name = "vue3-tailwindcss";
