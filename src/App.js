import logo from './logo.svg';
import './App.css';
import PostItem from './components/PostItem';
import AllPostsPage from './pages/AllPostsPage';
import NavBar from './components/NavBar';

function App() {
	return (
		<>
			<NavBar />
			<AllPostsPage />
		</>
  );
}

export default App;
