
import React, { useState, createContext, useContext } from 'react';
import './App.css';
import { FaFileAlt, FaChartLine, FaClipboardList, FaLock, FaEnvelope, FaUpload, FaStar, FaEye, FaSuitcase } from "react-icons/fa";

// Context for authentication
const AuthContext = createContext();

// Mock data for internships
const mockInternships = [
  { id: 1, company: 'Reliance Industries', position: 'Operations Intern', status: 'Applied', appliedDate: '2025-08-01' },
  { id: 2, company: 'Indian Oil Corporation', position: 'Mechanical Engineering Intern', status: 'Pending', appliedDate: '2025-08-05' },
  { id: 3, company: 'HDFC Bank', position: 'Finance Intern', status: 'Applied', appliedDate: '2025-08-10' },
  { id: 4, company: 'Infosys', position: 'Software Development Intern', status: 'Called Back', appliedDate: '2025-08-12' },
  { id: 5, company: 'L&T', position: 'Civil Engineering Intern', status: 'Applied', appliedDate: '2025-08-15' },
  { id: 6, company: 'Maruti Suzuki', position: 'Automobile Design Intern', status: 'Pending', appliedDate: '2025-08-20' },
  { id: 7, company: 'NTPC Limited', position: 'Electrical Engineering Intern', status: 'Applied', appliedDate: '2025-08-22' },
  { id: 8, company: 'Tata Consumer Products', position: 'Marketing Intern', status: 'Rejected', appliedDate: '2025-08-25' },
  { id: 9, company: 'Vedanta Limited', position: 'Mining Intern', status: 'Called Back', appliedDate: '2025-08-28' },
  { id: 10, company: 'Jubilant FoodWorks', position: 'Supply Chain Intern', status: 'Applied', appliedDate: '2025-09-01' }
];

// Mock data for recommended internships
const mockRecommendedInternships = [
  {
    id: 201,
    company: 'Reliance Industries',
    position: 'Operations Intern',
    location: 'Mumbai, Maharashtra',
    matchPercentage: 98,
    skills: ['Operations Management', 'Supply Chain', 'Excel', 'Communication'],
    description: 'Assist in streamlining daily operations and improving supply chain processes across units.',
    salary: '₹10,000/month',
    duration: '6 months',
    type: 'Full-time',
    deadline: '2025-10-10'
  },
  {
    id: 202,
    company: 'Indian Oil Corporation',
    position: 'Mechanical Engineering Intern',
    location: 'Panipat, Haryana',
    matchPercentage: 95,
    skills: ['Mechanical Design', 'AutoCAD', 'Thermodynamics', 'Plant Operations'],
    description: 'Work with refinery teams on mechanical systems maintenance and design improvements.',
    salary: '₹12,000/month',
    duration: '3 months',
    type: 'Full-time',
    deadline: '2025-10-15'
  },
  {
    id: 203,
    company: 'Infosys',
    position: 'Software Development Intern',
    location: 'Bengaluru, Karnataka',
    matchPercentage: 93,
    skills: ['Java', 'Spring Boot', 'HTML/CSS', 'Agile Methodologies'],
    description: 'Collaborate on development projects using Java and web technologies in a real Agile environment.',
    salary: '₹15,000/month',
    duration: '4 months',
    type: 'Full-time',
    deadline: '2025-10-12'
  },
  {
    id: 204,
    company: 'HDFC Bank',
    position: 'Finance Intern',
    location: 'Mumbai, Maharashtra',
    matchPercentage: 85,
    skills: ['Financial Analysis', 'MS Excel', 'Accounting', 'Data Interpretation'],
    description: 'Assist in financial reporting, budget tracking, and performance analysis across banking sectors.',
    salary: '₹12,000/month',
    duration: '3 months',
    type: 'Full-time',
    deadline: '2025-10-20'
  },
  {
    id: 205,
    company: 'L&T Construction',
    position: 'Civil Engineering Intern',
    location: 'Chennai, Tamil Nadu',
    matchPercentage: 83,
    skills: ['AutoCAD', 'Structural Design', 'Site Supervision', 'Construction Management'],
    description: 'Work on infrastructure project execution and gain hands-on experience in large-scale civil works.',
    salary: '₹13,000/month',
    duration: '5 months',
    type: 'Full-time',
    deadline: '2025-10-18'
  }
];


