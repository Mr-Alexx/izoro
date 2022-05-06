console.log(JSON.stringify(require.resolve('@umijs/fabric/dist/eslint')));
module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  // plugins: ['@typescript-eslint', 'react'],
  rules: {
    'no-console': 'off',
    // 'no-shadow': 'off',
    'no-nested-ternary': 'off', // 允许三目运算
    'object-curly-spacing': ['error', 'always'], // 对象前后保留空格
    // 'space-before-function-paren': [2, 'always'], // 强制在函数名与(间有空格
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
  },
};
