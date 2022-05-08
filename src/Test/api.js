import React, { Component } from 'react'
import axios from 'axios'

export default class api {
    static URL = 'https://localhost:8080/api/Authenticate/'

    static async Login(userName, password){
        const responce = await axios.post(api.URL + 'login', {userName, password})
        if(responce.data.token){
            localStorage.setItem('user', JSON.stringify(responce.data))
            console.log('Welcome');
        }
        return responce;
    }
    
    static LogOut(){
        localStorage.removeItem('user');
    }

    static async Register(userName, eMail, password){
        const responce = await axios.post(api.URL + 'register', {userName, eMail, password})
        return responce;
    }

    static getCurrentUser(){
        return JSON.parse(localStorage.getItem('user'))
    }
}
