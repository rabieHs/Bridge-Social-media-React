import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import TrendingSidebar from './components/TrendingSidebar';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="app-body">
        <LeftSidebar />
        <div className="main-content">
          <Feed />
          <div className="side-panels">
            <RightSidebar />
            <TrendingSidebar />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
