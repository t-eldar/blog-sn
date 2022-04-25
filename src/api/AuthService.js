import axios from "axios";

export default class AuthService {
	
	static URL = "";
	static async login(username, password) {
		const response = await axios.post(AuthService.URL, {
			username,
			password,
		});
		if (response.data.accessToken) {
			localStorage.setItem("user", JSON.stringify(response.data));
		}
		return response;
	}
	static logout() {
		localStorage.removeItem("user");
	}
	static async register(username, email, password) {
		const response = await axios.post(AuthService.URL, {
			username, 
			email, 
			password,
		});
	}
	static getCurrentUser() {
		return JSON.parse(localStorage.getItem("user"));
	}
	// static getAuthHeader() {
	// 	const user = JSON.parse(localStorage.getItem("user"));
	// 	if (user && usre.accessToken) {
	// 		return { Authorization: 'Bearer' + user.accessToken };
	// 	}
	// 	return {};
	// }
}
