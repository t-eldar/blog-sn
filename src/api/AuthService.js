import axios from "axios";

export default class AuthService {
	
	static URL = "https://localhost:8080/api/Authenticate";
	static async login(username, password) {
		const response = await axios.post(AuthService.URL + '/login', {
			username,
			password,
		});
		if (response.data.token) {
			const encryptedJWT = response.data.token.split('.')[1];
			const decryptedJWT = JSON.parse(atob(encryptedJWT));
			console.log(decryptedJWT)
			const user = {
				name: decryptedJWT['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
				id: decryptedJWT['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
				role: decryptedJWT['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
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
