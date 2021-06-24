"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.work = void 0;
const fs_1 = require("fs");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const md_to_pdf_1 = require("md-to-pdf");
const recursive_readdir_1 = __importDefault(require("recursive-readdir"));
const work = async (source, target) => {
    if (!fs.existsSync(source))
        throw "Source directory does not exist";
    const all = await (await recursive_readdir_1.default(source)).filter((e) => path.parse(e).ext === ".md");
    all.forEach(async (e) => {
        const pdf = await md_to_pdf_1.mdToPdf({ path: e }).catch(console.error);
        const temp = path.parse(e);
        // this so error prone god please forgive me
        // TODO better replace system
        const newDir = temp.dir.replace(source, target);
        await fs_1.promises
            .access(newDir)
            .catch(() => fs_1.promises.mkdir(newDir, { recursive: true }));
        const newName = path.format({
            root: path.join(newDir, temp.name),
            ext: ".pdf",
        });
        if (pdf)
            await fs_1.promises.writeFile(newName, pdf.content);
    });
};
exports.work = work;
if (process.argv.length < 4) {
    throw "process.argv.length < 4";
}
const [, , source, target] = process.argv;
exports.work(source, target);
