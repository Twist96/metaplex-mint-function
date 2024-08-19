import { promises as fs } from "fs";
import { umi } from "./umi_setup";
import { createBundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr";
import { createGenericFile } from "@metaplex-foundation/umi";

// payer: DpmMV7knnwZcBeLXv9dX3fCHA8jCw7SA7Lzq4dvj1NR3

async function readFile(filePath: string): Promise<Uint8Array> {
  try {
    const data = await fs.readFile(filePath);
    return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  } catch (error) {
    throw error;
  }
}

async function main() {
  const image = await readFile("./assets/appIcon.png");
  let file = createGenericFile(image, "appIcon.png", {
    contentType: "image/png",
  });

  let tx = await umi.uploader.upload([file]);
  console.log({ tx });
}

main()
  .catch((error) => {
    console.log({ error });
  })
  .then((_) => {
    console.log("_DONE_");
  });
