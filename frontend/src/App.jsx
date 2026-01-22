import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Upload from './pages/Upload';
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
}
