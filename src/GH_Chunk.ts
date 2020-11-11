import { BinaryReader } from "csbinary";
import { GH_Item } from "./GH_Item";

export class GH_Chunk {
  m_items: GH_Item[] = [];
  m_chunks: GH_Chunk[] = [];
  m_name: any;
  m_index: number = -1;
  m_comments: any;
  Read(reader: BinaryReader) {
    this.m_name = null;
    this.m_index = -1;
    this.m_comments = null;
    this.m_name = reader.readString();
    this.m_index = reader.readInt32();
    const itemCnt = reader.readInt32();
    const chunkCnt = reader.readInt32();
    for (let i = 0; i < itemCnt; i++) {
      var item = GH_Item.createFrom(reader);
      this.m_items.push(item);
    }
    for (let j = 0; j < chunkCnt; j++) {
        var gH_Chunk = new GH_Chunk();
        gH_Chunk.Read(reader);
        this.m_chunks.push(gH_Chunk);
    }
  }
}
