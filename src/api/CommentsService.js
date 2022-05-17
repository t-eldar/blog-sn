import axios from "axios";
import AuthService from "./AuthService";

export default class CommentsService {
	static axiosInstance = axios.create({
		baseURL: process.env.REACT_APP_API_URL + '/Comment',
		headers: AuthService.getAuthHeader(),
	})
	static async createComment(comment) {
		const response = await this.axiosInstance.post('', comment);
		return response;
	}
	static async editComment(comment) {
		const response = await this.axiosInstance.put(`/${comment.id}`, comment);
		return response;
	}
	static async deleteComment(id) {
		const response = await this.axiosInstance.delete(`/${id}`);
		return response;
	}
	static updateInstance() {
		this.axiosInstance = axios.create({
			baseURL: process.env.REACT_APP_API_URL + '/Comment',
			headers: AuthService.getAuthHeader(),
		});
	}
}