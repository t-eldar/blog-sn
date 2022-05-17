import axios from "axios";
import AuthService from "./AuthService";

export default class PostsService {
	static axiosInstance = axios.create({
		baseURL: process.env.REACT_APP_API_URL + '/Posts',
		headers: AuthService.getAuthHeader(),
	});

	static async getAll() {
		const response = await this.axiosInstance.get();
		return response;
	}
	static async getById(id) {
		const response = await this.axiosInstance.get(`/${id}`);
		return response;
	}
	static async createPost(post) {
		const response = await this.axiosInstance.post('', post);
		console.log(AuthService.getAuthHeader())
		return response;
	}
	static async editPost(post) {
		const response = await this.axiosInstance.put(`/${post.id}`, post);
		return response;
	}
	static async deletePost(id) {
		const response = await this.axiosInstance.delete(`/${id}`);
		return response;
	}
	static async getCommentsByPostId(id) {
		const response = await this.axiosInstance.get(`/${id}/comments`);
		return response;
	}
	static updateInstance() {
		this.axiosInstance = axios.create({
			baseURL: process.env.REACT_APP_API_URL + '/Posts',
			headers: AuthService.getAuthHeader(),
		});
	}
}
