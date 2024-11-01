#!/usr/bin/env node
import { program } from "commander";
import createAction from "./bin/create.js";
import fs from "fs-extra";

const pkg = await fs.readJsonSync("./package.json");

program
  .version(pkg.version)
  .option("-v, --version")
  .description("A simple CLI tool")
  .command("create")
  .description("Create a new project")
  .action(createAction)
  .parse(process.argv);
