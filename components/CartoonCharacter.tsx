import { motion } from 'motion/react';

export default function CartoonCharacter({ status }: { status: 'disconnected' | 'connecting' | 'connected' }) {
  const bounce = status === 'connecting' 
    ? { y: [0, -15, 0], transition: { repeat: Infinity, duration: 0.3 } }
    : { y: [0, -5, 0], transition: { repeat: Infinity, duration: 1.5 } };

  return (
    <motion.svg width="180" height="180" viewBox="0 0 200 200" animate={bounce} className="overflow-visible">
      {/* Straw */}
      <motion.g 
        animate={status === 'connecting' ? { rotate: [0, 10, -10, 0] } : { rotate: 0 }}
        transition={{ repeat: Infinity, duration: 0.4 }}
        style={{ originX: '100px', originY: '80px' }}
      >
        <rect x="85" y="10" width="20" height="80" fill="white" stroke="#1a1a1a" strokeWidth="6" transform="rotate(15 95 50)" />
        <rect x="86" y="20" width="18" height="10" fill="#e32636" transform="rotate(15 95 50)" />
        <rect x="86" y="40" width="18" height="10" fill="#e32636" transform="rotate(15 95 50)" />
      </motion.g>

      {/* Handle */}
      <path d="M 140 90 C 200 90 200 160 130 150" fill="none" stroke="#1a1a1a" strokeWidth="14" strokeLinecap="round" />
      <path d="M 140 90 C 200 90 200 160 130 150" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" />

      {/* Cup Body */}
      <path d="M 40 70 L 160 70 C 160 180 40 180 40 70 Z" fill="#fdfbf7" stroke="#1a1a1a" strokeWidth="10" strokeLinejoin="round" />
      
      {/* Liquid inside (top rim) */}
      <ellipse cx="100" cy="70" rx="60" ry="15" fill="#fdfbf7" stroke="#1a1a1a" strokeWidth="10" />
      <ellipse cx="100" cy="72" rx="50" ry="8" fill={status === 'connected' ? '#00a2e8' : '#e32636'} opacity="0.8" />

      {/* Face */}
      {status === 'disconnected' && (
        <g>
          {/* Sad/Scared Eyes */}
          <path d="M 65 105 Q 80 90 95 105" fill="none" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
          <path d="M 105 105 Q 120 90 135 105" fill="none" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
          {/* Frown */}
          <path d="M 85 140 Q 100 125 115 140" fill="none" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
          {/* Sweat drop */}
          <path d="M 135 85 Q 145 95 135 105 Q 125 95 135 85" fill="#00a2e8" stroke="#1a1a1a" strokeWidth="3" />
        </g>
      )}

      {status === 'connecting' && (
        <g>
          {/* Spinning/Crazy Eyes */}
          <circle cx="75" cy="105" r="14" fill="white" stroke="#1a1a1a" strokeWidth="5" />
          <circle cx="125" cy="105" r="14" fill="white" stroke="#1a1a1a" strokeWidth="5" />
          <motion.circle cx="75" cy="105" r="5" fill="#1a1a1a" animate={{ x: [-5, 5, -5], y: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 0.2 }} />
          <motion.circle cx="125" cy="105" r="5" fill="#1a1a1a" animate={{ x: [5, -5, 5], y: [5, -5, 5] }} transition={{ repeat: Infinity, duration: 0.2 }} />
          {/* O Mouth */}
          <ellipse cx="100" cy="140" rx="12" ry="18" fill="#1a1a1a" />
        </g>
      )}

      {status === 'connected' && (
        <g>
          {/* Classic Pacman Eyes */}
          <path d="M 75 95 A 12 18 0 1 1 75 131 A 12 18 0 1 1 75 95 Z" fill="#1a1a1a" />
          <path d="M 75 100 L 88 113 L 75 126 Z" fill="#fdfbf7" /> {/* Cutout */}
          
          <path d="M 125 95 A 12 18 0 1 1 125 131 A 12 18 0 1 1 125 95 Z" fill="#1a1a1a" />
          <path d="M 125 100 L 112 113 L 125 126 Z" fill="#fdfbf7" /> {/* Cutout */}

          {/* Big Smile */}
          <path d="M 65 140 Q 100 175 135 140 Z" fill="#1a1a1a" stroke="#1a1a1a" strokeWidth="5" strokeLinejoin="round" />
          {/* Tongue */}
          <path d="M 90 150 Q 100 140 110 150 Q 100 165 90 150 Z" fill="#e32636" />
        </g>
      )}
    </motion.svg>
  );
}
