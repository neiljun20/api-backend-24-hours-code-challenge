import { model, Schema, Document } from "mongoose";
import { Image } from "../interfaces/image.interface";

const imageSchema: Schema = new Schema({
  uri: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true,
  },
  hits: {
    type: Number,
    required: true
  }
});

const userModel = model<Image & Document>("Image", imageSchema);

export default userModel;
