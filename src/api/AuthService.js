import axios from "axios";

export default class AuthService {

	static URL = process.env.REACT_APP_API_URL + "/Authenticate";

	static async login(username, password) {
		const response = await axios.post(AuthService.URL + '/login', {
			username,
			password,
		});
		if (response.data.token) {
			const encryptedJWT = response.data.token.split('.')[1];
			const decryptedJWT = JSON.parse(atob(encryptedJWT));
			console.log(decryptedJWT)
			const user = {};

			for (let value in decryptedJWT) {
				user[value.toLowerCase()] = decryptedJWT[value];
			}
			localStorage.setItem("user", JSON.stringify(user));
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
	static async registerAdmin(username, email, password) {
		const response = await axios.post(AuthService.URL + '/register-admin', {
			username,
			email,
			password,
		})
	}
	static getCurrentUser() {
		return JSON.parse(localStorage.getItem("user"));
	}
}
