import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import AuthService from '../api/AuthService';

export const RequireAuth = ({ children }) => {

	const location = useLocation();
	
	if (!AuthService.getCurrentUserAuth()) {
		return <Navigate to="/login" state={{from: location}}/>
	}

	return children;
}
