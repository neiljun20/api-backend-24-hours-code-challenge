import { compare } from "bcrypt";
import { Image } from "../interfaces/image.interface";
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

  public findByPexelsId = async (pexelsId:number) : Promise<any> => {
    return await this.image.findOne({ pexelsId });
  }
  
}

export default ImageService;
