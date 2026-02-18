import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BeginnerIndex from './pages/BeginnerIndex';
import PractitionerIndex from './pages/PractitionerIndex';
import Basics from './pages/Basics';
import History from './pages/History';
import Tools from './pages/Tools';
import TeaRoomMap from './pages/TeaRoomMap';
import Chashaku from './pages/Chashaku';
import Zengo from './pages/Zengo';
import Pottery from './pages/Pottery';
import Fabrics from './pages/Fabrics';
import Contribute from './pages/Contribute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/beginner-index" element={<BeginnerIndex />} />
        <Route path="/practitioner-index" element={<PractitionerIndex />} />
        <Route path="/basics" element={<Basics />} />
        <Route path="/history" element={<History />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tearoom-map" element={<TeaRoomMap />} />
        <Route path="/chashaku" element={<Chashaku />} />
        <Route path="/zengo" element={<Zengo />} />
        <Route path="/pottery" element={<Pottery />} />
        <Route path="/fabrics" element={<Fabrics />} />
        <Route path="/contribute" element={<Contribute />} />
      </Routes>
    </Router>
  );
}

export default App;