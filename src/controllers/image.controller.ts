import { NextFunction, Request, Response } from "express";
import { User } from "../interfaces/user.interface";
import ImageService from "../services/image.service";

class ImageController {
  private imageService = new ImageService();

  public images = async (req:any, res: Response, next: NextFunction) => {
    try {
      const data = req.query;
      const limit = data.limit ? data.limit : 5 ;
      const ownerId = req.user._id;
      const getAllData = await this.imageService.images(ownerId, Number(limit));
      
      res.status(201).json({ limit, data: getAllData, message: "images" });
    } catch (error) {
      next(error);
    }
  };

  public imagesId = async (req:any, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const getImagesId = await this.imageService.imagesId(id);
      
      res.status(201).json({
        id: getImagesId._id,
        hits: getImagesId.hits + 1,
        uri: getImagesId.uri
      });

    } catch (error) {
      next(error);
    }
  }

}

export default ImageController;
