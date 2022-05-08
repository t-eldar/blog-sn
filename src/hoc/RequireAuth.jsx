import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const RequireAuth = ({ children }) => {

	const { user } = useAuth();

	if (!user) {
		console.log('noooo')
		console.log(user)
		return <Navigate to="/login" replace={true}/>
	}

	return children;
}
