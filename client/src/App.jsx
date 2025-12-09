import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AnalyticsTracker from './components/AnalyticsTracker';
import { PageTitleUpdater } from './hooks/usePageTitle';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AskQuestion from './pages/AskQuestion';
import QuestionDetail from './pages/QuestionDetail';
import Profile from './pages/Profile';
import StatsPage from './pages/StatsPage';
import About from './pages/About';

// Placeholder pages
const Tags = () => <div className="container mx-auto p-4">Tags Page (Coming Soon)</div>;

function App() {
  return (
    <Router>
      <div className='min-h-screen bg-gray-50 text-gray-800 font-sans'>
        <AnalyticsTracker />
        <PageTitleUpdater />
        <Header />
        <main className='py-6'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/ask' element={<AskQuestion />} />
            <Route path='/questions/:id' element={<QuestionDetail />} />
            <Route path='/question/:id' element={<QuestionDetail />} />
            <Route path='/tags' element={<Tags />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/stats' element={<StatsPage />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </main>
        <footer className='bg-white border-t mt-auto py-6 text-center text-sm text-gray-500'>
          <div className='container mx-auto'>
            <p>&copy; {new Date().getFullYear()} MedStack.</p>
            <p className='mt-2 text-xs'>
              <span className='font-bold text-red-500'>DISCLAIMER:</span> For educational purposes only — not medical advice.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
