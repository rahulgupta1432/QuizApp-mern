import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ProfilePage from './pages/ProfilePage';
// import ProfilePage from './pages/ProfilePage';
// import ProtectedRoute from './components/Routes/ProtectedRoute';
import 'primereact/resources/themes/saga-blue/theme.css'; // Choose a theme
import 'primereact/resources/primereact.min.css';
import QuizSelection from './pages/Quiz/QuizSelection';
import QuizPage from './pages/Quiz/QuizPage';
import ScorePage from './pages/Quiz/ScorePage';
import Leaderboard from './pages/Quiz/Leaderboard';
import ProtectedRoute from './components/Routes/ProtectedRoute';
// import 'primeicons/primeicons.css';


function App() {
  const isAuthenticated = Boolean(localStorage.getItem('x-authorization'));
  return (
    // <Router>
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        {/* <Route path="/profile" 
        element={<ProtectedRoute ele
        ment={<ProfilePage />} isAuthenticated={isAuthenticated} />} 
        /> */}
        <Route path="/quiz/:topic"
          element={<ProtectedRoute element={<QuizSelection />} isAuthenticated={isAuthenticated} />} />
        <Route path="/profile"
          element={<ProtectedRoute element={<ProfilePage />} isAuthenticated={isAuthenticated} />} />
        <Route path="/quiz/topic/:topicName/id/:topicId" element={<QuizPage />} />
        <Route path="/score"
          element={<ProtectedRoute element={<ScorePage />} isAuthenticated={isAuthenticated} />} />
        <Route path="/leaderboard"
          element={<ProtectedRoute element={<Leaderboard />} isAuthenticated={isAuthenticated} />} />


      </Routes>

      {/* </Router> */}
    </>
  );
}

export default App;
