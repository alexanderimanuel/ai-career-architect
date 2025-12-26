/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion'
import { Copy, Check, MessageSquare, X } from 'lucide-react'
import { useState } from 'react'
import JsonInputModal from './JsonInputModal'

const PromptPreview = ({ prompt, onProceed }) => {
    const [copied, setCopied] = useState(false)
    const [showJsonInput, setShowJsonInput] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        // Automatically show JSON input after copying
        setTimeout(() => setShowJsonInput(true), 1000)
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
            <div className="glass-panel border-white/10 w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] relative">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

                <div className="p-6 border-b border-white/5 flex items-center justify-between flex-shrink-0 relative z-10">
                    <div className="flex items-center space-x-4">
                        <div className="p-2.5 bg-primary/10 rounded-xl text-primary border border-primary/20">
                            <MessageSquare size={22} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white font-display">Manual AI Analysis</h3>
                            <p className="text-sm text-gray-400 font-light">Step 1: Copy Prompt → Step 2: Paste Result</p>
                        </div>
                    </div>
                    <button onClick={() => window.location.reload()} className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto custom-scrollbar flex-grow relative z-10">
                    {/* Step 1: Prompt Display */}
                    <div className={`transition-all duration-500 ${showJsonInput ? 'opacity-40 blur-sm pointer-events-none grayscale' : 'opacity-100'}`}>
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="font-bold text-white text-sm uppercase tracking-wider flex items-center">
                                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mr-2 border border-primary/20">1</span>
                                Copy this Prompt
                            </h4>
                        </div>
                        <div className="relative group">
                            <pre className="w-full h-48 bg-[#050508] border border-white/10 rounded-xl p-5 text-xs text-gray-300 font-mono overflow-y-auto whitespace-pre-wrap leading-relaxed shadow-inner">
                                {prompt}
                            </pre>
                            <button
                                onClick={handleCopy}
                                className="absolute top-4 right-4 flex items-center space-x-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-all shadow-lg hover:shadow-primary/20 group/btn"
                            >
                                {copied ? <Check size={16} className="text-white" /> : <Copy size={16} />}
                                <span className="text-xs font-bold uppercase tracking-wider">{copied ? 'Copied!' : 'Copy Prompt'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Step 2: JSON Input */}
                    <div className={`mt-10 transition-all duration-500 ${!showJsonInput ? 'opacity-40 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="font-bold text-white text-sm uppercase tracking-wider flex items-center">
                                <span className="w-5 h-5 rounded-full bg-secondary/20 text-secondary flex items-center justify-center text-xs mr-2 border border-secondary/20">2</span>
                                Paste Response
                            </h4>
                        </div>
                        <div onClick={() => setShowJsonInput(true)} className={!showJsonInput ? "pointer-events-none" : ""}>
                            <JsonInputModal onAnalyze={onProceed} />
                        </div>
                    </div>
                </div>

            </div>
        </motion.div>
    )
}

export default PromptPreview
