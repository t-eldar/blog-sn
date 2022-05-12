import './App.css';
import AllPostsPage from './pages/AllPostsPage';
import PostPage from './pages/PostPage';
import Layout from './components/Layout';
import { Routes, Route, Link } from 'react-router-dom';
import { AuthContext } from './context';
import { useState, useEffect } from 'react';
import AuthService from './api/AuthService';
import UserPage from './pages/UserPage';
import { RequireAuth } from './hoc/RequireAuth';
import LoginPage from './pages/LoginPage';
import CategoryPostsPage from './pages/CategoryPostsPage';
import AdminPage from './pages/AdminPage';
import { getNormalizedUserFromToken } from './utils';


function App() {

	const [user, setUser] = useState(null);

	useEffect(() => {
		const userAuth = AuthService.getCurrentUserAuth();
		if (userAuth) {
			const normalizedUser = getNormalizedUserFromToken(userAuth.token);
			setUser(normalizedUser);
		}
	}, [])

	return (
		<>
			<AuthContext.Provider
				value={{
					user,
					setUser
				}}>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route index element={<AllPostsPage />} />
						<Route path='/posts/:id' element={<PostPage />} />
						<Route path='/login' element={<LoginPage />} />
						<Route path='/category/:id' element={<CategoryPostsPage />} />
						<Route path='/users/:id' element={
							<RequireAuth>
								<UserPage />
							</RequireAuth>
						}
						/>
					</Route>
					<Route path='admin-page' element={<AdminPage />} />
				</Routes>
			</AuthContext.Provider>
		</>
	);
}

export default App;