// Login Component
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      login({ email: formData.email, username: formData.email.split('@')[0] });
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  return (
    <div className="login-split-bg">
      <div className="login-left">
        <h1>
          <span className="brand-main">Intern</span> <span className="brand-accent">Mitron</span>
        </h1>
        <p className="login-subtitle">
          AI-powered internship recommendations<br />
          tailored to your skills and experience
        </p>
        <ul className="login-features">
          <li><span className="feature-icon"><FaFileAlt /></span> Upload your resume</li>
          <li><span className="feature-icon"><FaChartLine /></span> Get AI-matched opportunities</li>
          <li><span className="feature-icon"><FaClipboardList /></span> Track your applications</li>
        </ul>
      </div>
      <div className="login-right">
        <form className="login-form-card" onSubmit={handleSubmit}>
          <h2>Welcome Back!</h2>
          <div className="form-group">
            <label htmlFor="email"><FaEnvelope className="input-icon" /> Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
              autoComplete="username"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password"><FaLock className="input-icon" /> Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? 'error' : ''}
              autoComplete="current-password"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <button type="submit" className="login-submit-btn">
            Sign In <span className="arrow">&rarr;</span>
          </button>
          <div className="login-bottom-text">
            Don't have an account? <a href="#" className="signup-link">Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

// Navigation Component
const Navigation = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h2>🎯 Intern Mitron</h2>
      </div>
      <div className="nav-links">
        <a href="#dashboard" className="nav-link active">Dashboard</a>
        <a href="#resume" className="nav-link">Resume Upload</a>
        <a href="#recommendations" className="nav-link">Recommendations</a>
        <a href="#tracker" className="nav-link">Tracker</a>
        <button onClick={logout} className="logout-button">Logout</button>
      </div>
      <div className="user-info">
        Welcome, {user?.username || user?.email}
      </div>
    </nav>
  );
};

