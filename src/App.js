import logo from './logo.svg';
import './App.css';
import PostItem from './components/PostItem';
import AllPostsPage from './pages/AllPostsPage';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
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

function App() {
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		if (AuthService.getCurrentUser() !== null) {
			setIsAuth(true);
		}
	}, [])

	return (
		<>
			<AuthContext.Provider
				value={{
					isAuth: isAuth,
					setIsAuth: setIsAuth
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
						} />

					</Route>
				</Routes>
			</AuthContext.Provider>
		</>
	);
}

export default App;

