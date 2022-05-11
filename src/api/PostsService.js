import axios from "axios";

export default class PostsService {

	static URL = 'https://localhost:8080/api/Posts'; 

	static async getAll() {
		const response = await axios.get(PostsService.URL);
		return response;
	}
	static async getById(id) {
		const response = await axios.get(PostsService.URL + `/${id}`);
		return response;
	}
	static async createPost(post) {
		const response = await axios.post(PostsService.URL, post);
		return response;
	}
	static async editPost(post) {
		const response = await axios.put(PostsService.URL + `/${post.id}`, post);
		return response;
	}
	static async deletePost(id) {
		const response = await axios.delete(PostsService.URL + `/${id}`);
		return response;
	}
	// static async getCommentsByPostId() {

	// }
}
