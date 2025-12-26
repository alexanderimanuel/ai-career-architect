/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion'
import { User, Code, Heart } from 'lucide-react' 

const ProfileSection = ({ summary, skills }) => (
    <div className="space-y-6">
        {/* Summary Card */}
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-8 border-l-4 border-primary"
        >
            <div className="flex items-start">
                <div className="p-3 rounded-xl bg-primary/10 text-primary mr-5 mt-1">
                    <User size={28} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold mb-3 font-display">Professional Profile</h3>
                    <p className="text-gray-300 leading-relaxed text-lg font-light">{summary}</p>
                </div>
            </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-panel p-8"
            >
                <div className="flex items-center mb-6 text-secondary">
                    <Code size={24} className="mr-3" />
                    <h4 className="font-bold text-xl font-display">Hard Skills</h4>
                </div>
                <div className="flex flex-wrap gap-2.5">
                    {skills.hard_skills.map((skill, idx) => (
                        <span key={idx} className="bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-medium border border-secondary/20 hover:bg-secondary/20 transition-colors cursor-default">
                            {skill}
                        </span>
                    ))}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-panel p-8"
            >
                <div className="flex items-center mb-6 text-accent">
                    <Heart size={24} className="mr-3" />
                    <h4 className="font-bold text-xl font-display">Soft Skills</h4>
                </div>
                <div className="flex flex-wrap gap-2.5">
                    {skills.soft_skills.map((skill, idx) => (
                        <span key={idx} className="bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-medium border border-accent/20 hover:bg-accent/20 transition-colors cursor-default">
                            {skill}
                        </span>
                    ))}
                </div>
            </motion.div>
        </div>
    </div>
)

export default ProfileSection
