import React from 'react';

const AnimatedWave: React.FC = () => {
  return (
    <div className="w-full overflow-hidden -mt-20 relative z-10">
      <svg
        className="block w-full h-auto"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0,40 Q300,20 600,40 T1200,40 L1200,100 L0,100 Z"
          fill="#f8fafc"
        />
      </svg>
    </div>
  );
};

export default AnimatedWave;
