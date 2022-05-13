import axios from "axios";
import AuthService from "./AuthService";

export default class RatingsService {
	static axiosInstance = axios.create({
		baseURL: process.env.REACT_APP_API_URL + '/Ratings',
		headers: AuthService.getAuthHeader(),
	});

	static async postRating(rating) {
		const response = await this.axiosInstance.post('', rating);
		return response;
	}
	static async putRating(rating) {
		const response = await this.axiosInstance.put('', rating);
		return response;
	}
}