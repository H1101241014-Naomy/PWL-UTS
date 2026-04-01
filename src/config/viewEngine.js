import ejs from "ejs";
import { readFile } from "fs/promises";
export const render = async (view, data = {}, c = null) => {
const viewPath = `./src/views/${view}.ejs`;
const viewTemplate = await readFile(viewPath, "utf-8");
const content = ejs.render(viewTemplate, data);
const layoutPath = `./src/views/layout.ejs`;
const layoutTemplate = await readFile(layoutPath, "utf-8");
return ejs.render(layoutTemplate, {
...data,
body: content,
currentPath: c?.req?.path || "",
});
};