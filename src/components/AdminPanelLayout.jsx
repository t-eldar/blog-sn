import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavBar from './AdminNavBar'

const AdminPanelLayout = () => {
	return (
		<>
			<AdminNavBar />
			<Outlet />
		</>
	)
}

export default AdminPanelLayout