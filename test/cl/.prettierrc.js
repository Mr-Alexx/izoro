module.exports = {
  // 取消该parser，使用该parser react hooks内使用类型会无法格式化，prettier会报错
  // 例如 const ref = userRef<ActionRef>(); // prettier会报错
  // parser: 'babel', // 格式化的解析器，默认是babylon,会自动根据输入文件推断，不用更改设置
  printWidth: 120, // 超过最大值换行
  semi: true, // 始终加分号
  singleQuote: true, // js字符串使用单引号
  jsxSingleQuote: false, // 在jsx中使用单引号代替双引号
  trailingComma: 'all', // 对象末尾始终保留逗号，方便添加新行
  bracketSpacing: true, // 对象前后保留空格
  jsxBracketSameLine: true, // 在jsx中把'>' 是否单独放一行
  arrowParens: 'avoid', // (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号 'bracketSpacing': true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  requirePragma: false, // 若为true，文件顶部加了 /*** @prettier */或/*** @format */的文件才会被格式化
  insertPragma: false, // 当requirePragma参数为true时,此参数为true将向文件顶部添加 /** @format*/
  tabWidth: 2, // 缩进字符
  useTabs: false, // 使用tab缩进
  endOfLine: 'auto',
  embeddedLanguageFormatting: 'auto', // 是否格式化嵌入到JS中的html标记的代码段或者Markdown语法 auto-格式化 off-不格式化
  // proseWrap: 'never', // // 有效选项[always|never|preserve]。当Markdown文本超过printWidth时,是否换行,always-换行 never-不换行 preserve保持原样
};
