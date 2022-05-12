import axios from 'axios'
import AuthService from "./AuthService";

export default class UserService {
	static axiosInstance = axios.create({
		baseURL:process.env.REACT_APP_API_URL + '/Users',
		headers: AuthService.getAuthHeader(),
	});

	static async getById(id){
		const response = await this.axiosInstance.get(`/${id}`);
		return response;
	}
	static async getPostsByUserId(id){
		const response = await this.axiosInstance.get(`/${id}/posts`);
		return response;
	}
}