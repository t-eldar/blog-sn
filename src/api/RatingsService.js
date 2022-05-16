import axios from "axios";
import AuthService from "./AuthService";

export default class RatingsService {
	static axiosInstance = axios.create({
		baseURL: process.env.REACT_APP_API_URL + '/Ratings',
		headers: AuthService.getAuthHeader(),
	});
	static async postRating(rating) {
		let response;
		try {
			response = await this.axiosInstance.post('', rating)
		} catch (e) {
			if (e.response.data.message.includes('exist')) {
				await this.axiosInstance.delete(`/${rating.id}`)
				response = await this.axiosInstance.post('', rating)
			}
		}
		return response;
	}
}