import React, { useState } from 'react';
import { ChevronRight, DollarSign, Lightbulb, TrendingUp, Handshake, CheckCircle, Menu, X } from 'lucide-react';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMobileMenuOpen(false); // Close menu after selection
    }
  };

  return (
    <>
      <style>
        {`
        /* Custom Fonts & Global Styles */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

        body {
          font-family: 'Inter', sans-serif;
          background-color: #fff;
          color: #111827;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        /* Utility Classes & Animations */
        .container {
          padding: 0 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .flex-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .flex-col {
          flex-direction: column;
        }

        .text-center { text-align: center; }
        .space-x-4 > * + * { margin-left: 1rem; }
        .space-y-4 > * + * { margin-top: 1rem; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .hidden-mobile { display: none; }
        .relative { position: relative; }

        .text-gradient {
          background: linear-gradient(to right, #3b82f6, #06b6d4);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }

        .transition { transition: all 0.3s ease-in-out; }
        .hover-scale:hover { transform: scale(1.05); }
        .hover-bg-gray:hover { background-color: #f3f4f6; }
        .hover-bg-blue:hover { background-color: #2563eb; }
        .hover-text-blue:hover { color: #2563eb; }
        .hover-shadow:hover { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
        .hover-rotate:hover { transform: rotate(12deg); }

        .section-padding { padding: 5rem 0; }
        
        /* Animation Keyframes */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }

        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
        .animate-pulseGlow { animation: pulseGlow 2s infinite; }

        /* Component-specific Styles */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          backdrop-filter: blur(16px);
          background-color: rgba(255, 255, 255, 0.8);
          padding: 1rem 2rem;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .navbar-logo-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .navbar-links {
          display: none;
        }

        .navbar-buttons {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .mobile-menu-button {
          display: block;
          background: none;
          border: none;
          cursor: pointer;
          color: #111827;
        }
        
        @media (min-width: 768px) {
          .navbar-links { 
            display: flex; 
            flex-grow: 1;
            justify-content: space-around;
            align-items: center;
          }
          .hero-title { font-size: 4rem; }
          .mobile-menu-button { display: none; }
        }
        @media (min-width: 1024px) {
          .hero-title { font-size: 5rem; }
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          z-index: 40;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 5rem;
        }

        .mobile-menu-link {
          padding: 1rem;
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
          text-decoration: none;
        }

        .button {
          padding: 0.625rem 1.25rem;
          font-weight: 600;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
        }

        .button-primary {
          color: #fff;
          background-color: #2563eb;
        }

        .button-secondary {
          color: #111827;
          background-color: #f3f4f6;
          border: 1px solid #e5e7eb;
        }

        /* Nav specific button styles to override default */
        .nav-button {
          background-color: transparent;
          color: #4b5563;
          font-weight: 500;
          padding: 0.5rem 1.2rem;
          border-radius: 9999px;
          transition: all 0.3s ease-in-out;
        }

        .nav-button:hover {
          color: #2563eb;
          background-color: #f3f4f6;
          transform: translateY(-2px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .hero-section {
          padding: 5rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.05em;
        }

        .feature-card {
          background-color: #fff;
          padding: 2rem;
          border-radius: 1.5rem;
          border: 1px solid #e5e7eb;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1rem;
          transition: all 0.3s ease-in-out;
        }
        .feature-card:hover { transform: translateY(-5px) scale(1.02); box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08); }

        .feature-icon-container {
          width: 3rem;
          height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          background-color: rgba(59, 130, 246, 0.2);
          color: #3b82f6;
        }

        .grid-3-cols {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 640px) { .grid-3-cols { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .grid-3-cols { grid-template-columns: repeat(3, 1fr); } }

        .how-it-works-step {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem;
          background-color: #f9fafb;
          border-radius: 1rem;
          border: 1px solid #e5e7eb;
        }

        .step-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: #d1d5db;
        }

        .testimonial-card {
          background-color: #f9fafb;
          padding: 2rem;
          border-radius: 1rem;
          border: 1px solid #e5e7eb;
          font-style: italic;
          color: #4b5563;
          margin-top: 1.5rem;
        }

        .cta-section {
          background-color: #f9fafb;
          border-top: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
          padding: 5rem 0;
          text-align: center;
        }

        .cta-buttons {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          justify-content: center;
        }
        @media (min-width: 640px) {
          .cta-buttons {
            flex-direction: row;
          }
        }
        `}
      </style>
      <div className="min-h-screen">
        {/* Navbar */}
        <nav className="navbar">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div className="navbar-logo-container">
              <Handshake className="text-blue-500 w-8 h-8 transition hover-rotate" />
              <span className="font-bold text-xl tracking-tight text-gray-950">CapitalConnect</span>
            </div>
            <div className="navbar-links hidden-mobile">
              <button onClick={() => scrollToSection('home')} className="nav-button transition">Home</button>
              <button onClick={() => scrollToSection('founders')} className="nav-button transition">For Founders</button>
              <button onClick={() => scrollToSection('investors')} className="nav-button transition">For Investors</button>
              <button onClick={() => scrollToSection('contact')} className="nav-button transition">Contact</button>
            </div>
            <div className="navbar-buttons">
              <button className="button button-secondary hidden-mobile">Sign In</button>
              <button className="button button-primary transition hover-scale hover-bg-blue animate-pulseGlow">Get Started</button>
              <button className="mobile-menu-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu animate-fadeIn">
            <button onClick={() => scrollToSection('home')} className="mobile-menu-link">Home</button>
            <button onClick={() => scrollToSection('founders')} className="mobile-menu-link">For Founders</button>
            <button onClick={() => scrollToSection('investors')} className="mobile-menu-link">For Investors</button>
            <button onClick={() => scrollToSection('contact')} className="mobile-menu-link">Contact</button>
          </div>
        )}

        <main className="pt-24">
          {/* Hero Section */}
          <section id="home" className="container hero-section animate-fadeInUp">
            <div className="max-w-4xl mx-auto space-y-4">
              <h1 className="hero-title text-gradient">
                Where Vision Meets Capital.
              </h1>
              <p className="text-lg text-gray-600">
                CapitalConnect is the platform connecting innovative startup founders with savvy investors. We streamline the process of fundraising and deal-making, empowering the next generation of industry leaders.
              </p>
              <div className="flex-container flex-col sm:flex-row space-y-4 space-x-0 sm:space-x-4 sm:space-y-0 pt-4">
                <button className="button button-primary flex-container hover-scale hover-shadow">
                  For Founders
                  <ChevronRight className="ml-2 w-5 h-5" />
                </button>
                <button className="button button-secondary flex-container hover-scale">
                  For Investors
                  <ChevronRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="section-padding bg-gray-50 border-y border-gray-200">
            <div className="container">
              <div className="text-center mb-16 animate-fadeInUp">
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  How It Works
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Our simple and efficient process helps you find the perfect match.
                </p>
              </div>
              <div className="grid-3-cols mx-auto" style={{ maxWidth: '1000px' }}>
                <div className="how-it-works-step animate-fadeInUp delay-200">
                  <div className="step-number">1</div>
                  <div>
                    <h3 className="text-xl font-semibold">Create Your Profile</h3>
                    <p className="text-gray-600">Tell us about your startup or your investment focus. It's quick and easy.</p>
                  </div>
                </div>
                <div className="how-it-works-step animate-fadeInUp delay-300">
                  <div className="step-number">2</div>
                  <div>
                    <h3 className="text-xl font-semibold">Get Matched</h3>
                    <p className="text-gray-600">Our intelligent algorithm connects you with relevant founders or investors.</p>
                  </div>
                </div>
                <div className="how-it-works-step animate-fadeInUp delay-400">
                  <div className="step-number">3</div>
                  <div>
                    <h3 className="text-xl font-semibold">Connect & Collaborate</h3>
                    <p className="text-gray-600">Start conversations, share documents, and build a relationship.</p>
                  </div>
                </div>
                <div className="how-it-works-step animate-fadeInUp delay-500">
                  <div className="step-number">4</div>
                  <div>
                    <h3 className="text-xl font-semibold">Seal the Deal</h3>
                    <p className="text-gray-600">Move forward with confidence and close your funding round or investment.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Founders Section */}
          <section id="founders" className="section-padding">
            <div className="container">
              <div className="text-center mb-16 animate-fadeInUp">
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Accelerate Your Growth.
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Discover the resources, capital, and network you need to take your startup from concept to unicorn.
                </p>
              </div>
              <div className="grid-3-cols mx-auto" style={{ maxWidth: '1000px' }}>
                <div className="feature-card animate-fadeInUp delay-200">
                  <div className="feature-icon-container"><Lightbulb size={24} /></div>
                  <h3 className="text-xl font-semibold">Pitch to the Right Investors</h3>
                  <p className="text-gray-600">Our algorithm matches your pitch deck with investors actively seeking opportunities in your sector and stage.</p>
                </div>
                <div className="feature-card animate-fadeInUp delay-300">
                  <div className="feature-icon-container"><Handshake size={24} /></div>
                  <h3 className="text-xl font-semibold">Secure Your Funding</h3>
                  <p className="text-gray-600">From seed to Series C, find the right capital partners and close your round with confidence.</p>
                </div>
                <div className="feature-card animate-fadeInUp delay-400">
                  <div className="feature-icon-container"><TrendingUp size={24} /></div>
                  <h3 className="text-xl font-semibold">Scale with Experts</h3>
                  <p className="text-gray-600">Gain access to a network of mentors and advisors who have successfully built and scaled companies.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Investors Section */}
          <section id="investors" className="section-padding">
            <div className="container">
              <div className="text-center mb-16 animate-fadeInUp">
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Discover the Future of Innovation.
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Access a curated pipeline of vetted startups, with data-driven insights to inform your investment decisions.
                </p>
              </div>
              <div className="grid-3-cols mx-auto" style={{ maxWidth: '1000px' }}>
                <div className="feature-card animate-fadeInUp delay-200">
                  <div className="feature-icon-container"><DollarSign size={24} /></div>
                  <h3 className="text-xl font-semibold">Curated Deal Flow</h3>
                  <p className="text-gray-600">Our platform presents you with high-potential startups that align with your investment thesis and risk appetite.</p>
                </div>
                <div className="feature-card animate-fadeInUp delay-300">
                  <div className="feature-icon-container"><Lightbulb size={24} /></div>
                  <h3 className="text-xl font-semibold">Data-Rich Due Diligence</h3>
                  <p className="text-gray-600">Access comprehensive company profiles, financial metrics, and market data to conduct thorough due diligence.</p>
                </div>
                <div className="feature-card animate-fadeInUp delay-400">
                  <div className="feature-icon-container"><Handshake size={24} /></div>
                  <h3 className="text-xl font-semibold">Seamless Communication</h3>
                  <p className="text-gray-600">Connect directly with founders and their teams through our secure and integrated messaging platform.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="cta-section">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold mb-4">
                  Ready to Grow Your Capital?
                </h2>
                <p className="text-lg text-gray-600">
                  Join CapitalConnect today and become a part of the future of innovation.
                </p>
                <div className="cta-buttons">
                  <button className="button button-primary flex-container hover-scale hover-shadow">
                    Join as a Founder
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </button>
                  <button className="button button-secondary flex-container hover-scale">
                    Join as an Investor
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer id="contact" className="py-12 bg-white border-t border-gray-200">
          <div className="container text-center text-gray-500">
            <p className="text-sm">
              &copy; 2024 CapitalConnect Inc. All rights reserved.
            </p>
            <div className="mt-4 flex flex-col sm-flex-row justify-center space-y-2 sm-space-y-0 sm-space-x-6 text-sm">
              <a href="#" className="hover-text-blue transition">Privacy Policy</a>
              <a href="#" className="hover-text-blue transition">Terms of Service</a>
              <a href="#" className="hover-text-blue transition">Contact Us</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;
