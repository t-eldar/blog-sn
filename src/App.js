import logo from './logo.svg';
import './App.css';
import PostItem from './components/PostItem';
import AllPostsPage from './pages/AllPostsPage';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import PostPage from './pages/PostPage';
import Layout from './components/Layout';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Layout/>}>
					<Route index element={<AllPostsPage/>}/>
					<Route path=':id' element={<PostPage/>}/>
				</Route>
			</Routes>
		</>
	);
}

export default App;

