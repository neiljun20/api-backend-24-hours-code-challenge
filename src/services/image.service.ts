import { compare } from "bcrypt";
import { Image } from "../interfaces/image.interface";
import { User } from "../interfaces/user.interface";
import imageModel from "../models/image.model";
import PexelsService from "../services/pexels.service";
import CloudinaryService from "../services/cloudinary.service";

class ImageService {

  private image = imageModel;
  private pexelsService = new PexelsService();
  private cloudinaryService = new CloudinaryService();

  public images = async (owner:string, limit:number = 5): Promise<any> => {

    limit = limit > 10 ? 10 : ( limit < 1 ? 1 : limit );
    let allImages = await this.pexelsService.getImages(limit);

    return await Promise.all(allImages.photos.map(async (img:any) => {

      const src   = img.src.medium;
      const cloud = await this.cloudinaryService.upload(src);

      return await this.image.create({
        owner,
        uri: cloud.url,
        hits:1
      });

    }));

  }

  public imagesId = async (id:string) : Promise<Image> => {
    const image = await this.image.findById(id);

    if(!image) throw new Error("not found");

    const res = await this.image.findByIdAndUpdate(id, { hits: image.hits + 1 });

    if(!res) throw new Error("not found");

    return res;
  }

  public update = async (id:string, imageData:any, user:User) : Promise<Image> => {
    const image = await this.image.findById(id);
    if(!image) throw new Error("not found");

    if(user.role == "user"){
      delete imageData.owner;
    }

    if(user._id != image.owner){
      return image;
    }

    const res = await this.image.findByIdAndUpdate(id, { ...imageData });
    if(!res) throw new Error("not found");

    return res;
  }
  
}

export default ImageService;