// Dashboard Component
const Dashboard = () => {
  const appliedCount = mockInternships.length;
  const calledBackCount = mockInternships.filter(i => i.status === 'Called Back').length;
  const pendingCount = mockInternships.filter(i => i.status === 'Pending').length;
  const rejectedCount = mockInternships.filter(i => i.status === 'Rejected').length;

  const cards = [
    {
      title: 'Total Internships Applied',
      value: appliedCount,
      icon: <FaSuitcase style={{ color: "var(--accent-purple)" }} />,
      color: { color: "var(--accent-purple)" }
    },
    {
      title: 'Companies Called Back',
      value: calledBackCount,
      icon: '✅',
      color: '#27ae60'
    },
    {
      title: 'Pending Responses',
      value: pendingCount,
      icon: '🕓',
      color: '#f39c12'
    },
    {
      title: 'Rejections',
      value: rejectedCount,
      icon: '❌',
      color: '#e74c3c'
    }
  ];

  // Quick Actions
  const quickActions = [
    {
      icon: <FaUpload style={{ color: "var(--accent-purple)" }} />,
      label: "Upload Resume",
      href: "#resume"
    },
    {
      icon: <FaStar style={{ color: "var(--accent-purple)" }} />,
      label: "View Recommendations",
      href: "#recommendations"
    },
    {
      icon: <FaEye style={{ color: "var(--accent-purple)" }} />,
      label: "Track Applications",
      href: "#tracker"
    }
  ];

  // Recent Activity
  const recentActivities = [
    {
      dot: "green",
      title: "Interview scheduled",
      desc: "Tech Innovators Inc. – Today, 2:00 PM"
    },
    {
      dot: "blue",
      title: "New recommendation",
      desc: "5 new matches found – Yesterday"
    },
    {
      dot: "yellow",
      title: "Application viewed",
      desc: "DataMinds Analytics – 2 days ago"
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Track your internship application progress</p>
      </div>
      
      <div className="stats-grid">
        {cards.map((card, index) => (
          <div key={index} className="stat-card" style={{ borderLeftColor: card.color }}>
            <div className="stat-icon">{card.icon}</div>
            <div className="stat-content">
              <h3>{card.value}</h3>
              <p>{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {/* Quick Actions */}
        <div className="quick-actions" style={{ flex: 1, minWidth: 300 }}>
          <h2>Quick Actions</h2>
          {quickActions.map((action, idx) => (
            <a
              key={idx}
              href={action.href}
              className="quick-action-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1rem",
                textDecoration: "none"
              }}
            >
              {action.icon}
              <span>{action.label}</span>
              <span style={{ marginLeft: "auto", color: "var(--text-secondary)" }}>&rarr;</span>
            </a>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="recent-activity" style={{ flex: 1, minWidth: 300 }}>
          <h2>Recent Activity</h2>
          <ul className="recent-activity-list" style={{ listStyle: "none", padding: 0 }}>
            {recentActivities.map((activity, idx) => (
              <li key={idx} style={{ marginBottom: "1.2rem", display: "flex", alignItems: "flex-start", gap: "0.7rem" }}>
                <span
                  className="dot"
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    marginTop: "0.4rem",
                    display: "inline-block",
                    background:
                      activity.dot === "green"
                        ? "var(--accent-green)"
                        : activity.dot === "blue"
                        ? "var(--accent-blue)"
                        : "var(--accent-yellow)"
                  }}
                ></span>
                <span>
                  <span className="activity-title" style={{ fontWeight: 700, color: "#fff" }}>
                    {activity.title}
                  </span>
                  <br />
                  <span className="activity-desc" style={{ color: "var(--text-secondary)", fontSize: "0.97rem" }}>
                    {activity.desc}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="recent-applications">
        <h2>Recent Applications</h2>
        <div className="applications-list">
          {mockInternships.slice(0, 3).map(internship => (
            <div key={internship.id} className="application-item">
              <div className="company-info">
                <h4>{internship.company}</h4>
                <p>{internship.position}</p>
              </div>
              <div className="application-status">
                <span className={`status-badge ${internship.status.toLowerCase().replace(' ', '-')}`}>
                  {internship.status}
                </span>
                <small>{internship.appliedDate}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Resume Upload Component
const ResumeUpload = () => {
  const { uploadedResume, setUploadedResume } = useContext(AuthContext);
  const [dragActive, setDragActive] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileUpload = (file) => {
    setUploadedResume(file);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000); // Hide after 3 seconds
  };

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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="resume-upload">
      {/* Success Notification */}
      {showSuccess && (
        <div className="resume-success-toast">
          <span className="toast-icon">✔</span>
          <span>
            Resume uploaded successfully!<br />
            Check recommendations page.
          </span>
          <button className="toast-close" onClick={() => setShowSuccess(false)}>×</button>
        </div>
      )}

      <div className="upload-header">
        <h1>Resume Upload</h1>
        <p>Upload your resume to enhance your internship applications and get AI-powered recommendations</p>
      </div>

      <div 
        className={`upload-area ${dragActive ? 'drag-active' : ''} ${uploadedResume ? 'file-uploaded' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {uploadedResume ? (
          <div className="uploaded-file">
            <div className="file-icon">📄</div>
            <h3>{uploadedResume.name}</h3>
            <p>Size: {(uploadedResume.size / 1024 / 1024).toFixed(2)} MB</p>
            <button onClick={() => setUploadedResume(null)} className="remove-file">
              Remove File
            </button>
          </div>
        ) : (
          <>
            <div className="upload-icon">☁️</div>
            <h3>Drag and drop your resume here</h3>
            <p>Or click to browse files</p>
            <input
              type="file"
              id="resume-input"
              accept=".pdf,.doc,.docx"
              onChange={handleFileInput}
              style={{ display: 'none' }}
            />
            <label htmlFor="resume-input" className="browse-button">
              Browse Files
            </label>
            <small>Supported formats: PDF, DOC, DOCX (Max 5MB)</small>
          </>
        )}
      </div>

      {uploadedResume && (
        <div className="upload-actions">
          <button className="primary-button">Save Resume</button>
          <button onClick={() => setUploadedResume(null)} className="secondary-button">
            Upload Different File
          </button>
          <a href="#recommendations" className="recommendations-link">
            Get AI Recommendations →
          </a>
        </div>
      )}
    </div>
  );
};

// Recommendations Component
const Recommendations = () => {
  const { uploadedResume } = useContext(AuthContext);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const analyzeResumeAndGetRecommendations = () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      setRecommendations(mockRecommendedInternships);
      setIsAnalyzing(false);
      setHasAnalyzed(true);
    }, 2000);
  };

  const handleApply = (internshipId) => {
    alert(`Applied to internship with ID: ${internshipId}`);
  };

  if (!uploadedResume) {
    return (
      <div className="recommendations">
        <div className="recommendations-header">
          <h1>AI-Powered Recommendations</h1>
          <p>Get personalized internship recommendations based on your resume</p>
        </div>
        
        <div className="no-resume-container">
          <div className="no-resume-icon">📄</div>
          <h3>No Resume Found</h3>
          <p>Please upload your resume first to get personalized recommendations.</p>
          <a href="#resume" className="upload-resume-button">Upload Resume</a>
        </div>
      </div>
    );
  }

  return (
    <div className="recommendations">
      <div className="recommendations-header">
        <h1>AI-Powered Recommendations</h1>
        <p>Personalized internships matched to your skills and experience</p>
      </div>

      <div className="resume-status">
        <div className="resume-info">
          <div className="resume-icon">✅</div>
          <div>
            <h4>Resume Analyzed: {uploadedResume.name}</h4>
            <p>Size: {(uploadedResume.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        </div>
        
        {!hasAnalyzed && (
          <button 
            onClick={analyzeResumeAndGetRecommendations} 
            className="analyze-button"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? 'Analyzing...' : 'Get Recommendations'}
          </button>
        )}
      </div>

      {isAnalyzing && (
        <div className="analyzing-container">
          <div className="loader"></div>
          <h3>Analyzing Your Resume...</h3>
          <p>Our AI is matching your skills with the best internship opportunities</p>
        </div>
      )}

      {hasAnalyzed && recommendations.length > 0 && (
        <div className="recommendations-list">
          <div className="recommendations-stats">
            <h3>Found {recommendations.length} Perfect Matches</h3>
            <p>Recommendations sorted by match percentage</p>
          </div>
          
          <div className="internship-cards">
            {recommendations.map(internship => (
              <div key={internship.id} className="internship-card">
                <div className="card-header">
                  <div className="company-info">
                    <h3>{internship.company}</h3>
                    <h4>{internship.position}</h4>
                    <p className="location">📍 {internship.location}</p>
                  </div>
                  <div className="match-percentage">
                    <div className="match-circle">
                      <span>{internship.matchPercentage}%</span>
                    </div>
                    <small>Match</small>
                  </div>
                </div>
                
                <div className="card-content">
                  <p className="description">{internship.description}</p>
                  
                  <div className="internship-details">
                    <div className="detail-item">
                      <strong>💰 Salary:</strong> {internship.salary}
                    </div>
                    <div className="detail-item">
                      <strong>⏰ Duration:</strong> {internship.duration}
                    </div>
                    <div className="detail-item">
                      <strong>📅 Type:</strong> {internship.type}
                    </div>
                    <div className="detail-item">
                      <strong>⚠️ Deadline:</strong> {internship.deadline}
                    </div>
                  </div>
                  
                  <div className="skills-container">
                    <strong>Required Skills:</strong>
                    <div className="skills-tags">
                      {internship.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="card-actions">
                  <button 
                    onClick={() => handleApply(internship.id)} 
                    className="apply-button"
                  >
                    Apply Now
                  </button>
                  <button className="save-button">Save for Later</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
const Tracker = () => {
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('appliedDate');

  const filteredInternships = mockInternships
    .filter(internship => filterStatus === 'All' || internship.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === 'appliedDate') {
        return new Date(b.appliedDate) - new Date(a.appliedDate);
      }
      return a[sortBy].localeCompare(b[sortBy]);
    });

  const statusOptions = ['All', 'Applied', 'Called Back', 'Pending', 'Rejected'];

  return (
    <div className="tracker">
      <div className="tracker-header">
        <h1>Application Tracker</h1>
        <p>Monitor the status of all your internship applications</p>
      </div>

      <div className="tracker-controls">
        <div className="filter-group">
          <label>Filter by Status:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="appliedDate">Applied Date</option>
            <option value="company">Company</option>
            <option value="position">Position</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      <div className="tracker-table">
        <div className="table-header">
          <div className="table-cell">Company</div>
          <div className="table-cell">Position</div>
          <div className="table-cell">Applied Date</div>
          <div className="table-cell">Status</div>
          <div className="table-cell">Actions</div>
        </div>
        
        {filteredInternships.map(internship => (
          <div key={internship.id} className="table-row">
            <div className="table-cell">
              <strong>{internship.company}</strong>
            </div>
            <div className="table-cell">{internship.position}</div>
            <div className="table-cell">{internship.appliedDate}</div>
            <div className="table-cell">
              <span className={`status-badge ${internship.status.toLowerCase().replace(' ', '-')}`}>
                {internship.status}
              </span>
            </div>
            <div className="table-cell">
              <button className="action-button">View Details</button>
            </div>
          </div>
        ))}
      </div>

      {filteredInternships.length === 0 && (
        <div className="no-results">
          <p>No internships found for the selected filter.</p>
        </div>
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [uploadedResume, setUploadedResume] = useState(null);

  const login = (userData) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const logout = () => {
    setUser(null);
    setCurrentPage('login');
    setUploadedResume(null);
  };

  const renderCurrentPage = () => {
    if (!user) return <Login />;
    
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'resume':
        return <ResumeUpload />;
      case 'recommendations':
        return <Recommendations />;
      case 'tracker':
        return <Tracker />;
      default:
        return <Dashboard />;
    }
  };

  // Handle navigation clicks
  React.useEffect(() => {
    const handleNavClick = (e) => {
      if (e.target.getAttribute('href')) {
        e.preventDefault();
        const page = e.target.getAttribute('href').substring(1);
        setCurrentPage(page);
      }
    };

    document.addEventListener('click', handleNavClick);
    return () => document.removeEventListener('click', handleNavClick);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, uploadedResume, setUploadedResume }}>
      <div className="app">
        {user && <Navigation />}
        <main className="main-content">
          {renderCurrentPage()}
        </main>
      </div>
    </AuthContext.Provider>
  );
};

export default App;