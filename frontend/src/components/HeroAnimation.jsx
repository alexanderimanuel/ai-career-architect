import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Target, TrendingUp, Award, Search, Users, Zap } from 'lucide-react'

const IconItem = ({ icon: Icon, x, y, delay, color }) => (
  <motion.foreignObject x={x} y={y} width="32" height="32">
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [-4, 4, -4]
      }}
      transition={{
        opacity: { delay: delay, duration: 0.5 },
        scale: { delay: delay, duration: 0.5 },
        y: { repeat: Infinity, duration: 2 + Math.random(), ease: "easeInOut", delay: Math.random() }
      }}
      className={`flex items-center justify-center w-8 h-8 rounded-full bg-[rgba(15,23,42,0.6)] backdrop-blur-sm border border-[${color}] shadow-[0_0_15px_${color}40]`}
    >
      <Icon size={16} style={{ color: color }} />
    </motion.div>
  </motion.foreignObject>
)

const HeroAnimation = () => (
  <div className="hero-animation pointer-events-none relative" aria-hidden>
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      width="100%"
      height="140"
      viewBox="0 0 500 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto block max-w-[600px]"
    >
      <defs>
        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0" />
          <stop offset="20%" stopColor="#7C3AED" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#6366F1" stopOpacity="1" />
          <stop offset="80%" stopColor="#06B6D4" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Main glowing arc */}
      <motion.path
        d="M50 140 Q 250 -40, 450 140"
        stroke="url(#g1)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))' }}
      />

      {/* Background glow blur */}
      <motion.path
        d="M50 140 Q 250 -40, 450 140"
        stroke="url(#g1)"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        style={{ filter: 'blur(12px)' }}
      />

      {/* Career Icons scattered along the arc */}
      {/* Left side */}
      <IconItem icon={Search} x="80" y="90" delay={0.4} color="#06B6D4" />
      <IconItem icon={Briefcase} x="140" y="50" delay={0.6} color="#3B82F6" />

      {/* Top Center */}
      <IconItem icon={Target} x="234" y="20" delay={0.8} color="#6366F1" />

      {/* Right side */}
      <IconItem icon={TrendingUp} x="330" y="50" delay={1.0} color="#8B5CF6" />
      <IconItem icon={Award} x="390" y="90" delay={1.2} color="#A78BFA" />

    </motion.svg>
  </div>
)

export default HeroAnimation
