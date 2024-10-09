#!/usr/bin/env/node
// 必须在文件头添加如上内容指定运行环境为node
import initAction from "./lib/init.js";
import commander from "commander"; // 处理用户输入的命令

// 创建项目命令
commander
  .Command("create <name>")
  .option("-f, --force", "强制覆盖本地同名项目") // 配置参数
  .description("使用脚手架创建项目") // 命令描述说明
  .action(initAction); // 执行函数
commander.program.version("1.0.0");
commander.parse(process.argv);
