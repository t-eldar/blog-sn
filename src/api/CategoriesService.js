import axios from "axios";
import AuthService from "./AuthService";

export default class CategoriesService {
	static axiosInstance = axios.create({
		baseURL: process.env.REACT_APP_API_URL + '/Categories',
		headers: AuthService.getAuthHeader(),
	})

	static async getAll() {
		const response = await this.axiosInstance.get(); 
		return response;
	}
	static async getPostsByCategoryId(id) {
		const response = await this.axiosInstance.get(`/${id}/posts`);
		return response;
	}
	static async getById(id){
		const response = await this.axiosInstance.get(`/${id}`)
		return response;
	}
	static updateInstance() {
		this.axiosInstance = axios.create({
			baseURL: process.env.REACT_APP_API_URL + '/Categories',
			headers: AuthService.getAuthHeader(),
		});
	}
}