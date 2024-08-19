import { promises as fs } from "fs";
import { umi } from "./umi_setup";
import { NFTStandard } from "./nft_standard";
import { createGenericFile, generateSigner } from "@metaplex-foundation/umi";
import { create } from "@metaplex-foundation/mpl-core";

// payer: DpmMV7knnwZcBeLXv9dX3fCHA8jCw7SA7Lzq4dvj1NR3

async function readFile(filePath: string): Promise<Uint8Array> {
  try {
    const data = await fs.readFile(filePath);
    return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  } catch (error) {
    throw error;
  }
}

async function uploadJson(): Promise<string> {
  const image = await readFile("./assets/appIcon.png");
  let file = createGenericFile(image, "appIcon.png", {
    contentType: "image/png",
  });

  let mediaTx = await umi.uploader.upload([file], {
    onProgress: (percent) => {
      console.log(`Uploading media: ${percent}%`);
    },
  });
  console.log({ mediaTx });
  let nftJson: NFTStandard = {
    name: "Super Team",
    description: "Random NFT Collection for study",
    image: mediaTx[0],
    attributes: [
      {
        trait_type: "color",
        value: "pink",
      },
    ],
    properties: {
      files: mediaTx.map((x) => ({ uri: x, type: "image/png", cdn: false })),
      category: "image",
    },
  };

  const jsonTx = await umi.uploader.uploadJson(nftJson, {
    onProgress: (percent) => {
      console.log(`Uploading files: ${percent}%`);
    },
  });
  console.log({ jsonTx });
  return jsonTx;
}

async function main() {
  const assetSigner = generateSigner(umi);
  const jsonURI = await uploadJson();
  const result = await create(umi, {
    asset: assetSigner,
    name: "Super Team",
    uri: jsonURI,
  }).sendAndConfirm(umi);

  console.log({ result });
}

main()
  .catch((error) => {
    console.log({ error });
  })
  .then((_) => {
    console.log("_DONE_");
  });
