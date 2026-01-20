import { useState } from 'react'
import './App.css'
import Button from '@mui/material/Button'

export default function App() {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('http://localhost:4000/upload', {
      method: 'POST',
      body: formData
    });

    console.log(await res.json());
  }

  // Note: Next try to make the backend sample for upload file

  return (
    <>
      <Button variant='contained'>Hello</Button>
    </>
  )
}
