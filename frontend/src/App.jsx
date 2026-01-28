import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Upload from './pages/Upload';
import './App.css'
import Results from './pages/Results';
import Home from './pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/results/:id' element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}
