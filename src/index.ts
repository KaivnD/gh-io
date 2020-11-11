import fs from "fs";
import { BinaryReader, File } from "csbinary";
import { GH_Chunk } from "./GH_Chunk";
import { GH_Item } from "./GH_Item";

export function ReadGH_LooseChunk(file: string): GH_Chunk {
  const reader = new BinaryReader(File(fs.openSync(file, "r")));
  var chunk = new GH_Chunk();
  chunk.Read(reader);
  reader.close();
  return chunk;
}

export { GH_Chunk, GH_Item };
