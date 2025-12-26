/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion'
import { CheckCircle, Map } from 'lucide-react'

const RoadmapItem = ({ item, index }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 + (index * 0.1) }}
        className="relative pl-8 md:pl-0" // Mobile padding for timeline line
    >
        {/* Desktop Layout: Alternating sides */}
        <div className={`md:flex items-center justify-between ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>

            {/* Spacer for alternating layout */}
            <div className="hidden md:block w-5/12" />

            {/* Center Marker */}
            <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-black z-10 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.6)]">
                <div className="w-2 h-2 bg-white rounded-full" />
            </div>

            {/* Content Card */}
            <div className="md:w-5/12 mb-10 md:mb-0">
                <div className="glass-panel p-6 border-t border-white/10 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)] group">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl font-bold font-display text-primary group-hover:text-white transition-colors">{item.year_range}</span>
                        <span className="text-xs uppercase tracking-wider text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/5">
                            {item.focus}
                        </span>
                    </div>
                    <ul className="space-y-3">
                        {item.recommended_actions.map((action, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                                <CheckCircle size={16} className="mr-3 mt-0.5 text-secondary flex-shrink-0" />
                                <span className="leading-relaxed">{action}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    </motion.div>
)

const Roadmap = ({ roadmap }) => (
    <div className="py-10">
        <div className="flex items-center space-x-3 mb-16 justify-center">
            <div className="p-3 bg-primary/10 rounded-xl">
                <Map className="text-primary" />
            </div>
            <h3 className="text-3xl font-bold font-display tracking-tight">Strategic Career Roadmap</h3>
        </div>

        <div className="relative">
            {/* Central Line */}
            <div className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent opacity-50 shadow-[0_0_10px_rgba(139,92,246,0.3)]" />

            <div className="space-y-8 md:space-y-0">
                {roadmap.map((item, idx) => (
                    <RoadmapItem key={idx} item={item} index={idx} />
                ))}
            </div>
        </div>
    </div>
)

export default Roadmap
