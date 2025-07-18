import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Numbers from './pages/Numbers';
import Shapes from './pages/Shapes';
import Animals from './pages/Animals';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/numbers" element={<Numbers />} />
          <Route path="/shapes" element={<Shapes />} />
            <Route path="/animals" element={<Animals />} />
      </Routes>
    </Router>
  );
}
