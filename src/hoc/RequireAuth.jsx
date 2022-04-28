import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const RequireAuth = ({ children }) => {

	const { isAuth } = useAuth();

	if (!isAuth) {
		return <Navigate to="/login" replace={true}/>
	}

	return children;
}
