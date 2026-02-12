import React from 'react';

const AnimatedWave: React.FC = () => {
  return (
    <div className="w-full overflow-hidden -mt-20 relative z-10">
      <svg
        className="w-full h-auto display-block"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>{`
            @keyframes wave {
              0% { d: path('M0,40 Q300,20 600,40 T1200,40 L1200,100 L0,100 Z'); }
              25% { d: path('M0,30 Q300,10 600,30 T1200,30 L1200,100 L0,100 Z'); }
              50% { d: path('M0,40 Q300,20 600,40 T1200,40 L1200,100 L0,100 Z'); }
              75% { d: path('M0,50 Q300,30 600,50 T1200,50 L1200,100 L0,100 Z'); }
              100% { d: path('M0,40 Q300,20 600,40 T1200,40 L1200,100 L0,100 Z'); }
            }
            
            .wave {
              fill: #f8fafc;
              animation: wave 5s ease-in-out infinite;
            }
          `}</style>
        </defs>
        <path
          className="wave"
          d="M0,40 Q300,20 600,40 T1200,40 L1200,100 L0,100 Z"
        />
      </svg>
    </div>
  );
};

export default AnimatedWave;
