# 5-CJS和ESM分别是怎么解决循环依赖的

* CJS是CommonJS的缩写，是Node.js的模块规范，它是动态加载模块，模块输出的是值的拷贝。CJS是通过module.exports导出模块，通过require引入模块。
* ESM是ECMAScript的模块规范，是静态加载模块，模块输出的是值的引用。ESM是通过export导出模块，通过import引入模块。