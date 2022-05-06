import axios from "axios";

export default class AuthService {
	
	static URL = "https://localhost:44386/api/Authenticate";
	static URLid = 'https://localhost:44386';
	static async login(username, password) {
		const response = await axios.post(AuthService.URL + '/login', {
			username,
			password,
		});
		if (response.data.token) {
			localStorage.setItem("user", JSON.stringify(response.data));
		}
		return response;
	}
	static logout() {
		localStorage.removeItem("user");
	}
	static async register(username, email, password) {
		const response = await axios.post(AuthService.URL + '/register', {
			username, 
			email, 
			password,
		});
		return response;
	}
	static getCurrentUser() {
		return JSON.parse(localStorage.getItem("user"));
	}
}
