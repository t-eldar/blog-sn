import axios from 'axios'

export default class UserService {
	static URL = 'https://localhost:8080/api/Users';

	static async getById(id){
		const response = await axios.get(UserService.URL + `/${id}`);
		return response;
	}

	static async getPostsByUserId(id){
		const response = await axios.get(UserService.URL + `/${id}` + '/posts');
		return response;
	}
}