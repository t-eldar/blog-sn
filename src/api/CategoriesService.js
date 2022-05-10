import axios from "axios";

export default class CategoriesService {
	static URL = 'https://localhost:8080/api/Categories'; 

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