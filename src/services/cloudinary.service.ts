import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_NAME } from "../config";

class CloudinaryService{
	private cloudinary:any;

	constructor(){
		this.cloudinary = require('cloudinary').v2;
		this.cloudinary.config({
			cloud_name: CLOUDINARY_NAME,
			api_key: CLOUDINARY_API_KEY,
			api_secret: CLOUDINARY_API_SECRET
		})
	}

	public upload = async (uri:string) => {
		try{
			return await this.cloudinary.uploader.upload(uri);
		} catch(error:any){
			throw new Error(error);
		}
	}
}

export default CloudinaryService;