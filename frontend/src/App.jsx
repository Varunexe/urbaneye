import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  Upload, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Car,
  Shield,
  Navigation,
  Smartphone,
  Gauge
} from 'lucide-react';

// Mock violation data
const mockViolations = [
  {
    id: 1,
    plate: 'MH12AB1234',
    type: 'helmet',
    location: 'Dadar Junction, Mumbai',
    timestamp: '2024-01-15 10:30:45',
    confidence: 0.94,
    fine: 1000,
    status: 'notified',
    evidence: 'https://via.placeholder.com/400x300/dc2626/ffffff?text=No+Helmet+Violation',
    details: 'Motorcycle rider detected without helmet'
  },
  {
    id: 2,
    plate: 'DL4CAF5678',
    type: 'signal',
    location: 'Connaught Place, Delhi',
    timestamp: '2024-01-15 11:15:22',
    confidence: 0.89,
    fine: 5000,
    status: 'pending',
    evidence: 'https://via.placeholder.com/400x300/ea580c/ffffff?text=Signal+Jump+Violation',
    details: 'Vehicle crossed red signal at intersection'
  },
  {
    id: 3,
    plate: 'KA05MN9012',
    type: 'seatbelt',
    location: 'MG Road, Bangalore',
    timestamp: '2024-01-15 12:45:30',
    confidence: 0.91,
    fine: 1000,
    status: 'notified',
    evidence: 'https://via.placeholder.com/400x300/16a34a/ffffff?text=No+Seatbelt+Violation',
    details: 'Driver detected without seatbelt'
  },
  {
    id: 4,
    plate: 'TN09CD3456',
    type: 'lane',
    location: 'Anna Salai, Chennai',
    timestamp: '2024-01-15 14:20:15',
    confidence: 0.87,
    fine: 500,
    status: 'processing',
    evidence: 'https://via.placeholder.com/400x300/d97706/ffffff?text=Lane+Violation',
    details: 'Vehicle in wrong lane on highway'
  },
  {
    id: 5,
    plate: 'GJ18EF7890',
    type: 'speed',
    location: 'SG Highway, Ahmedabad',
    timestamp: '2024-01-15 15:10:50',
    confidence: 0.96,
    fine: 2000,
    status: 'notified',
    evidence: 'https://via.placeholder.com/400x300/2563eb/ffffff?text=Overspeeding+Violation',
    details: 'Vehicle exceeding speed limit by 25 km/h'
  },
  {
    id: 6,
    plate: 'UP32GH4567',
    type: 'helmet',
    location: 'Hazratganj, Lucknow',
    timestamp: '2024-01-15 16:30:10',
    confidence: 0.92,
    fine: 1000,
    status: 'pending',
    evidence: 'https://via.placeholder.com/400x300/dc2626/ffffff?text=No+Helmet+Violation',
    details: 'Two-wheeler rider without helmet'
  },
  {
    id: 7,
    plate: 'RJ14IJ8901',
    type: 'signal',
    location: 'MI Road, Jaipur',
    timestamp: '2024-01-15 17:45:33',
    confidence: 0.88,
    fine: 5000,
    status: 'notified',
    evidence: 'https://via.placeholder.com/400x300/ea580c/ffffff?text=Signal+Jump+Violation',
    details: 'Red light violation at major intersection'
  },
  {
    id: 8,
    plate: 'WB22KL2345',
    type: 'seatbelt',
    location: 'Park Street, Kolkata',
    timestamp: '2024-01-15 18:20:45',
    confidence: 0.90,
    fine: 1000,
    status: 'pending',
    evidence: 'https://via.placeholder.com/400x300/16a34a/ffffff?text=No+Seatbelt+Violation',
    details: 'Front passenger without seatbelt'
  }
];

// Mock data
const violationTrends = [
  { month: 'Jan', helmet: 45, seatbelt: 23, lane: 18, signal: 67, speed: 34 },
  { month: 'Feb', helmet: 52, seatbelt: 31, lane: 24, signal: 78, speed: 41 },
  { month: 'Mar', helmet: 61, seatbelt: 28, lane: 31, signal: 89, speed: 48 },
  { month: 'Apr', helmet: 58, seatbelt: 35, lane: 27, signal: 92, speed: 52 },
  { month: 'May', helmet: 73, seatbelt: 42, lane: 33, signal: 105, speed: 61 },
  { month: 'Jun', helmet: 69, seatbelt: 38, lane: 29, signal: 98, speed: 58 }
];

