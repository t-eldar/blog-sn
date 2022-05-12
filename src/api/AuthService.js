import axios from "axios";

export default class AuthService {

	static axiosInstance = axios.create({
		baseURL: process.env.REACT_APP_API_URL + "/Authenticate",
		headers: AuthService.getAuthHeader(),
	});
	static async login(username, password) {
		const response = await this.axiosInstance.post('/login', {
			username,
			password,
		});
		if (response.data.token) {
			localStorage.setItem("auth-user", JSON.stringify(response.data));
		}
		return response;
	}
	static logout() {
		localStorage.removeItem("auth-user");
	}
	static async register(username, email, password) {
		const response = await this.axiosInstance.post('/register', {
			username,
			email,
			password,
		});
		return response;
	}
	static async registerAdmin(username, email, password) {
		const response = await this.axiosInstance.post('/register-admin', {
			username,
			email,
			password,
		})
		return response;
	}
	static getCurrentUserAuth() {
		return JSON.parse(localStorage.getItem("auth-user"));
	}
	static getAuthHeader() {
		const userAuth = this.getCurrentUserAuth();
		if (!userAuth)
			return {};
		if (!userAuth.token)
			return {};
		return { Authorization: 'Bearer ' + userAuth.token };
	}
}
