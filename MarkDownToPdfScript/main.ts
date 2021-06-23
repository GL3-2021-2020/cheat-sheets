import { promises as fsp } from "fs";
import * as path from "path";
import { mdToPdf } from "md-to-pdf";

const getMDFiles = async (
  filesPath: string,
  ignore: string[]
): Promise<string[]> => {
  const dir = await fsp.readdir(filesPath);
  const r = await Promise.all(
    dir
      .map((e) => path.join(filesPath, e))
      .filter((e) => !ignore.some((e1) => e1 === e))
      .map(async (e) =>
        (await fsp.stat(e)).isFile() ? [e] : getMDFiles(e, ignore)
      )
  );
  return r.flatMap((e) => e).filter((e) => e.endsWith(".md"));
};

export const work = async (): Promise<void> => {
  const all = await getMDFiles("../", ["../MarkDownToPdfScript", "../.git"]);
  // console.log(all);
  all.forEach(async (e) => {
    const pdf = await mdToPdf({ path: e }).catch(console.error);
    const temp = path.parse(e);
    const newName = path.format({
      root: path.join(temp.dir, temp.name),
      ext: ".pdf",
    });
    if (pdf) await fsp.writeFile(newName, pdf.content);
  });
};

work();
