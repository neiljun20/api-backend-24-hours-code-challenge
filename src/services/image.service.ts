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
        hits:1,
        deleted:false
      });

    }));

  }

  public imagesId = async (id:string, user:User) : Promise<Image|null> => {

    let image = null;

    if(user.role == "user"){
      image = await this.image.findOne({_id: id, deleted:false});
    } else {
      image = await this.image.findById(id);
    }

    if(!image || image.owner != user._id) return null;

    const res = await this.image.findByIdAndUpdate(id, { hits: image.hits + 1 });

    return res;
  }

  public update = async (id:string, imageData:any, user:User) : Promise<Image|null> => {
    const image = await this.image.findById(id);
    if(!image) return null;

    if(user.role == "user"){
      delete imageData.owner;
    }

    if(user._id != image.owner){
      return null;
    }

    const res = await this.image.findByIdAndUpdate(id, { ...imageData });
    return null;

    return res;
  }

  public create = async (imageData:any, user:User) : Promise<Image> => {
    if(user.role == "user"){
      imageData.owner = user._id;
    }

    if(!imageData.hits){
      imageData.hits = 1;
    }

    if(!imageData.hits){
      imageData.deleted = false;
    }

    return await this.image.create({ ...imageData });
  }

  public delete = async (id:string, user:User) : Promise<Image|null> => {
    const found = await this.image.findById(id);
    if(!found) return null;

    if(user.role == "user" && found && found.owner != user._id){
      return null;
    }

    const res = await this.image.findByIdAndUpdate(id, { deleted: true });
    if(!res) return null;
    return res;
  }
  
}

export default ImageService;
