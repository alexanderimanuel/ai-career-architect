import React from 'react'
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion'

const SimpleChart = ({ data = [] }) => {
  // data: [{label, value}]
  const max = Math.max(...data.map(d => d.value), 100)
  return (
    <div className="simple-chart w-full">
      {data.map((d, i) => (
        <div key={i} className="mb-3">
          <div className="flex justify-between text-sm text-gray-300 mb-1">
            <span>{d.label}</span>
            <span className="font-semibold">{d.value}%</span>
          </div>
          <div className="w-full bg-black/30 rounded-full h-3 overflow-hidden neon-outline">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(d.value / max) * 100}%` }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="h-3 rounded-full"
              style={{ background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-indigo))' }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default SimpleChart