const violationTypes = [
  { name: 'Signal Jumping', value: 529, color: '#dc2626' },
  { name: 'No Helmet', value: 358, color: '#ea580c' },
  { name: 'Overspeeding', value: 294, color: '#d97706' },
  { name: 'No Seatbelt', value: 197, color: '#16a34a' },
  { name: 'Lane Violation', value: 162, color: '#2563eb' }
];

// Styles
const styles = {
  app: {
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)',
    minHeight: '100vh',
    color: 'white',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    width: '100%',
    boxSizing: 'border-box'
  },
  container: {
    width: '100vw',
    maxWidth: '100%',
    padding: '1rem 2rem',
    boxSizing: 'border-box',
    margin: 0
  },
  header: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '2rem',
    marginBottom: '1.5rem'
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  headerTitle: {
    fontSize: '2.5rem',
    fontWeight: 700,
    margin: '0 0 0.5rem 0',
    background: 'linear-gradient(45deg, #ffffff, #cccccc)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  headerSubtitle: {
    color: '#9ca3af',
    margin: 0
  },
  statusIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#16a34a',
    fontWeight: 500
  },
  statusDot: {
    width: '8px',
    height: '8px',
    background: '#16a34a',
    borderRadius: '50%',
    animation: 'pulse 2s infinite'
  },
  navigation: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '1rem',
    marginBottom: '2rem'
  },
  navContent: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap'
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '12px',
    background: 'transparent',
    color: '#9ca3af',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: 500
  },
  navButtonActive: {
    background: 'rgba(255, 255, 255, 0.15)',
    color: 'white',
    boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
    width: '100%'
  },
  statCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '1.5rem',
    transition: 'all 0.3s ease'
  },
  statHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  statIcon: {
    padding: '0.75rem',
    borderRadius: '12px'
  },
  trend: {
    fontSize: '0.875rem',
    fontWeight: 600
  },
  statTitle: {
    color: '#9ca3af',
    fontSize: '0.875rem',
    fontWeight: 500,
    margin: '0 0 0.5rem 0'
  },
  statValue: {
    color: 'white',
    fontSize: '2.5rem',
    fontWeight: 700,
    margin: 0
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
    width: '100%'
  },
  chartCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '1.5rem'
  },
  chartTitle: {
    color: 'white',
    fontSize: '1.25rem',
    fontWeight: 600,
    margin: '0 0 1rem 0'
  },
  chartContainer: {
    height: '250px'
  },
  legend: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '0.5rem',
    marginTop: '1rem'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#9ca3af'
  },
  legendDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%'
  },
  activityCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '1.5rem'
  },
  activityTitle: {
    color: 'white',
    fontSize: '1.25rem',
    fontWeight: 600,
    margin: '0 0 1rem 0'
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    transition: 'all 0.3s ease'
  },
  activityIcon: {
    padding: '0.5rem',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white'
  },
  activityContent: {
    flex: 1
  },
  activityPlate: {
    color: 'white',
    fontWeight: 600,
    margin: '0 0 0.25rem 0'
  },
  activityType: {
    color: '#9ca3af',
    fontSize: '0.875rem',
    margin: 0,
    textTransform: 'capitalize'
  },
  activityMeta: {
    textAlign: 'right'
  },
  activityStatus: {
    fontSize: '0.875rem',
    fontWeight: 500,
    margin: '0 0 0.25rem 0',
    textTransform: 'capitalize'
  },
  activityTime: {
    color: '#6b7280',
    fontSize: '0.75rem',
    margin: 0
  },
  placeholderCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '4rem 2rem',
    textAlign: 'center'
  },
  placeholderIcon: {
    color: '#6b7280',
    marginBottom: '1rem'
  },
  placeholderTitle: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 600,
    margin: '0 0 0.5rem 0'
  },
  placeholderText: {
    color: '#9ca3af',
    margin: 0
  }
};

