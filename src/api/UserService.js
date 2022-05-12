import axios from 'axios'

export default class UserService {
	static URL = process.env.REACT_APP_API_URL + '/Users';

	static async getById(id){
		const response = await axios.get(UserService.URL + `/${id}`);
		return response;
	}

	static async getPostsByUserId(id){
		const response = await axios.get(UserService.URL + `/${id}` + '/posts');
		return response;
	}
}