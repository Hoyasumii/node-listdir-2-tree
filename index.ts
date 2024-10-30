import { readdir, stat } from 'node:fs/promises';

async function list(path: string = "./") {
  const dir = await readdir(path, { withFileTypes: true })

  console.log(dir[0].isFile());
  // console.log(await stat(`${path}/${dir[0].isDirectory()}`))
}

await list();

