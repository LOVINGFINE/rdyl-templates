import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { root } from "@/main";
import { i18nConfig } from "@/App.config";

const { locales, initialLang } = i18nConfig;

export const useI18n = defineStore("i18n", () => {
  const lang = ref(LangToken.get(initialLang));

  const dataSource = computed(() => {
    const target = locales[lang.value];
    if (target) {
      return target.messages;
    }
    return {};
  });

  const t = computed(() => ParserI18nFn(dataSource.value));

  watch(lang, (t, o) => {
    if (o !== t && t) {
      LangToken.set(t);
    }
  });

  watch(t, () => {
    root.config.globalProperties.$t = t.value;
    window.$t = t.value;
  });

  return {
    locales,
    dataSource,
    t,
    lang,
  };
});

function ParserI18nFn(data: Record<string, string | number | boolean>) {
  return (k: string, named?: Record<string, unknown>) => {
    let text = data[k];
    if (!text) {
      console.warn(`[i18n] key not found: ${k}`);
      return k;
    }
    if (named) {
      for (const key in named) {
        const varRegExp = new RegExp(`{${key}}`, "g");
        text = `${text}`.replace(varRegExp, `${named[key]}`);
      }
    }
    return text as string;
  };
}

/** @当前语种 */
export const LangToken = {
  name: btoa("Lang-Token").toUpperCase(),
  get(i = "") {
    return atob(localStorage.getItem(this.name) || i);
  },
  set(k: string) {
    localStorage.setItem(LangToken.name, btoa(k));
  },
  remove() {
    localStorage.removeItem(LangToken.name);
  },
};
