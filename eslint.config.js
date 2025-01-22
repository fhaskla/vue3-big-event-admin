import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  skipFormatting,

  {
    name: 'rules',
    rules: {
      'vue/multi-word-component-names': [
        'warn',
        {
          ignores: ['index'], // 允许 'index' 作为单个单词组件名
        },
      ],
      'vue/no-setup-props-destructure': 'off', // 关闭 props 解构的校验
    },
  },
]
