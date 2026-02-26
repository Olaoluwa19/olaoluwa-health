import multer from "multer";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { FILE_TYPE_MAP } from "../config/multerOption.js";

// Define __dirname and __filename for ESM compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadFolder = path.join(__dirname, "..", "public", "uploads");
    if (!fs.existsSync(uploadFolder)) {
      await fsPromises.mkdir(uploadFolder);
    }
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, uploadFolder);
  },
  filename: async (req, file, cb) => {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage });

export default uploadOptions;
