import axios from 'axios'
import React, { Component } from 'react'

export default class postApi {
    static URL = 'https://localhost:8080/api/Posts'
    static catURL = 'https://localhost:8080/api/Categories'

    static async createPost(post){
        const responce = await axios.post(postApi.URL, post);
        console.log('congratulations');
        return responce
    }

    static async getCategory(){
        const responce = await axios.get(postApi.catURL);
        return responce;
    }

    
}