// Animated Counter
const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [end, duration]);
  
  return <span>{count.toLocaleString()}</span>;
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploadFiles, setUploadFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [filterType, setFilterType] = useState('all');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart },
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'violations', label: 'Violations', icon: AlertTriangle },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];

  const stats = [
    { title: 'Total Violations', value: 1540, icon: AlertTriangle, color: '#dc2626', trend: '+12%' },
    { title: 'Processed Today', value: 247, icon: CheckCircle, color: '#16a34a', trend: '+8%' },
    { title: 'Pending SMS', value: 89, icon: Smartphone, color: '#d97706', trend: '-3%' },
    { title: 'Processing Queue', value: 23, icon: Clock, color: '#2563eb', trend: '+5%' }
  ];

  const activities = [
    { id: 1, type: 'helmet', plate: 'MH12AB1234', time: '2 minutes ago', status: 'notified' },
    { id: 2, type: 'signal', plate: 'DL4CAF5678', time: '5 minutes ago', status: 'pending' },
    { id: 3, type: 'seatbelt', plate: 'KA05MN9012', time: '8 minutes ago', status: 'notified' },
    { id: 4, type: 'lane', plate: 'TN09CD3456', time: '12 minutes ago', status: 'processing' },
    { id: 5, type: 'speed', plate: 'GJ18EF7890', time: '15 minutes ago', status: 'notified' }
  ];

  const getViolationIcon = (type) => {
    const icons = { helmet: Shield, signal: AlertTriangle, seatbelt: Car, lane: Navigation, speed: Gauge };
    return icons[type] || AlertTriangle;
  };

  // File upload handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files.filter(file => {
      const validTypes = ['video/mp4', 'video/avi', 'video/mov', 'image/jpeg', 'image/png'];
      return validTypes.includes(file.type) && file.size <= 100 * 1024 * 1024; // 100MB limit
    });

    const newFiles = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
      progress: 0,
      uploadedAt: new Date()
    }));

    setUploadFiles(prev => [...prev, ...newFiles]);
    
    // Simulate upload progress
    newFiles.forEach(fileData => {
      simulateUpload(fileData.id);
    });
  };

  const simulateUpload = (fileId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        setUploadFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { ...f, progress: 100, status: 'processing' }
            : f
        ));
        clearInterval(interval);
        
        // Start processing simulation
        setTimeout(() => simulateProcessing(fileId), 1000);
      } else {
        setUploadFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { ...f, progress: Math.floor(progress) }
            : f
        ));
      }
    }, 200);
  };

  const simulateProcessing = (fileId) => {
    let step = 0;
    const steps = ['Extracting frames', 'Running AI detection', 'Analyzing violations', 'Generating evidence'];
    
    const interval = setInterval(() => {
      if (step < steps.length) {
        setUploadFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { ...f, currentStep: steps[step] }
            : f
        ));
        step++;
      } else {
        setUploadFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { ...f, status: 'completed', currentStep: 'Processing complete' }
            : f
        ));
        clearInterval(interval);
      }
    }, 2000);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status) => {
    const colors = {
      'uploading': '#2563eb',
      'processing': '#d97706', 
      'completed': '#16a34a',
      'error': '#dc2626'
    };
    return colors[status] || '#6b7280';
  };

  const renderUpload = () => (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
      {/* Upload Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          ...styles.chartCard,
          padding: '3rem',
          textAlign: 'center',
          border: dragActive ? '2px dashed #2563eb' : '2px dashed rgba(255, 255, 255, 0.1)',
          backgroundColor: dragActive ? 'rgba(37, 99, 235, 0.1)' : 'rgba(255, 255, 255, 0.05)',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <Upload 
          size={64} 
          style={{
            color: dragActive ? '#2563eb' : '#6b7280',
            marginBottom: '1rem'
          }} 
        />
        <h3 style={{
          color: 'white',
          fontSize: '1.5rem',
          fontWeight: 600,
          margin: '0 0 0.5rem 0'
        }}>
          {dragActive ? 'Drop files here' : 'Upload Traffic Videos or Images'}
        </h3>
        <p style={{
          color: '#9ca3af',
          margin: '0 0 1rem 0'
        }}>
          Drag and drop files here, or click to select
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          marginTop: '1rem',
          fontSize: '0.875rem',
          color: '#6b7280'
        }}>
          <span>✓ MP4, AVI, MOV videos</span>
          <span>✓ JPG, PNG images</span>
          <span>✓ Max 100MB per file</span>
        </div>
        
        <input
          id="fileInput"
          type="file"
          multiple
          accept="video/*,image/*"
          style={{display: 'none'}}
          onChange={(e) => handleFiles(Array.from(e.target.files))}
        />
      </motion.div>

      {/* File List */}
      {uploadFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.activityCard}
        >
          <h3 style={styles.activityTitle}>Processing Queue ({uploadFiles.length})</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            {uploadFiles.map((file, index) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  padding: '1.5rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <div style={{flex: 1}}>
                    <h4 style={{
                      color: 'white',
                      margin: '0 0 0.25rem 0',
                      fontWeight: 600
                    }}>
                      {file.name}
                    </h4>
                    <p style={{
                      color: '#9ca3af',
                      fontSize: '0.875rem',
                      margin: '0 0 0.5rem 0'
                    }}>
                      {formatFileSize(file.size)} • {file.type.split('/')[1].toUpperCase()}
                    </p>
                    {file.currentStep && (
                      <p style={{
                        color: '#2563eb',
                        fontSize: '0.875rem',
                        margin: 0,
                        fontWeight: 500
                      }}>
                        {file.currentStep}
                      </p>
                    )}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{
                      color: getStatusColor(file.status),
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      textTransform: 'capitalize'
                    }}>
                      {file.status}
                    </span>
                    {file.status === 'completed' && (
                      <CheckCircle size={16} style={{color: '#16a34a'}} />
                    )}
                  </div>
                </div>
                
                {/* Progress Bar */}
                {(file.status === 'uploading' || file.status === 'processing') && (
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <motion.div
                      style={{
                        height: '100%',
                        backgroundColor: file.status === 'uploading' ? '#2563eb' : '#d97706',
                        borderRadius: '4px'
                      }}
                      initial={{ width: 0 }}
                      animate={{ 
                        width: file.status === 'uploading' ? `${file.progress}%` : '100%'
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick Stats */}
      {uploadFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}
        >
          {[
            { 
              label: 'Total Files', 
              value: uploadFiles.length,
              color: '#2563eb'
            },
            { 
              label: 'Completed', 
              value: uploadFiles.filter(f => f.status === 'completed').length,
              color: '#16a34a'
            },
            { 
              label: 'Processing', 
              value: uploadFiles.filter(f => f.status === 'processing').length,
              color: '#d97706'
            },
            { 
              label: 'Uploading', 
              value: uploadFiles.filter(f => f.status === 'uploading').length,
              color: '#2563eb'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              style={{
                ...styles.statCard,
                padding: '1rem',
                textAlign: 'center'
              }}
            >
              <p style={{
                color: '#9ca3af',
                fontSize: '0.875rem',
                margin: '0 0 0.5rem 0'
              }}>
                {stat.label}
              </p>
              <p style={{
                color: stat.color,
                fontSize: '1.5rem',
                fontWeight: 700,
                margin: 0
              }}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );

  const renderDashboard = () => (
    <div>
      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={styles.statCard}
          >
            <div style={styles.statHeader}>
              <div style={{ ...styles.statIcon, backgroundColor: `${stat.color}20` }}>
                <stat.icon style={{ width: 24, height: 24, color: stat.color }} />
              </div>
              <div 
                style={{ 
                  ...styles.trend, 
                  color: stat.trend.startsWith('+') ? '#16a34a' : '#dc2626' 
                }}
              >
                {stat.trend}
              </div>
            </div>
            <h3 style={styles.statTitle}>{stat.title}</h3>
            <p style={styles.statValue}>
              <AnimatedCounter end={stat.value} />
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div style={styles.chartsGrid}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          style={styles.chartCard}
        >
          <h3 style={styles.chartTitle}>Violation Trends</h3>
          <div style={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={violationTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Line type="monotone" dataKey="signal" stroke="#dc2626" strokeWidth={3} />
                <Line type="monotone" dataKey="helmet" stroke="#ea580c" strokeWidth={2} />
                <Line type="monotone" dataKey="speed" stroke="#d97706" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          style={styles.chartCard}
        >
          <h3 style={styles.chartTitle}>Violation Distribution</h3>
          <div style={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={violationTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {violationTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={styles.legend}>
            {violationTypes.map((type) => (
              <div key={type.name} style={styles.legendItem}>
                <div style={{ ...styles.legendDot, backgroundColor: type.color }} />
                <span>{type.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={styles.activityCard}
      >
        <h3 style={styles.activityTitle}>Recent Violations</h3>
        <div style={styles.activityList}>
          {activities.map((activity, index) => {
            const Icon = getViolationIcon(activity.type);
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                style={styles.activityItem}
              >
                <div style={styles.activityIcon}>
                  <Icon size={16} />
                </div>
                <div style={styles.activityContent}>
                  <p style={styles.activityPlate}>{activity.plate}</p>
                  <p style={styles.activityType}>{activity.type} violation</p>
                </div>
                <div style={styles.activityMeta}>
                  <p style={{ ...styles.activityStatus, color: getStatusColor(activity.status) }}>
                    {activity.status}
                  </p>
                  <p style={styles.activityTime}>{activity.time}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );

  const renderViolations = () => {
    const filteredViolations = filterType === 'all' 
      ? mockViolations 
      : mockViolations.filter(v => v.type === filterType);

    const violationTypes = [
      { id: 'all', label: 'All Violations', count: mockViolations.length },
      { id: 'helmet', label: 'No Helmet', count: mockViolations.filter(v => v.type === 'helmet').length },
      { id: 'signal', label: 'Signal Jump', count: mockViolations.filter(v => v.type === 'signal').length },
      { id: 'seatbelt', label: 'No Seatbelt', count: mockViolations.filter(v => v.type === 'seatbelt').length },
      { id: 'lane', label: 'Lane Violation', count: mockViolations.filter(v => v.type === 'lane').length },
      { id: 'speed', label: 'Overspeeding', count: mockViolations.filter(v => v.type === 'speed').length }
    ];

    const getViolationColor = (type) => {
      const colors = {
        helmet: '#dc2626',
        signal: '#ea580c',
        seatbelt: '#16a34a',
        lane: '#d97706',
        speed: '#2563eb'
      };
      return colors[type] || '#6b7280';
    };

    const getStatusColor = (status) => {
      const colors = {
        notified: '#16a34a',
        pending: '#d97706',
        processing: '#2563eb'
      };
      return colors[status] || '#6b7280';
    };

    return (
      <div>
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            ...styles.navigation,
            marginBottom: '2rem'
          }}
        >
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}>
            {violationTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setFilterType(type.id)}
                style={{
                  ...styles.navButton,
                  ...(filterType === type.id ? styles.navButtonActive : {}),
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>{type.label}</span>
                <span style={{
                  padding: '0.125rem 0.5rem',
                  borderRadius: '12px',
                  background: filterType === type.id ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  {type.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Violations Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {filteredViolations.map((violation, index) => (
            <motion.div
              key={violation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                ...styles.statCard,
                padding: 0,
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedViolation(violation)}
            >
              {/* Evidence Thumbnail */}
              <div style={{
                width: '100%',
                height: '200px',
                background: `url(${violation.evidence}) center/cover`,
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  background: getViolationColor(violation.type),
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textTransform: 'capitalize'
                }}>
                  {violation.type.replace('_', ' ')}
                </div>
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  background: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: 600
                }}>
                  {Math.floor(violation.confidence * 100)}% confidence
                </div>
              </div>

              {/* Violation Details */}
              <div style={{ padding: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <h3 style={{
                      color: 'white',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      margin: '0 0 0.25rem 0'
                    }}>
                      {violation.plate}
                    </h3>
                    <p style={{
                      color: '#9ca3af',
                      fontSize: '0.875rem',
                      margin: 0
                    }}>
                      {violation.location}
                    </p>
                  </div>
                  <div style={{
                    textAlign: 'right'
                  }}>
                    <p style={{
                      color: getStatusColor(violation.status),
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      margin: '0 0 0.25rem 0',
                      textTransform: 'capitalize'
                    }}>
                      {violation.status}
                    </p>
                    <p style={{
                      color: '#ea580c',
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      margin: 0
                    }}>
                      ₹{violation.fine.toLocaleString()}
                    </p>
                  </div>
                </div>

                <p style={{
                  color: '#9ca3af',
                  fontSize: '0.875rem',
                  margin: '0 0 1rem 0'
                }}>
                  {violation.details}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#6b7280',
                  fontSize: '0.75rem'
                }}>
                  <Clock size={14} />
                  <span>{violation.timestamp}</span>
                </div>
              </div>

              {/* Action Footer */}
              <div style={{
                padding: '1rem 1.5rem',
                background: 'rgba(255, 255, 255, 0.03)',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                gap: '0.75rem'
              }}>
                <button
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'transparent',
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedViolation(violation);
                  }}
                >
                  <Eye size={16} />
                  View Evidence
                </button>
                {violation.status === 'pending' && (
                  <button
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: '#2563eb',
                      color: 'white',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`SMS sent to vehicle owner for ${violation.plate}`);
                    }}
                  >
                    <Smartphone size={16} />
                    Send SMS
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Evidence Modal */}
        <AnimatePresence>
          {selectedViolation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(10px)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
              }}
              onClick={() => setSelectedViolation(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                style={{
                  ...styles.chartCard,
                  maxWidth: '900px',
                  width: '100%',
                  maxHeight: '90vh',
                  overflow: 'auto'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <div>
                    <h2 style={{
                      color: 'white',
                      fontSize: '1.75rem',
                      fontWeight: 700,
                      margin: '0 0 0.5rem 0'
                    }}>
                      Violation Evidence
                    </h2>
                    <p style={{
                      color: '#9ca3af',
                      margin: 0
                    }}>
                      Violation ID: #{selectedViolation.id}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedViolation(null)}
                    style={{
                      padding: '0.5rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '1.5rem',
                      lineHeight: 1
                    }}
                  >
                    ×
                  </button>
                </div>

                {/* Evidence Image */}
                <div style={{
                  width: '100%',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  marginBottom: '1.5rem'
                }}>
                  <img
                    src={selectedViolation.evidence}
                    alt="Violation Evidence"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block'
                    }}
                  />
                </div>

                {/* Violation Details Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  {[
                    { label: 'License Plate', value: selectedViolation.plate },
                    { label: 'Violation Type', value: selectedViolation.type.toUpperCase().replace('_', ' ') },
                    { label: 'Fine Amount', value: `₹${selectedViolation.fine.toLocaleString()}` },
                    { label: 'Confidence', value: `${Math.floor(selectedViolation.confidence * 100)}%` },
                    { label: 'Status', value: selectedViolation.status.toUpperCase() },
                    { label: 'Timestamp', value: selectedViolation.timestamp }
                  ].map((item, index) => (
                    <div key={index} style={{
                      padding: '1rem',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}>
                      <p style={{
                        color: '#9ca3af',
                        fontSize: '0.75rem',
                        margin: '0 0 0.5rem 0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {item.label}
                      </p>
                      <p style={{
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: 600,
                        margin: 0
                      }}>
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Additional Info */}
                <div style={{
                  padding: '1.5rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  marginBottom: '1.5rem'
                }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 600,
                    margin: '0 0 0.75rem 0'
                  }}>
                    Location Details
                  </h3>
                  <p style={{
                    color: '#9ca3af',
                    margin: '0 0 1rem 0'
                  }}>
                    {selectedViolation.location}
                  </p>
                  <h3 style={{
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 600,
                    margin: '0 0 0.75rem 0'
                  }}>
                    Violation Description
                  </h3>
                  <p style={{
                    color: '#9ca3af',
                    margin: 0
                  }}>
                    {selectedViolation.details}
                  </p>
                </div>

                {/* Actions */}
                <div style={{
                  display: 'flex',
                  gap: '1rem'
                }}>
                  <button
                    style={{
                      flex: 1,
                      padding: '1rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'transparent',
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}
                    onClick={() => alert('Evidence downloaded')}
                  >
                    Download Evidence
                  </button>
                  {selectedViolation.status === 'pending' && (
                    <button
                      style={{
                        flex: 1,
                        padding: '1rem',
                        borderRadius: '8px',
                        border: 'none',
                        background: '#2563eb',
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: 500,
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        alert(`SMS notification sent for ${selectedViolation.plate}`);
                        setSelectedViolation(null);
                      }}
                    >
                      Send SMS Notification
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderPlaceholder = (title, IconComponent) => {
    if (title === 'Upload Interface') {
      return renderUpload();
    }
    if (title === 'Violations Gallery') {
      return renderViolations();
    }
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={styles.placeholderCard}
      >
        <IconComponent size={64} style={styles.placeholderIcon} />
        <h2 style={styles.placeholderTitle}>{title}</h2>
        <p style={styles.placeholderText}>Coming up next in our demo!</p>
      </motion.div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'upload': return renderPlaceholder('Upload Interface', Upload);
      case 'violations': return renderPlaceholder('Violations Gallery', Eye);
      case 'analytics': return renderPlaceholder('Advanced Analytics', TrendingUp);
      default: return null;
    }
  };

  return (
    <div style={styles.app}>
      <div style={styles.container}>
        {/* Header */}
        <motion.header 
          style={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div style={styles.headerContent}>
            <div>
              <h1 style={styles.headerTitle}>UrbanEye Traffic Monitor</h1>
              <p style={styles.headerSubtitle}>AI-Powered Traffic Violation Detection System</p>
            </div>
            <div style={styles.statusIndicator}>
              <div style={styles.statusDot} />
              <span>System Online</span>
            </div>
          </div>
        </motion.header>

        {/* Navigation */}
        <nav style={styles.navigation}>
          <div style={styles.navContent}>
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                style={{
                  ...styles.navButton,
                  ...(activeTab === id ? styles.navButtonActive : {})
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== id) {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== id) {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#9ca3af';
                  }
                }}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <main>
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;