import axios from "axios";
import AuthService from "./AuthService";

export default class RatingsService {
	static axiosInstance = axios.create({
		baseURL: process.env.REACT_APP_API_URL + '/Ratings',
		headers: AuthService.getAuthHeader(),
	});
	static async postRating(rating) {
		let response;
		let deleted = true;
		try {
			response = await this.axiosInstance.post('', rating);
			deleted = false;
		} catch (e) {
			if (e.response.data.message.includes('exist')) {
				response = await this.axiosInstance.delete(`/${rating.id}`)
				if (e.response.data.message.includes('True') && !rating.likeStatus
					|| e.response.data.message.includes('False') && rating.likeStatus
				) {
					response = await this.axiosInstance.post('', rating)
					deleted = false;
				}
			}
		}
		return { response, deleted};
	}
	static updateInstance() {
		this.axiosInstance = axios.create({
			baseURL: process.env.REACT_APP_API_URL + '/Ratings',
			headers: AuthService.getAuthHeader(),
		});
	}
}