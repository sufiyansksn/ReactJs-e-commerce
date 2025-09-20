import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage'
import './App.css'

function App() {

  return (
    <Routes>
      <Route index element={<HomePage />} /> {/* or <Route path="/" element={<HomePage />}></Route> */}
      <Route path="checkout" element={<div>Hell Checkout</div>} />
    </Routes>
  )
}

export default App
