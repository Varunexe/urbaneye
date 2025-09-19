import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import './App.css'

// Simple components for now
const Header = () => (
  <motion.header 
    className="glass-card p-4 mb-6"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <h1 className="text-2xl font-bold text-white">
      🚦 AI Traffic Violation Detection
    </h1>
  </motion.header>
)

const Dashboard = () => (
  <motion.div 
    className="glass-card p-6"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.2 }}
  >
    <h2 className="text-xl font-semibold text-white mb-4">Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="stat-card">
        <h3 className="text-lg font-medium">Total Violations</h3>
        <p className="text-3xl font-bold text-accent">124</p>
      </div>
      <div className="stat-card">
        <h3 className="text-lg font-medium">Pending SMS</h3>
        <p className="text-3xl font-bold text-accent">23</p>
      </div>
      <div className="stat-card">
        <h3 className="text-lg font-medium">Processing</h3>
        <p className="text-3xl font-bold text-accent">5</p>
      </div>
    </div>
  </motion.div>
)

function App() {
  return (
    <Router>
      <div className="min-h-screen app-background">
        <div className="container mx-auto px-4 py-6">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App