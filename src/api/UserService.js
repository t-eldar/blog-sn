import axios from 'axios'

export default class UserService {
    static URL = 'https://localhost:44386/api/Users';

    static async getUserById(id){
        const responce = await axios.get(UserService.URL + `/${id}`);
        return responce;
    }

    static async getUserPostsById(id){
        const responce = await axios.get(UserService.URL + `/${id}` + '/posts');
        return responce;
    }
}