import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const ConnectingScreen = ({ onComplete }) => {
    const [dots, setDots] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        document.body.style.overflow = 'hidden';
        return () => { 
            document.body.style.overflow = 'unset'; 
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (onComplete) onComplete();
        }, 3500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!mounted) return null;

    const screenContent = (
        <div 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 999999,
                background: 'radial-gradient(circle at center, #0a2f0a 0%, #051505 50%, #000000 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}
        >
            {/* Matrix Rain Background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.15,
                overflow: 'hidden',
                pointerEvents: 'none'
            }}>
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: `${(i / 30) * 100}%`,
                            top: '-100px',
                            fontSize: '14px',
                            color: '#22c55e',
                            fontFamily: 'monospace',
                            animation: `fall ${3 + Math.random() * 2}s linear infinite`,
                            animationDelay: `${Math.random() * 2}s`,
                            opacity: 0.6
                        }}
                    >
                        {[...Array(20)].map((_, j) => (
                            <div key={j}>
                                {Math.random() > 0.5 ? '1' : '0'}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                {/* Animated Circle */}
                <div style={{ position: 'relative', width: '240px', height: '240px', margin: '0 auto 48px' }}>
                    {/* Outer glow */}
                    <div 
                        style={{ 
                            position: 'absolute',
                            inset: '-20px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, transparent 70%)',
                            filter: 'blur(30px)',
                            animation: 'pulse 2s ease-in-out infinite'
                        }}
                    />
                    
                    {/* Rotating outer circle */}
                    <div 
                        style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50%',
                            border: '3px solid rgba(34, 197, 94, 0.6)',
                            boxShadow: '0 0 40px rgba(34, 197, 94, 0.4), inset 0 0 40px rgba(34, 197, 94, 0.1)',
                            animation: 'spin 4s linear infinite'
                        }}
                    />
                    
                    {/* Middle circle */}
                    <div 
                        style={{
                            position: 'absolute',
                            inset: '20px',
                            borderRadius: '50%',
                            border: '2px solid rgba(34, 197, 94, 0.4)',
                            animation: 'pulse 2s ease-in-out infinite'
                        }}
                    />
                    
                    {/* Inner glow */}
                    <div 
                        style={{
                            position: 'absolute',
                            inset: '40px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, transparent 70%)',
                            filter: 'blur(20px)'
                        }}
                    />
                    
                    {/* Lock Icon */}
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg 
                            style={{ 
                                width: '80px', 
                                height: '80px', 
                                color: '#22c55e',
                                filter: 'drop-shadow(0 0 15px rgba(34, 197, 94, 0.8))'
                            }} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={1.5} 
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                            />
                        </svg>
                    </div>
                    
                    {/* Scanning line */}
                    <div 
                        style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50%',
                            overflow: 'hidden'
                        }}
                    >
                        <div 
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                height: '2px',
                                background: 'linear-gradient(90deg, transparent, #22c55e, transparent)',
                                boxShadow: '0 0 10px #22c55e',
                                animation: 'scan 2s linear infinite'
                            }}
                        />
                    </div>
                </div>

                {/* Text */}
                <h1 
                    style={{ 
                        fontSize: '32px',
                        fontFamily: 'monospace',
                        color: '#22c55e',
                        textShadow: '0 0 20px rgba(34, 197, 94, 0.8)',
                        marginBottom: '12px',
                        letterSpacing: '2px'
                    }}
                >
                    Connecting to CodeAsh{dots}
                </h1>
                <p style={{ 
                    fontSize: '14px', 
                    fontFamily: 'monospace', 
                    color: '#6b7280',
                    letterSpacing: '1px'
                }}>
                    Initializing secure connection
                </p>

                {/* Loading dots */}
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '24px' }}>
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: '#22c55e',
                                animation: `bounce 1.4s ease-in-out ${i * 0.2}s infinite`
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Corner labels */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', fontFamily: 'monospace', fontSize: '11px', color: 'rgba(34, 197, 94, 0.3)' }}>
                [SYSTEM_INIT]
            </div>
            <div style={{ position: 'absolute', top: '24px', right: '24px', fontFamily: 'monospace', fontSize: '11px', color: 'rgba(34, 197, 94, 0.3)' }}>
                [AUTH_VERIFY]
            </div>
            <div style={{ position: 'absolute', bottom: '24px', left: '24px', fontFamily: 'monospace', fontSize: '11px', color: 'rgba(34, 197, 94, 0.3)' }}>
                [SECURE_CONN]
            </div>
            <div style={{ position: 'absolute', bottom: '24px', right: '24px', fontFamily: 'monospace', fontSize: '11px', color: 'rgba(34, 197, 94, 0.3)' }}>
                [READY]
            </div>
        </div>
    );

    return ReactDOM.createPortal(screenContent, document.body);
};

export default ConnectingScreen;
