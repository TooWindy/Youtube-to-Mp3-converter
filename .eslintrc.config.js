import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import js from "@eslint/js";


export default [
    { languageOptions:
        { globals: globals.browser },
    },
    ...pluginVue.configs["flat/essential"],
    js.configs.recommended,
    {
        rules: {
            "no-unused-vars": "warn",
        },
    },
    {
        rules: {
            'vue/script-indent': ['error', 4, {
                baseIndent: 0,
                switchCase: 0,
                ignores: [],
            }],
            'vue/html-indent': ['error', 4],
            "indent": ["error", 4],
            "comma-dangle": ["error", "always-multiline"],
            'semi': ['error', 'always'],
        },
    },
];
