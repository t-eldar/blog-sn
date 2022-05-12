import axios from "axios";

export default class CommentsService {
	static URL = process.env.REACT_APP_API_URL + '/Comment';
	static PostsURL = process.env.REACT_APP_API_URL + '/Posts'

	
	static async getByPostId(id) {
		const response = await axios.get(CommentsService.PostsURL + `/${id}/comments`);
		return response;
	}
	static async createComment(comment) {
		const response = await axios.post(CommentsService.URL, comment);
		return response;
	}
	static async editComment(comment) {
		const response = await axios.put(CommentsService.URL + `/${comment.id}`, comment);
		return response;
	}
	static async deleteComment(id) {
		const response = await axios.delete(CommentsService.URL + `/${id}`);
		return response;
	}
}