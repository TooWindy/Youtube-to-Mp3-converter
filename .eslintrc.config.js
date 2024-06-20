import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
    { languageOptions: { globals: globals.browser } },
    ...pluginVue.configs['flat/essential'],
    eslintConfigPrettier,
    js.configs.recommended,
    {
        rules: {
            'vue/script-indent': [
                'error',
                4,
                {
                    baseIndent: 0,
                    switchCase: 0,
                    ignores: [],
                },
            ],
            'vue/html-indent': ['error', 4],
            'indent': ['error', 4],
            'comma-dangle': ['error', 'always-multiline'],
            'semi': ['error', 'always'],
            'no-unused-vars': 'warn',
            'space-infix-ops': ['error', {'int32Hint': true}],
        },
    },
];
