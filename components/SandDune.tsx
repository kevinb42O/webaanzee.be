import React from 'react';
import './SandDune.css';

const SandDune: React.FC = () => {
  return (
    <div className="wave-separator">
      <svg
        className="animated-wave h-[80px] sm:h-[120px] md:h-[150px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,64 C200,16 400,112 600,64 C800,16 1000,112 1200,64 L1200,120 L0,120 Z"
          className="shape-fill"
        ></path>
      </svg>
    </div>
  );
};

export default SandDune;
