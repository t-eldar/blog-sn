import axios from "axios";

export default class CategoriesService {
	static URL = process.env.REACT_APP_API_URL + '/Categories'; 

	static async getAll() {
		const response = await axios.get(CategoriesService.URL); 
		return response;
	}
	static async getPostsByCategoryId(id) {
		const response = await axios.get(CategoriesService.URL + `/${id}/posts`);
		return response;
	}
	static async getById(id){
		const response = await axios.get(CategoriesService.URL + `/${id}`)
		return response;
	}
}