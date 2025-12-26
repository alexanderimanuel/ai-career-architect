import React from 'react'

const positions = [
  { left: '8%', top: '12%', color: 'purple', delay: 0 },
  { left: '22%', top: '45%', color: 'cyan', delay: 1.3 },
  { left: '48%', top: '30%', color: 'orange', delay: 0.7 },
  { left: '72%', top: '18%', color: 'purple', delay: 2.2 },
  { left: '88%', top: '60%', color: 'cyan', delay: 1.7 },
]

const ParticleField = () => {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {positions.map((p, i) => (
        <div
          key={i}
          className={`particle ${p.color}`}
          style={{ left: p.left, top: p.top, animationDelay: `${p.delay}s` }}
        />
      ))}
    </div>
  )
}

export default ParticleField
