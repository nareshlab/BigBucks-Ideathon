import React, { useEffect, useState, useRef } from 'react';
import { Star, Calendar, Award, Clock, Users, Lightbulb, ExternalLink, Sparkles, Zap, DollarSign } from 'lucide-react';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [feeCounter, setFeeCounter] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const calculateTimeLeft = () => {
      const eventDate = new Date('March 29, 2025 09:00:00').getTime();
      const now = new Date().getTime();
      const difference = eventDate - now;
      
      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    // Fee counter animation
    let fee = 0;
    const feeInterval = setInterval(() => {
      if (fee < 179) {
        fee += Math.ceil(Math.random() * 10);
        if (fee > 179) fee = 179;
        setFeeCounter(fee);
      } else {
        clearInterval(feeInterval);
      }
    }, 100);
    
    // 3D effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });
    
    return () => {
      clearInterval(timer);
      clearInterval(feeInterval);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const handleRegister = () => {
    window.open('https://forms.gle/F1cyMRVnXiteAFct5', '_blank');
  };
  
  // Calculate 3D transform based on mouse position
  const calculate3DTransform = (element: HTMLElement) => {
    if (!containerRef.current) return {};
    
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = mousePosition.x;
    const mouseY = mousePosition.y;
    
    const tiltX = (mouseY - centerY) / 20;
    const tiltY = (centerX - mouseX) / 20;
    
    return {
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease'
    };
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-cyan-500 opacity-20"
            style={{
              width: `${Math.random() * 15 + 5}px`,
              height: `${Math.random() * 15 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Animated light beams */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-10"
            style={{
              height: '2px',
              width: '100%',
              top: `${Math.random() * 100}%`,
              left: 0,
              transform: `rotate(${Math.random() * 180}deg)`,
              transformOrigin: 'center',
              animation: `float ${Math.random() * 20 + 20}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`
            }}
          />
        ))}
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className={`text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-cyan-300 text-2xl md:text-4xl font-bold mb-2 animate-glow">BIG BUCKS INNOVATION</h2>
          <div className="relative inline-block">
            <h1 className="text-yellow-400 text-5xl md:text-8xl font-extrabold mb-2 tracking-wider relative z-10 animate-shine">
              IDEATHON
              <span className="absolute -top-4 -right-4 animate-pulse">
                <Sparkles className="text-yellow-400" size={28} />
              </span>
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-yellow-500/20 to-yellow-400/20 blur-xl -z-10"></div>
          </div>
          <h3 className="text-cyan-300 text-xl md:text-3xl font-bold mb-8 animate-glow">PROJECT COMPETITION 2025</h3>
        </div>
        
        {/* Countdown Timer */}
        <div className={`max-w-4xl mx-auto my-8 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-center text-xl font-bold mb-4 text-gradient">Time Remaining Until Event</h3>
          <div className="flex flex-wrap justify-center gap-4 countdown-container">
            <div className="bg-gray-800/80 backdrop-blur-md rounded-lg p-3 md:p-6 w-20 md:w-32 text-center countdown-item card-3d transform transition-all duration-300 hover:scale-105 border border-cyan-500/30">
              <div className="text-2xl md:text-4xl font-bold text-yellow-400 card-3d-content card-3d-depth">{countdown.days}</div>
              <div className="text-xs md:text-sm text-cyan-300">Days</div>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-md rounded-lg p-3 md:p-6 w-20 md:w-32 text-center countdown-item card-3d transform transition-all duration-300 hover:scale-105 border border-cyan-500/30">
              <div className="text-2xl md:text-4xl font-bold text-yellow-400 card-3d-content card-3d-depth">{countdown.hours}</div>
              <div className="text-xs md:text-sm text-cyan-300">Hours</div>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-md rounded-lg p-3 md:p-6 w-20 md:w-32 text-center countdown-item card-3d transform transition-all duration-300 hover:scale-105 border border-cyan-500/30">
              <div className="text-2xl md:text-4xl font-bold text-yellow-400 card-3d-content card-3d-depth">{countdown.minutes}</div>
              <div className="text-xs md:text-sm text-cyan-300">Minutes</div>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-md rounded-lg p-3 md:p-6 w-20 md:w-32 text-center countdown-item card-3d transform transition-all duration-300 hover:scale-105 border border-cyan-500/30">
              <div className="text-2xl md:text-4xl font-bold text-yellow-400 card-3d-content card-3d-depth">{countdown.seconds}</div>
              <div className="text-xs md:text-sm text-cyan-300">Seconds</div>
            </div>
          </div>
        </div>
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-12">
          {/* Left column */}
          <div className={`space-y-6 transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border-2 border-yellow-400/70 card-3d animate-on-scroll hover:shadow-[0_0_15px_rgba(234,179,8,0.3)]">
              <div className="flex items-center mb-4 card-3d-content">
                <Lightbulb className="text-yellow-400 mr-3 animate-pulse" size={28} />
                <h3 className="text-xl font-bold text-yellow-400 card-3d-depth">Theme:</h3>
              </div>
              <p className="text-cyan-300 text-xl ml-10 card-3d-depth">OPEN INNOVATION</p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border-2 border-yellow-400/70 card-3d animate-on-scroll hover:shadow-[0_0_15px_rgba(234,179,8,0.3)]">
              <div className="flex items-center mb-4 card-3d-content">
                <Calendar className="text-yellow-400 mr-3 animate-pulse" size={28} />
                <h3 className="text-xl font-bold text-yellow-400 card-3d-depth">Event Date & Time:</h3>
              </div>
              <p className="text-cyan-300 text-xl ml-10 card-3d-depth">29 MARCH, 2025 & 9 AM - 3 PM</p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border-2 border-yellow-400/70 card-3d animate-on-scroll hover:shadow-[0_0_15px_rgba(234,179,8,0.3)]">
              <div className="flex items-center mb-4 card-3d-content">
                <Clock className="text-yellow-400 mr-3 animate-pulse" size={28} />
                <h3 className="text-xl font-bold text-yellow-400 card-3d-depth">Registration Deadline:</h3>
              </div>
              <p className="text-cyan-300 text-xl ml-10 card-3d-depth">22 March, 2025</p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border-2 border-yellow-400/70 card-3d animate-on-scroll hover:shadow-[0_0_15px_rgba(234,179,8,0.3)]">
              <div className="flex items-center mb-4 card-3d-content">
                <Users className="text-yellow-400 mr-3 animate-pulse" size={28} />
                <h3 className="text-xl font-bold text-yellow-400 card-3d-depth">Benefits:</h3>
              </div>
              <ul className="text-cyan-300 text-lg ml-10 space-y-2 card-3d-depth">
                <li className="flex items-center">
                  <Zap className="text-yellow-400 mr-2 h-4 w-4" />
                  Internships & Funding Assistance
                </li>
                <li className="flex items-center">
                  <Zap className="text-yellow-400 mr-2 h-4 w-4" />
                  Internship Opportunity
                </li>
                <li className="flex items-center">
                  <Zap className="text-yellow-400 mr-2 h-4 w-4" />
                  Participation Certificate
                </li>
                <li className="flex items-center">
                  <Zap className="text-yellow-400 mr-2 h-4 w-4" />
                  Project Guidance
                </li>
                <li className="flex items-center">
                  <Zap className="text-yellow-400 mr-2 h-4 w-4" />
                  Patent Guidance
                </li>
              </ul>
            </div>
          </div>
          
          {/* Right column */}
          <div className={`space-y-6 transition-all duration-1000 delay-700 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border-2 border-yellow-400/70 flex flex-col items-center card-3d animate-on-scroll hover:shadow-[0_0_15px_rgba(234,179,8,0.3)]">
              <div className="relative card-3d-content">
                <div className="absolute -top-5 -right-5 animate-pulse">
                  <Star className="text-yellow-400" size={28} fill="currentColor" />
                </div>
                <Award className="text-yellow-400 mb-3 animate-bounce" size={48} />
                <div className="text-center card-3d-depth">
                  <h3 className="text-xl font-bold text-yellow-400">PRIZE</h3>
                  <p className="text-4xl font-bold text-yellow-400 animate-shine">₹10000</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border-2 border-yellow-400/70 flex flex-col items-center card-3d animate-on-scroll hover:shadow-[0_0_15px_rgba(234,179,8,0.3)]">
              <h3 className="text-xl font-bold text-white mb-4 card-3d-depth">Registration fee</h3>
              <div className="relative w-full max-w-xs">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 blur-md opacity-30 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-lg p-6 shadow-lg overflow-hidden">
                  {/* Floating currency symbols */}
                  {[...Array(8)].map((_, i) => (
                    <div 
                      key={i}
                      className="absolute text-yellow-800"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: 0.5 + Math.random() * 0.5,
                        transform: `scale(${0.5 + Math.random() * 1})`,
                        animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 5}s`
                      }}
                    >
                      <DollarSign size={16} />
                    </div>
                  ))}
                  
                  {/* Stacked bills effect */}
                  <div className="relative flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute bg-gradient-to-b from-green-500 to-green-700 border border-green-800 rounded-sm w-16 h-10"
                        style={{
                          transform: `translateY(${i * -2}px) rotate(${(i - 2) * 5}deg)`,
                          zIndex: 5 - i,
                          opacity: 0.9 - i * 0.1
                        }}
                      >
                        <div className="absolute inset-1 border border-green-300 opacity-30 rounded-sm"></div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Digital counter */}
                  <div className="relative mt-8 bg-black rounded-md p-2 border-2 border-yellow-300 shadow-inner flex justify-center">
                    <div className="font-mono text-3xl font-bold text-center text-yellow-400 card-3d-depth digital-counter">
                      ₹{feeCounter}
                    </div>
                  </div>
                  
                  {/* Coins */}
                  <div className="flex justify-center mt-2 space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 border border-yellow-600 shadow-lg"
                        style={{
                          animation: `bounce ${1 + i * 0.2}s ease-in-out infinite alternate`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      >
                        <div className="w-full h-full rounded-full border border-yellow-200 opacity-30"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border-2 border-yellow-400/70 card-3d animate-on-scroll hover:shadow-[0_0_15px_rgba(234,179,8,0.3)]">
              <h3 className="text-xl font-bold text-white mb-4 text-center card-3d-depth">Scan QR Code to Register</h3>
              <div className="flex justify-center card-3d-content">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-yellow-400 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://forms.gle/F1cyMRVnXiteAFct5" 
                    alt="Registration QR Code" 
                    className="w-40 h-40 bg-white p-2 rounded-lg relative card-3d-depth"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className={`mt-12 text-center transition-all duration-1000 delay-900 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-2xl font-bold text-yellow-400 mb-4 text-gradient">More Info & Registration:</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            <p className="text-cyan-300 bg-gray-800/30 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-gray-800/50 transition-all">+91 8667858430</p>
            <p className="text-cyan-300 bg-gray-800/30 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-gray-800/50 transition-all">+91 6379954079</p>
          </div>
          
          <div className="mt-8">
            <button 
              onClick={handleRegister}
              className="relative group bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-3 px-8 rounded-full text-xl transition-all transform hover:scale-105 flex items-center mx-auto overflow-hidden"
            >
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
              <span className="relative z-10 flex items-center">
                REGISTER NOW <ExternalLink className="ml-2" size={20} />
              </span>
            </button>
          </div>
          
          <div className="mt-8 flex justify-center">
            <div className="flex items-center bg-gray-800/30 p-3 rounded-xl backdrop-blur-sm hover:bg-gray-800/50 transition-all card-3d">
              <div className="w-20 h-20 mr-3 card-3d-content">
                <img 
                  src="https://bigbucksinnovation.com/wp-content/uploads/2024/06/cold-smooth-tasty.png" 
                  alt="Big Bucks Logo" 
                  className="w-full h-full object-contain card-3d-depth"
                />
              </div>
              <div className="text-left card-3d-content">
                <p className="font-bold text-white card-3d-depth">BIG BUCKS</p>
                <p className="text-sm text-cyan-300 card-3d-depth">INNOVATION Pvt. Ltd.</p>
                <p className="text-xs text-gray-400 card-3d-depth">WASTE TO WEALTH</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;