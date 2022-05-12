import React from 'react'
import { Navigate } from 'react-router-dom';
import AuthService from '../api/AuthService';
import { useAuth } from '../hooks/useAuth';

export const RequireAuth = ({ children }) => {
	
	const { user } = useAuth();

	if (!user || user.role !== 'Admin') {
		return <Navigate to="/"/>
	}

	return children;
}
