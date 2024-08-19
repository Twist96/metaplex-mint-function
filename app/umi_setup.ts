import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { web3JsEddsa } from "@metaplex-foundation/umi-eddsa-web3js";
import { web3JsRpc } from "@metaplex-foundation/umi-rpc-web3js";
import { fetchHttp } from "@metaplex-foundation/umi-http-fetch";
import {
  createSignerFromKeypair,
  keypairIdentity,
} from "@metaplex-foundation/umi";
import * as bs58 from "bs58";
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import { createBundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr";

export const umi = createUmi("https://api.devnet.solana.com")
  .use(web3JsEddsa())
  .use(web3JsRpc("https://api.devnet.solana.com", { httpAgent: false }))
  .use(fetchHttp())
  .use(mplCandyMachine());

umi.uploader = createBundlrUploader(umi);
//let balance = await bundler.getBalance();

let secretKey = bs58.decode(
  "3VXnem4KDbvF1Z7eCZuF7z5sVrmWwTvUkVW1Est9YXjvzZmoNKA8BxVq6z5bQgFbYJFw6hVa8TWxrVT8TpS4osyo"
);
const keypair = umi.eddsa.createKeypairFromSecretKey(secretKey);
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(keypairIdentity(myKeypairSigner));
