/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion'
import { Target } from 'lucide-react' 

const MatchCard = ({ match, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + (index * 0.1) }}
        className="glass-panel p-6 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-300 border border-white/5 hover:border-primary/40"
    >
        <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
                <h4 className="text-xl font-bold font-display text-white group-hover:text-primary transition-colors duration-300">
                    {match.career}
                </h4>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">Match Score</p>
            </div>
            <div className="flex items-end">
                <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent">{match.match_score}</span>
                <span className="text-sm text-gray-400 mb-1 ml-1 font-medium">%</span>
            </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-black/40 rounded-full mb-6 overflow-hidden relative z-10 border border-white/5">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${match.match_score}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={`h-full rounded-full ${index === 0 ? 'bg-gradient-to-r from-primary to-accent' : 'bg-primary'}`}
            />
        </div>

        <p className="text-sm text-gray-300 leading-relaxed relative z-10 font-light">
            {match.reason}
        </p>

        {/* Decorative Glow */}
        <div
            className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-all duration-500"
        />
    </motion.div>
)

const CareerMatches = ({ matches }) => (
    <div className="space-y-8">
        <div className="flex items-center space-x-3 mb-4">
            <div className="p-2.5 bg-secondary/10 rounded-lg">
                <Target className="text-secondary" size={24} />
            </div>
            <h3 className="text-3xl font-bold font-display tracking-tight text-white">Top Career Matches</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matches.map((match, idx) => (
                <MatchCard key={idx} match={match} index={idx} />
            ))}
        </div>
    </div>
)

export default CareerMatches
