import axios from 'axios'
import AuthService from "./AuthService";

export default class UsersService {
	static axiosInstance = axios.create({
		baseURL: process.env.REACT_APP_API_URL + '/Users',
		headers: AuthService.getAuthHeader(),
	});

	static async getById(id) {
		const response = await this.axiosInstance.get(`/${id}`);
		return response;
	}
	static async getPostsByUserId(id) {
		const response = await this.axiosInstance.get(`/${id}/posts`);
		return response;
	}
	static async getRatingsByUserId(id) {
		const response = await this.axiosInstance.get(`/${id}/ratings`);
		return response;
	}
	static async getAll() {
		const response = await this.axiosInstance.get();
		return response;
	}
	static async editUsername(userId, name) {
		const response = await this.axiosInstance.put(`/${userId}/changeName`, {}, {
			params: {
				newName: name
			}
		});
		return response;
	}
	static async editEmail(userId, email) {
		const response = await this.axiosInstance.put(`/${userId}/changeEmail`, null, {
			params: {
				newEmail: email
			}
		});
		return response;
	}
	static async updateToAdmin(userId) {
		const response = await this.axiosInstance.put(`/${userId}/changeRole`);
		return response;
	}
	static async deleteUserById(id) {
		const response = await this.axiosInstance.delete(id);
		return response;
	}
	static updateInstance() {
		this.axiosInstance = axios.create({
			baseURL: process.env.REACT_APP_API_URL + '/Users',
			headers: AuthService.getAuthHeader(),
		});
	}
}