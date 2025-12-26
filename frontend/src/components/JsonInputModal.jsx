import { useState } from 'react'
import { FileCode, AlertCircle, ArrowRight } from 'lucide-react'

const JsonInputModal = ({ onAnalyze }) => {
    const [jsonText, setJsonText] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        setError(null)

        if (!jsonText.trim()) {
            setError("Please paste the JSON content.")
            return
        }

        try {
            // Attempt to clean JSON if it includes markdown code blocks
            let cleanText = jsonText
            if (cleanText.includes('```json')) {
                cleanText = cleanText.split('```json')[1].split('```')[0]
            } else if (cleanText.includes('```')) {
                cleanText = cleanText.split('```')[1].split('```')[0]
            }

            const parsedData = JSON.parse(cleanText)

            // Basic schema validation
            if (!parsedData.profile_summary || !parsedData.career_matches) {
                throw new Error("Invalid JSON structure. Missing required fields.")
            }

            onAnalyze(parsedData)

        } catch (err) {
            setError("Invalid JSON format. Please ensure you copied the code correctly.")
            console.error(err)
        }
    }

    return (
        <div className="space-y-6 text-left">
            {!jsonText && (
                <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-4 flex items-start space-x-3 mb-4">
                    <FileCode className="text-secondary mt-0.5 flex-shrink-0" size={20} />
                    <div>
                        <h4 className="font-bold text-white text-sm">Waiting for Input...</h4>
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                            After the AI generates the analysis, copy the entire <b>JSON code block</b> and paste it below.
                        </p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <textarea
                        className="glass-input w-full h-56 rounded-xl p-4 text-xs font-mono text-gray-300 focus:outline-none resize-none leading-relaxed"
                        placeholder='{ "profile_summary": "..." }'
                        value={jsonText}
                        onChange={(e) => setJsonText(e.target.value)}
                    />
                    {error && (
                        <div className="flex items-center text-red-400 text-xs bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                            <AlertCircle size={14} className="mr-2" />
                            {error}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={!jsonText}
                    className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all duration-300 ${jsonText ? 'neon-button' : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'}`}
                >
                    <span className="tracking-wide">VISUALIZE RESULTS</span>
                    <ArrowRight size={16} />
                </button>
            </form>
        </div>
    )
}

export default JsonInputModal
