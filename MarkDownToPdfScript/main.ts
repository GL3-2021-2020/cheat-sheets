import { promises as fsp } from "fs";
import * as fs from "fs";
import * as path from "path";
import { mdToPdf } from "md-to-pdf";
import AdmZip from "adm-zip";

import recursiveReadDir from "recursive-readdir";

export const work = async (source: string, target: string): Promise<void> => {
  if (!fs.existsSync(source)) throw "Source directory does not exist";

  const all = await (
    await recursiveReadDir(source)
  ).filter((e) => path.parse(e).ext === ".md");

  const pdfBufferPromiseArray = all.map(async (e) => {
    const pdf = await mdToPdf({ path: e }).catch(console.error);
    const temp = path.parse(e);
    const newDir = temp.dir.replace(source, "").substr(1);
    const newName = path.format({
      root: path.join(newDir, temp.name),
      ext: ".pdf",
    });

    return pdf ? { name: newName, file: pdf.content } : null;
  });

  const pdfBufferArray = await Promise.all(pdfBufferPromiseArray);

  console.log();

  const targetDir = path.parse(target).dir;

  await fsp
    .access(targetDir)
    .catch(() => fsp.mkdir(targetDir, { recursive: true }));

  const zipFile = new AdmZip();
  pdfBufferArray.forEach((e) => e && zipFile.addFile(e.name, e.file));
  zipFile.writeZip(target);
};

if (process.argv.length < 4) {
  throw "process.argv.length < 4";
}

const [, , source, target] = process.argv;

work(source, target);
