import axios from "axios";

export default class PostService {
    static URL = 'https://jsonplaceholder.typicode.com/posts';
    static async getAll() {
        const response = await axios.get(PostService.URL);
        return response;
    }
    static async getPostById(id) {
        const response = await axios.get(PostService.URL + `/${id}`);
        return response;
    }
}
