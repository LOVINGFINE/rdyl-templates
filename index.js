#!/usr/bin/env/node
// import initAction from "./lib/init.js";
// import commander from "commander"; // 处理用户输入的命令

// // 创建项目命令
// commander
//   .Command("create <name>")
//   .option("-f, --force", "强制覆盖本地同名项目") // 配置参数
//   .description("使用脚手架创建项目") // 命令描述说明
//   .action(initAction); // 执行函数
// commander.program.version("1.0.0");
// commander.parse(process.argv);


const process = require('process')
const packageJson = require('./package.json')

/*
* 接收命令行传过来的指令参数
* 由于第一第二个为path信息，我们用不到，所以从第三个开始取
*/
const argvs = process.argv.slice(2)

switch (argvs[0] || '-c') {
    /** 查看当前插件版本 */
    case '-v':
    case '--version':
      console.log(`v${packageJson.version}`)
      break
    /** 创建项目 */
    case '-c':
    case '--create':
      console.log('Create project')
      break
}