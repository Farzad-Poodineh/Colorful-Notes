import React from 'react';

const ANIMATION_STYLES = `
  @keyframes sway {
    0%, 100% { transform: rotate(var(--start-rotate, -2deg)) translateX(0); }
    50% { transform: rotate(var(--end-rotate, 2deg)) translateX(var(--translate-x, 5px)); }
  }

  .sway-element {
    animation: sway var(--duration, 6s) ease-in-out infinite;
  }
`;

const SeaLeaves = ({ position }) => {
  const isLeft = position === 'left';
  const baseClasses = `absolute ${
    isLeft ? 'left-0' : 'right-0'
  } top-0 h-full w-1/4 md:w-1/6 lg:w-1/5 opacity-70`;

  const leafConfigs = [
    {
      top: isLeft ? 'top-[20%]' : 'top-[20%]',
      height: 'h-[66.66%]',
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
      top: isLeft ? 'top-[33%]' : 'top-[50%]',
      height: 'h-[50%]',
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
      top: isLeft ? 'top-[66%]' : 'top-[20%]',
      height: isLeft ? 'h-[33%]' : 'h-[66.66%]',
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
          className={`absolute ${isLeft ? 'left-0' : 'right-0'} ${config.top} ${
            config.height
          } w-full ${config.color} ${
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
