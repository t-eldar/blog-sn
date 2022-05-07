import axios from "axios";

export default class PostService {

	//static URL = 'https://jsonplaceholder.typicode.com/posts'; //'https://localhost:8080/api/Posts'
	static URL = 'https://localhost:44386/api/Posts'; 
	static CategoryURL = 'https://localhost:44386/api/Categories'

	static async getAll() {
		const response = await axios.get(PostService.URL);
		return response;
	}
	static async getPostById(id) {
		const response = await axios.get(PostService.URL + `/${id}`);
		return response;
	}
	static async createPost(post) {
		const response = await axios.post(PostService.URL, post);
		return response;
	}

	static async editPost(id, post) {
		const response = await axios.put(PostService.URL + `/${id}`, post);
		return response;
	}
	static async deletePost(id) {
		const response = await axios.delete(PostService.URL + `${id}`);
		return response;
	}

///// поменять в зависимости от api
	static async getAllCategories() {
		const response = await axios.get(PostService.CategoryURL); 
		return response;
	}
	static async getPostsByCategoryId(id) {
		const response = await axios.get(PostService.CategoryURL + `/${id}/posts`);
		return response;
	}
	static async getCategory(id){
		const response = await axios.get(PostService.CategoryURL + `/${id}`)
		return response;
	}

///////
}
