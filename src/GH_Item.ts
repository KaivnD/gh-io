import { BinaryReader } from "csbinary";
import { GH_Types } from "./GH_Types";

export class GH_Item {
  m_name?: string;
  m_index: number = -1;
  m_type: GH_Types = GH_Types.unset;
  m_data: any;

  Read(reader: BinaryReader) {
    this.m_name = reader.readString();
    this.m_index = reader.readInt32();
    this.m_type = reader.readInt32();
    this.ReadBinaryData(reader);
  }

  ReadBinaryData(reader: BinaryReader) {
    switch (this.m_type) {
      case GH_Types.unset:
        throw new Error(
          "Data item type cannot be GH_Types.unset, deserialization failed."
        );
      case GH_Types.gh_bool:
        this.m_data = reader.readBoolean();
        break;
      case GH_Types.gh_byte:
        this.m_data = reader.readByte();
        break;
      case GH_Types.gh_int32:
        this.m_data = reader.readInt32();
        break;
      case GH_Types.gh_int64:
        this.m_data = reader.readInt64();
        break;
      case GH_Types.gh_single:
        this.m_data = reader.readSingle();
        break;
      case GH_Types.gh_double:
        this.m_data = reader.readDouble();
        break;
      case GH_Types.gh_decimal:
        // this.m_data = reader.readDecimal();
        break;
      case GH_Types.gh_date: {
        const ticks = reader.readInt64();
        this.m_data = ticks;
        break;
      }
      case GH_Types.gh_guid:
        this.m_data = reader.readBytes(16);
        break;
      case GH_Types.gh_string:
        this.m_data = reader.readString();
        break;
      case GH_Types.gh_bytearray: {
        const count2 = reader.readInt32();
        this.m_data = reader.readBytes(count2);
        break;
      }
      case GH_Types.gh_doublearray: {
        const num = reader.readInt32();
        if (num > 0) {
          const array = [];
          for (let i = 0; i < num; i++) {
            array[i] = reader.readDouble();
          }
          this.m_data = Array;
        } else {
          this.m_data = 0;
        }
        break;
      }
      case GH_Types.gh_drawing_point: {
        const x4 = reader.readInt32();
        const y4 = reader.readInt32();
        // this.m_data = new Poconst (x4, y4);
        break;
      }
      case GH_Types.gh_drawing_pointf: {
        const x3 = reader.readSingle();
        const y3 = reader.readSingle();
        // this.m_data = new PointF (x3, y3);
        break;
      }
      case GH_Types.gh_drawing_size: {
        const width4 = reader.readInt32();
        const height4 = reader.readInt32();
        // this.m_data = new Size (width4, height4);
        break;
      }
      case GH_Types.gh_drawing_sizef: {
        const width3 = reader.readSingle();
        const height3 = reader.readSingle();
        // this.m_data = new SizeF (width3, height3);
        break;
      }
      case GH_Types.gh_drawing_rectangle: {
        const x2 = reader.readInt32();
        const y2 = reader.readInt32();
        const width2 = reader.readInt32();
        const height2 = reader.readInt32();
        this.m_data = [x2, y2, width2, height2];
        break;
      }
      case GH_Types.gh_drawing_rectanglef: {
        const x = reader.readSingle();
        const y = reader.readSingle();
        const width = reader.readSingle();
        const height = reader.readSingle();
        this.m_data = [x, y, width, height];
        break;
      }
      case GH_Types.gh_drawing_color: {
        const argb = reader.readInt32();
        this.m_data = argb;
        break;
      }
      case GH_Types.gh_drawing_bitmap: {
        const count = reader.readInt32();
        const rd = reader.readBytes(count);
        // MemoryStream memoryStream = new MemoryStream (reader.readBytes (count));
        // Bitmap data = new Bitmap (memoryStream);
        // memoryStream.Close();
        // memoryStream.Dispose();
        // this.m_data = data;
        break;
      }
      case GH_Types.gh_point2d: {
        const nx3 = reader.readDouble();
        const ny3 = reader.readDouble();
        // this.m_data = new GH_Point2D (nx3, ny3);
        break;
      }
      case GH_Types.gh_point3d: {
        const nx2 = reader.readDouble();
        const ny2 = reader.readDouble();
        const nz2 = reader.readDouble();
        // this.m_data = new GH_Point3D (nx2, ny2, nz2);
        break;
      }
      case GH_Types.gh_point4d: {
        const nx = reader.readDouble();
        const ny = reader.readDouble();
        const nz = reader.readDouble();
        const nw = reader.readDouble();
        // this.m_data = new GH_Point4D (nx, ny, nz, nw);
        break;
      }
      case GH_Types.gh_interval1d: {
        const na = reader.readDouble();
        const nb = reader.readDouble();
        // this.m_data = new GH_Interval1D (na, nb);
        break;
      }
      case GH_Types.gh_interval2d: {
        const nu = reader.readDouble();
        const nu2 = reader.readDouble();
        const nv = reader.readDouble();
        const nv2 = reader.readDouble();
        // this.m_data = new GH_Interval2D (nu, nu2, nv, nv2);
        break;
      }
      case GH_Types.gh_line: {
        const ax = reader.readDouble();
        const ay = reader.readDouble();
        const az = reader.readDouble();
        const bx = reader.readDouble();
        const by = reader.readDouble();
        const bz = reader.readDouble();
        // this.m_data = new GH_Line (ax, ay, az, sbx, by, bz);
        break;
      }
      case GH_Types.gh_boundingbox: {
        const minx = reader.readDouble();
        const miny = reader.readDouble();
        const minz = reader.readDouble();
        const maxx = reader.readDouble();
        const maxy = reader.readDouble();
        const maxz = reader.readDouble();
        // this.m_data = new GH_BoundingBox (minx, miny, minz, maxx, maxy, maxz);
        break;
      }
      case GH_Types.gh_plane: {
        const ox = reader.readDouble();
        const oy = reader.readDouble();
        const oz = reader.readDouble();
        const xx = reader.readDouble();
        const xy = reader.readDouble();
        const xz = reader.readDouble();
        const yx = reader.readDouble();
        const yy = reader.readDouble();
        const yz = reader.readDouble();
        // this.m_data = new GH_Plane (ox, oy, oz, xx, xy, xz, yx, yy, yz);
        break;
      }
      case GH_Types.gh_version: {
        const v_major = reader.readInt32();
        const v_minor = reader.readInt32();
        const v_revision = reader.readInt32();
        // this.m_data = new GH_Version (v_major, v_minor, v_revision);
        break;
      }
      default:
        throw new Error("IO Read error: Unknown data type encountered.");
    }
  }

  static createFrom(reader: BinaryReader) {
    var gH_Item = new GH_Item();
    gH_Item.Read(reader);
    return gH_Item;
  }
}
