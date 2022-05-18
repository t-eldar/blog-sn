import './App.css';
import AllPostsPage from './pages/AllPostsPage';
import PostPage from './pages/PostPage';
import Layout from './components/Layout';
import { Routes, Route, Link } from 'react-router-dom';
import { AuthContext } from './context';
import { useState, useEffect } from 'react';
import AuthService from './api/AuthService';
import UserPage from './pages/UserPage';
import RequireAuth from './hoc/RequireAuth';
import RequireAdmin from './hoc/RequireAuth';
import LoginPage from './pages/LoginPage';
import CategoryPostsPage from './pages/CategoryPostsPage';
import AdminPage from './pages/admin-pages/AdminPage';
import { getNormalizedUserFromToken } from './utils';
import AdminPanelLayout from './components/AdminPanelLayout';
import RegisterAdminPage from './pages/admin-pages/RegisterAdminPage';
import AllUsersPage from './pages/admin-pages/AllUsersPage';
import NorFoundPage from './pages/NotFoundPage';
import { useFetching } from './hooks/useFetching';
import UsersService from './api/UsersService';

function App() {

	const [user, setUser] = useState(null);
	const [userRatings, setUserRatings] = useState(null);
	const [fetchRatings, isRatingsLoading, ratingsError] = useFetching(async (id) => {
		const response = await UsersService.getRatingsByUserId(id);
		setUserRatings(response.data)
	})

	useEffect(() => {
		const userAuth = AuthService.getCurrentUserAuth();
		if (userAuth) {
			const normalizedUser = getNormalizedUserFromToken(userAuth.token);
			const expiration = userAuth.expiration;
			if (Date.now() - new Date(expiration).getTime() > 7200000) {
				AuthService.logout();
			} else {
				setUser(normalizedUser);
				const fetchAPI = async () => {
					await fetchRatings(normalizedUser.id);
				}
				fetchAPI();
			}
		}
	}, [])

	return (
		<>
			<AuthContext.Provider
				value={{
					user,
					setUser,
					userRatings,
					setUserRatings,
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
						<Route path='/not-found' element={<NorFoundPage />} />
					</Route>
					<Route path='/admin-page' element={
						<RequireAdmin>
							<AdminPanelLayout />
						</RequireAdmin>
					}>
						<Route index element={<AdminPage />} />
						<Route path='/admin-page/register-admin' element={<RegisterAdminPage />} />
						<Route path='/admin-page/users' element={<AllUsersPage />} />
					</Route>
				</Routes>
			</AuthContext.Provider>
		</>
	);
}

export default App;

