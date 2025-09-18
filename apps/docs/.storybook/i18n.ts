import { createI18n } from "vue-i18n";
import  fa from '../src/locale/fa-IR.json'
const i18n = createI18n({
  legacy: false,
  locale: "fa",
  compilation: {
    strictMessage: false,
  },
  globalInjection: true,
    messages: {
      fa
    },
    warnHtmlInMessage: false,
});
export default i18n;
