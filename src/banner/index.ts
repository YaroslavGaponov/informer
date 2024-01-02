/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { textSync } from "figlet";

export function banner(print = console.log) {
    const file = resolve(__dirname, "..", "..", "package.json");
    const content = readFileSync(file, "utf8");
    const { name, version } = JSON.parse(content);
    print(textSync(`${name} : ${version}`));
}