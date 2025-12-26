import { useState } from 'react'
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion'
import { Key, Save, X, ExternalLink } from 'lucide-react'

const SettingsModal = ({ onClose, onSave }) => {
    const [key, setKey] = useState(() => localStorage.getItem('GEMINI_API_KEY') || '')

    const handleSave = (e) => {
        e.preventDefault()
        localStorage.setItem('GEMINI_API_KEY', key)
        onSave(key)
        onClose()
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel border-white/10 w-full max-w-md overflow-hidden shadow-2xl relative"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-[80px] pointer-events-none" />

                <div className="p-6 border-b border-white/5 flex items-center justify-between relative z-10">
                    <div className="flex items-center space-x-3 text-white">
                        <div className="p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                            <Key size={18} className="text-yellow-400" />
                        </div>
                        <h3 className="font-bold font-display tracking-tight text-lg">API Configuration</h3>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSave} className="p-6 space-y-6 relative z-10">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Google Gemini API Key</label>
                        <input
                            type="password"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            placeholder="AIzaSy..."
                            className="glass-input w-full rounded-xl p-3 text-white focus:outline-none transition-all"
                        />
                    </div>

                    <div className="text-xs text-gray-500 flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/5">
                        <span>Don't have a key?</span>
                        <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="flex items-center text-primary hover:text-primary-hover font-bold transition-colors">
                            Get it here <ExternalLink size={12} className="ml-1" />
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all neon-button"
                    >
                        <Save size={16} /> <span>Save Configuration</span>
                    </button>
                </form>
            </motion.div>
        </div>
    )
}

export default SettingsModal
