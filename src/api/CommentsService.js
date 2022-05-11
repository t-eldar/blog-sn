import axios from "axios";

export default class CommentsService {
	static URL = 'https://localhost:8080/api/Comments'

	static async getByPostId(id) {
		const response = await axios.get(CommentsService.URL + `/${id}`);
		return response;
	}
	static async createComment(comment) {
		const response = await axios.post(CommentsService.URL, comment);
		return response;
	}
	static async editComment(comment) {
		const response = await axios.put(CommentsService.URL, comment);
		return response;
	}
	static async deleteComment(id) {
		const response = await axios.delete(CommentsService.URL);
		return response;
	}
}