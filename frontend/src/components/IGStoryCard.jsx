import { useRef, useState } from 'react'
import { Download, Share2, Sparkles, Zap } from 'lucide-react'
import html2canvas from 'html2canvas'

const IGStoryCard = ({ result }) => {
    const cardRef = useRef(null)
    const [isDownloading, setIsDownloading] = useState(false)

    // Helper to get top 3 skills
    const topSkills = result.skills.hard_skills.slice(0, 3)
    const futureRole = result.career_matches[0]?.career || "Future Leader"
    const targetYear = result.career_roadmap[result.career_roadmap.length - 1]?.year_range || "2030"
    const matchScore = result.career_matches[0]?.match_score || 0

    const handleDownload = async () => {
        if (!cardRef.current) return
        setIsDownloading(true)

        try {
            // Need to wait a bit for fonts/images if any
            const scale = Math.min(4, Math.max(2, Math.round((window.devicePixelRatio || 1) * 2)));
            const canvas = await html2canvas(cardRef.current, {
                scale, // High resolution adjusted to device DPR
                backgroundColor: '#030712', // Match new bg-dark
                useCORS: true,
                imageTimeout: 0,
            })

            const image = canvas.toDataURL("image/png")
            const link = document.createElement('a')
            link.href = image
            link.download = `Firostack-Career-${futureRole.replace(/\s+/g, '-')}.png`
            link.click()
        } catch (err) {
            console.error("Failed to generate image:", err)
            alert("Oops! Failed to generate image. Please try again.")
        } finally {
            setIsDownloading(false)
        }
    }

    return (
        <div className="flex flex-col items-center space-y-4">

            {/* Control Bar */}
            <div className="w-full flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-white flex items-center font-display">
                    <Share2 size={20} className="mr-2 text-accent" />
                    Share Result
                </h3>
                <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="glass-button text-sm flex items-center bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-white border border-white/10 px-4 py-2 rounded-lg"
                >
                    {isDownloading ? (
                        <span>Generating...</span>
                    ) : (
                        <>
                            <Download size={16} className="mr-2" />
                            <span>Save to Story</span>
                        </>
                    )}
                </button>
            </div>

            {/* The Hidden Card Container (We render this to canvas) */}
            <div className="relative perspective-1000">
                {/* 
                   Vertical Aspect Ratio (9:16 approx) 
                   W: 340px, H: 604px 
                */}
                <div
                    ref={cardRef}
                    className="w-[340px] h-[604px] relative overflow-hidden bg-[#030712] text-white rounded-3xl shadow-2xl flex flex-col p-0"
                    id="ig-story-card"
                >
                    {/* Background Ambience */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                        {/* Deep glowing orbs */}
                        <div className="absolute top-[-100px] left-[-50px] w-[300px] h-[300px] bg-primary/30 rounded-full blur-[100px]" />
                        <div className="absolute bottom-[-50px] right-[-100px] w-[350px] h-[350px] bg-secondary/20 rounded-full blur-[100px]" />
                        <div className="absolute top-[40%] left-[20%] w-[150px] h-[150px] bg-accent/20 rounded-full blur-[80px]" />

                        {/* Noise Texture */}
                        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-30 mix-blend-overlay" />

                        {/* Grid Pattern */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 w-full h-full flex flex-col p-8 justify-between border-[6px] border-white/5 rounded-3xl">

                        {/* Header Branding */}
                        <div className="flex justify-between items-start">
                            <div className="p-2 border border-white/10 rounded-lg bg-white/5 backdrop-blur-md">
                                <Sparkles size={20} className="text-secondary" />
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400">Powered By</p>
                                <p className="text-xs font-bold text-white tracking-widest font-display">FIROSTACK.TECH</p>
                            </div>
                        </div>

                        {/* Main Title */}
                        <div className="mt-8">
                            <p className="text-gray-400 text-sm font-medium mb-1 flex items-center uppercase tracking-wider">
                                <Sparkles size={14} className="mr-2 text-accent" /> Career Trajectory
                            </p>
                            <h1 className="text-4xl font-black leading-[0.9] text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-400 font-display">
                                {futureRole}
                            </h1>
                            <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-accent mt-5 rounded-full" />
                        </div>

                        {/* Stats Section */}
                        <div className="space-y-4 my-auto">
                            <div className="glass-panel p-5 bg-white/5 border-white/10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full -mr-4 -mt-4 opacity-50" />
                                <div className="flex justify-between items-end relative z-10">
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1 font-bold">AI Match Score</p>
                                        <p className="text-4xl font-black text-white font-display">{matchScore}%</p>
                                    </div>
                                    <Sparkles size={28} className="text-yellow-400 mb-1 animate-pulse" />
                                </div>
                            </div>

                            <div className="glass-panel p-5 bg-white/5 border-white/10">
                                <div className="flex items-center mb-3">
                                    <Zap size={14} className="text-purple-400 mr-2" />
                                    <span className="text-xs text-gray-300 font-bold uppercase tracking-wider">Top Skills</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {topSkills.map((skill, i) => (
                                        <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-gray-200 font-medium whitespace-nowrap">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer / Vision */}
                        <div className="text-center pt-6 border-t border-white/10">
                            <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">Projected Milestone</p>
                            <div className="text-6xl font-black text-white tracking-tighter drop-shadow-lg font-display text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
                                {targetYear}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default IGStoryCard
