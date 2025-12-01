import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import SiteRoute from './routes';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

export default function App() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar/>
      <main className='grow'>
        <SiteRoute />
      </main>

      <Footer />
    </div>
  );
}