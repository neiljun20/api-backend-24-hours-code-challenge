import { createClient } from 'pexels';
import { PEXEL_API_KEY } from '../config';

class PexelsService{
	private pexels:any;

	constructor(){
		this.pexels = createClient(String(PEXEL_API_KEY));
	}

	public getImages = async (limit:number) => {
		return await this.pexels.photos.curated({ per_page: limit });
	}
}

export default PexelsService;