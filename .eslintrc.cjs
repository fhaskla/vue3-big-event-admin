module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module',
    ecmaVersion: 2021,
    requireConfigFile: false,
  },
  plugins: ['prettier'],
  // 启用 eslint-plugin-prettier（将 Prettier 作为 ESLint 规则运行）
  // 继承 eslint-config-prettier（关闭所有与 Prettier 冲突的 ESLint 格式规则）
  extends: ['plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: false, // 末尾分号
        printWidth: 80,
        trailingComma: 'all', // 对象末尾始终携带逗号
        endOfLine: 'auto',
        arrowParens: 'always', // 箭头函数参数始终带括号
      },
    ],
  },
  globals: {
    ElMessage: 'readonly',
    ElMessageBox: 'readonly',
    ElLoading: 'readonly',
  },
}
