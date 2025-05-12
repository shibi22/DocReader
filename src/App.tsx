import React from 'react';
import Navbar from './components/Navbar';
import DocumentProcessor from './components/DocumentProcessor';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <DocumentProcessor />
      </main>
      <Footer />
    </div>
  );
}

export default App;