#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";
import fs from "fs-extra";
import download from "download-git-repo";
import path from "path";

const remote = "https://github.com/LOVINGFINE/rdyl-frend-templates.git#react@vite";

// 定义模板选项
const choices = [
  { name: "React + vite", value: "react@vite" },
  { name: "Vue3 + vite", value: "vue3@vite" },
  { name: "Node + koa", value: "node@koa" },
  { name: "ReactNative", value: "react-native@metro" },
];

const modifyPackageJson = async (name, p) => {
  const url = path.join(p, "package.json");
  if (fs.existsSync(path)) {
    const json = await fs.readJson(url);
    const author = shell
      .exec("git config user.name", { silent: true })
      .stdout.trim();
    json.author = author;
    json.name = name;
    json.version = "1.0.0";
    // 将修改后的 package.json 写回去
    await fs.writeJson(url, json, { spaces: 2 });
  } else {
    console.log(chalk.red("未找到 package.json 文件"));
  }
};

const createAction = async projectName => {
  // 询问用户选择模板
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "请输入项目名称:",
      choices,
    },
    {
      type: "list",
      name: "template",
      message: "请选择项目模板:",
      choices,
    },
  ]);

  const { name, template } = answers;

  // 模拟项目创建过程
  const spinner = ora("正在生成项目...").start();
  try {
    const rootPath = path.resolve(process.cwd(), name);
    // 模拟创建文件夹及文件内容
    download(
      `direct:${remote}#${template}`,
      rootPath,
      { clone: true },
      async err => {
        if (err) {
          spinner.fail("模板下载失败！");
          console.log(chalk.red(err));
          return;
        }
        spinner.succeed("模板下载成功！");
        // 修改 package.json
        await modifyPackageJson(name, rootPath);
        spinner.succeed("项目创建成功!");
        console.log(chalk.blue(`cd ${projectName}`));
      }
    );
  } catch (e) {
    spinner.fail("项目创建失败:项目名称不可用!");
  }
};

export default createAction;
