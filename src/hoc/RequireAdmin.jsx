import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RequireAdmin = ({ children }) => {
	
	const { user } = useAuth();

	if (!user || user.role !== 'Admin') {
		return <Navigate to="/"/>
	}

	return children;
}

export default RequireAdmin;
