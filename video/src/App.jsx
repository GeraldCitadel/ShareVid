import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import GetVideos from './pages/GetVideos';
import EditVideo from './pages/EditVideo';
import ShareVideo from './pages/ShareVideo';
import Navbar from './components/Navbar';
import Video from './pages/Video';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
        <ToastContainer />
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/get-videos' element={<GetVideos />} />
            <Route path='/share-video' element={<ShareVideo />} />
            <Route path='/get-video/:videoId' element={<Video />} />
            <Route path='/get-video/edit/:videoId' element={<EditVideo />} />
        </Routes>
        <Footer />
    </div>
  )
}

export default App