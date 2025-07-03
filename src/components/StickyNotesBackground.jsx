import React from 'react';

// Animation styles moved to a constant for better organization
const ANIMATION_STYLES = `
  @keyframes sway {
    0%, 100% { transform: rotate(var(--start-rotate)) translateX(0); }
    50% { transform: rotate(var(--end-rotate)) translateX(var(--translate-x)); }
  }

  .sway-element {
    animation: sway var(--duration) ease-in-out infinite;
  }
`;

const SeaLeaves = ({ position }) => {
  const isLeft = position === 'left';
  const baseClasses = `absolute ${
    isLeft ? 'left-0' : 'right-0'
  } top-0 h-full w-1/4 md:w-1/6 lg:w-1/5 opacity-70`;

  const leafConfigs = [
    {
      top: '1/5',
      height: '2/3',
      color: 'bg-cyan-400',
      blur: 'blur-sm',
      vars: {
        '--duration': '6s',
        '--start-rotate': isLeft ? '-2deg' : '2deg',
        '--end-rotate': isLeft ? '2deg' : '-2deg',
        '--translate-x': isLeft ? '5px' : '-5px',
      },
    },
    {
      top: isLeft ? '1/3' : '1/2',
      height: isLeft ? '1/2' : '1/2',
      color: 'bg-cyan-300',
      blur: 'blur-sm',
      vars: {
        '--duration': '7s',
        '--start-rotate': isLeft ? '2deg' : '-2deg',
        '--end-rotate': isLeft ? '-2deg' : '2deg',
        '--translate-x': isLeft ? '-5px' : '5px',
      },
    },
    {
      top: isLeft ? '2/3' : '1/5',
      height: isLeft ? '1/3' : '2/3',
      color: 'bg-cyan-500',
      blur: 'blur-md',
      vars: {
        '--duration': '8s',
        '--start-rotate': isLeft ? '1deg' : '-1deg',
        '--end-rotate': isLeft ? '-1deg' : '1deg',
        '--translate-x': isLeft ? '3px' : '-3px',
      },
    },
  ];

  return (
    <div className={baseClasses}>
      {leafConfigs.map((config, index) => (
        <div
          key={index}
          className={`absolute ${isLeft ? 'left-0' : 'right-0'} top-${
            config.top
          } h-${config.height} w-full ${config.color} ${
            isLeft ? 'rounded-r-full' : 'rounded-l-full'
          } ${config.blur} sway-element`}
          style={config.vars}
        />
      ))}
    </div>
  );
};

const StickyNotesBackground = ({ children }) => {
  return (
    <div className='relative min-h-screen w-full overflow-hidden bg-cyan-200'>
      <style>{ANIMATION_STYLES}</style>

      <SeaLeaves position='left' />
      <SeaLeaves position='right' />

      <div className='relative z-10 min-h-screen'>{children}</div>
    </div>
  );
};

export default StickyNotesBackground;
