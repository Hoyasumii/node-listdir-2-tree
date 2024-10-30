import { readdir, readFile } from "node:fs/promises";
import { parse } from "acorn";

async function list(path: string = "./") {
  const dir = await readdir(path, { withFileTypes: true });
  const selectedFile = dir.filter((file) => file.name.endsWith(".ts"))[0];

  const myFile = await readFile(`${path}/${selectedFile.name}`, {
    encoding: "utf8",
  });

  const tsDoc = parse(myFile, { ecmaVersion: "latest", sourceType: "module" });

  console.log(tsDoc.);

  // console.log(dir[0].isFile());
  // console.log(await stat(`${path}/${dir[0].isDirectory()}`))
}

await list("./testing");



async function listMethods(filePath: string) {
  const fileContent = await readFile(filePath, 'utf-8');
  const ast = parse(fileContent, { ecmaVersion: 'latest', sourceType: 'module' });

  const methods: string[] = [];

  function extractMethods(node: any) {
    if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') {
      if (node.id && node.id.name) {
        methods.push(node.id.name);
      }
    }
    for (const key in node) {
      if (node[key] && typeof node[key] === 'object') {
        extractMethods(node[key]);
      }
    }
  }

  extractMethods(ast);
  return methods;
}

(async () => {
  const methods = await listMethods('./path/to/your/file.js');
  console.log('Methods:', methods);
})();