import {BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

// Components
import Sidebar from './components/Sidebar'

// Pages
import Dashboard from './pages/Dashboard'
import QuickReview from './pages/QuickReview'
import Batch from './pages/Batch'
import Predictions from './pages/Predictions'
import Models from './pages/Model'

function App() {

  return (
    <>
      <BrowserRouter>
        <div className='flex'>
        <Sidebar />
        <Routes>
            <Route path='/' element = {<Dashboard />} />
            <Route path='/quick-review' element = {<QuickReview />} />
            <Route path='/batch-prediction' element = {<Batch />} />
            <Route path='/predictions' element = {<Predictions />} />
            <Route path='/models' element = {<Models />} />
        </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
