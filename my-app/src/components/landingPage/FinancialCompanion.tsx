import React, { useEffect, useRef, useState } from 'react';

const FinancialCompanion = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    const phoneRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Confetti particles
    type ConfettiParticle = {
        id: number;
        left: number;
        delay: number;
        color: string;
        size: number;
        duration: number;
    };

    const generateConfetti = (): ConfettiParticle[] => {
        const particles: ConfettiParticle[] = [];
        for (let i = 0; i < 20; i++) {
            particles.push({
                id: i,
                left: Math.random() * 100,
                delay: Math.random() * 2,
                color: ['#22c55e', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0'][Math.floor(Math.random() * 5)],
                size: Math.random() * 6 + 4,
                duration: Math.random() * 3 + 2,
            });
        }
        return particles;
    };

    const confettiParticles = generateConfetti();

    return (
        <section ref={sectionRef} className="py-20 px-6 md:px-20 relative overflow-hidden">
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800" />
            
            {/* Background glow effects */}
            <div className="absolute top-20 left-20 w-64 h-64 bg-green-400/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-green-300/15 rounded-full blur-2xl animate-pulse delay-500" />

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">

                {/* Left Content */}
                <div className="flex-1">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                        In-Depth Market
                        <br />
                        <span 
                            className="text-green-400 drop-shadow-[0_0_20px_#22c55e]"
                            style={{ textShadow: '0 0 30px #22c55e, 0 0 40px #22c55e' }}
                        >
                            Research Platform
                        </span>
                    </h2>
                    <p className="text-gray-300 mb-10 max-w-lg text-lg leading-relaxed">
                        Access comprehensive market analysis and research tools designed for both beginners and professional traders. Make informed investment decisions with real-time data and expert insights.
                    </p>
                    
                    {/* Feature List */}
                    <div className="space-y-6 mb-10">
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-white text-sm font-bold">✓</span>
                            </div>
                            <div className='text-start'>
                                <h4 className="text-white font-semibold mb-2 ">Real-Time Market Data</h4>
                                <p className="text-gray-400 text-sm">Live stock prices, market indices, and financial news updates from global exchanges</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start text-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-white text-sm font-bold">✓</span>
                            </div>
                            <div className='text-start'>
                                <h4 className="text-white font-semibold mb-2">Technical Analysis Tools</h4>
                                <p className="text-gray-400 text-sm">Advanced charting tools, indicators, and pattern recognition for technical analysis</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-white text-sm font-bold">✓</span>
                            </div>
                            <div className='text-start'>
                                <h4 className="text-white font-semibold mb-2">Company Fundamentals</h4>
                                <p className="text-gray-400 text-sm">Financial statements, ratios, and key metrics for fundamental analysis</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-white text-sm font-bold">✓</span>
                            </div>
                            <div className='text-start'>
                                <h4 className="text-white font-semibold mb-2">Expert Research Reports</h4>
                                <p className="text-gray-400 text-sm">Professional analyst reports, sector analysis, and investment recommendations</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Glowing Button */}
                    <div className="relative inline-block">
                        <div className="absolute inset-0 rounded-full blur-xl bg-green-400 opacity-30 animate-pulse" />
                        <button 
                            className="relative backdrop-blur-md bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-4 px-10 rounded-full shadow-2xl border border-green-400/30 transition-all duration-300 hover:scale-105 hover:shadow-green-500/50"
                            style={{
                                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.8) 0%, rgba(16, 185, 129, 0.8) 100%)',
                                boxShadow: '0 10px 30px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                            }}
                        >
                            Explore Research Tools
                        </button>
                    </div>
                </div>

                {/* Right Content - Phone with Confetti */}
                <div className="flex-1 flex justify-center items-center relative">
                    <div className="relative">
                        {/* Phone Container */}
                        <div 
                            ref={phoneRef}
                            className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        >
                            {/* Phone Frame */}
                            <div 
                                className="relative w-80 h-96 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-[3rem] p-6 shadow-2xl border-4 border-gray-700"
                                style={{
                                    boxShadow: '0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
                                }}
                            >
                                {/* Phone Screen */}
                                <div className="w-full h-full bg-gradient-to-br from-slate-900 to-gray-900 rounded-[2rem] overflow-hidden relative">
                                    {/* Status Bar */}
                                    <div className="flex justify-between items-center px-6 py-3 text-white text-sm">
                                        <span>9:41</span>
                                        <div className="flex items-center gap-1">
                                            <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                                            <span>100%</span>
                                        </div>
                                    </div>
                                    
                                    {/* App Content */}
                                    <div className="px-4 py-2">
                                        <div className="text-center mb-4">
                                            <h3 className="text-white font-bold text-lg mb-1">Market Research</h3>
                                            <p className="text-green-400 text-sm">Live Analytics Dashboard</p>
                                        </div>
                                        
                                        {/* Chart Area */}
                                        <div className="bg-gray-800/50 rounded-2xl p-4 mb-4 backdrop-blur-sm">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-white text-sm font-semibold">NIFTY 50</span>
                                                <span className="text-green-400 text-sm">+2.3%</span>
                                            </div>
                                            <div className="h-20 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-t from-green-500/30 to-transparent"></div>
                                                <svg className="w-full h-full" viewBox="0 0 200 80">
                                                    <polyline
                                                        fill="none"
                                                        stroke="#22c55e"
                                                        strokeWidth="2"
                                                        points="0,60 40,45 80,30 120,25 160,15 200,10"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        
                                        {/* Stats */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-gray-800/30 rounded-xl p-3 backdrop-blur-sm">
                                                <div className="text-gray-400 text-xs mb-1">Volume</div>
                                                <div className="text-white text-sm font-semibold">2.4M</div>
                                            </div>
                                            <div className="bg-gray-800/30 rounded-xl p-3 backdrop-blur-sm">
                                                <div className="text-gray-400 text-xs mb-1">P/E Ratio</div>
                                                <div className="text-white text-sm font-semibold">22.5</div>
                                            </div>
                                            <div className="bg-gray-800/30 rounded-xl p-3 backdrop-blur-sm">
                                                <div className="text-gray-400 text-xs mb-1">RSI</div>
                                                <div className="text-green-400 text-sm font-semibold">68.2</div>
                                            </div>
                                            <div className="bg-gray-800/30 rounded-xl p-3 backdrop-blur-sm">
                                                <div className="text-gray-400 text-xs mb-1">Beta</div>
                                                <div className="text-white text-sm font-semibold">1.15</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Phone Notch */}
                                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-black rounded-full"></div>
                            </div>
                        </div>
                        
                        {/* Confetti Animation */}
                        {isVisible && confettiParticles.map((particle) => (
                            <div
                                key={particle.id}
                                className="absolute animate-bounce"
                                style={{
                                    left: `${particle.left}%`,
                                    top: '-20px',
                                    animationDelay: `${particle.delay}s`,
                                    animationDuration: `${particle.duration}s`,
                                    animationIterationCount: 'infinite',
                                }}
                            >
                                <div
                                    className="rounded-full shadow-lg"
                                    style={{
                                        width: `${particle.size}px`,
                                        height: `${particle.size}px`,
                                        backgroundColor: particle.color,
                                        boxShadow: `0 0 10px ${particle.color}`,
                                    }}
                                />
                            </div>
                        ))}
                        
                        {/* Additional floating elements */}
                        {isVisible && (
                            <>
                                <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400 rounded-full opacity-80 animate-pulse"></div>
                                <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-emerald-400 rounded-full opacity-60 animate-pulse delay-1000"></div>
                                <div className="absolute top-1/2 -right-8 w-4 h-4 bg-green-300 rounded-full opacity-70 animate-pulse delay-500"></div>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FinancialCompanion;