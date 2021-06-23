import { promises as fsp } from "fs";
import * as fs from "fs";
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

export const work = async (source: string, target: string): Promise<void> => {
  if (!fs.existsSync(source)) throw "Source directory does not exist";

  const all = await getMDFiles(source, []);
  const a = all.map((e) => path.parse(e).dir.split(path.sep));

  all.forEach(async (e) => {
    const pdf = await mdToPdf({ path: e }).catch(console.error);
    const temp = path.parse(e);

    // this so error prone god please forgive me
    // TODO better replace system
    const newDir = temp.dir.replace(source, target);

    await fsp
      .access(newDir)
      .catch(() => fsp.mkdir(newDir, { recursive: true }));

    const newName = path.format({
      root: path.join(newDir, temp.name),
      ext: ".pdf",
    });
    if (pdf) await fsp.writeFile(newName, pdf.content);
  });
};

work("../Markdown", "../PDF");
