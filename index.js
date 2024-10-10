#!/usr/bin/env node
import pkg from "./package.json" assert { type: 'json' };
import { program } from "commander";
import createAction from "./lib/create.js";

program
  .version(pkg.version)
  .option("-v, --version")
  .description("A simple CLI tool")
  .command("create")
  .description("Create a new project")
  .action(createAction)
  .parse(process.argv);
