import React from 'react'
import { Navigate } from 'react-router-dom';
import AuthService from '../api/AuthService';

export const RequireAuth = ({ children }) => {

	

	if (!AuthService.getCurrentUser()) {
		return <Navigate to="/login" replace={true}/>
	}

	return children;
}
