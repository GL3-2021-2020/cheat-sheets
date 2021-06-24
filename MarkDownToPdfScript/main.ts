import { promises as fsp } from "fs";
import * as fs from "fs";
import * as path from "path";
import { mdToPdf } from "md-to-pdf";
import recursiveReadDir from "recursive-readdir";

export const work = async (source: string, target: string): Promise<void> => {
  if (!fs.existsSync(source)) throw "Source directory does not exist";

  const all = await (
    await recursiveReadDir(source)
  ).filter((e) => path.parse(e).ext === ".md");

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
