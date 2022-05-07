import React, { Component } from 'react'
import axios from 'axios'

export default class api {
    static URL = 'https://localhost:44386/api/Authenticate/register'

    static async Login(userName, password){
        const responce = await axios.post(URL, {userName, password})
        if(responce.data.token){
            localStorage.setItem('user', JSON.stringify(responce.data))
        }
        return responce;
    }
    
    static LogOut(){
        localStorage.removeItem('user');
    }

    static async Register(userName, eMail, password){
        const responce = await axios.post(api.URL, {userName, eMail, password})
        return responce;
    }

    static getCurrentUser(){
        return JSON.parse(localStorage.getItem('user'))
    }
}
