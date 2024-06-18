import globals from "globals";
import pluginVue, { rules } from "eslint-plugin-vue";


export default [
  { languageOptions:
    { globals: globals.browser }
  },
  // {
  //   rules: {
  //     "prefer-const": "error"
  //   }
  // },
  ...pluginVue.configs["flat/essential"],
];
