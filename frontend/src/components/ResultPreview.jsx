import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, TrendingUp, Layers, CheckCircle2, ArrowRight, Lightbulb } from 'lucide-react';
import './results.css';

const ResultPreview = ({ data }) => {
    // Robust Mock Data in case backend returns partial data
    const defaultData = {
        matchScore: 0,
        careerPath: ['Start', 'Processing...', 'Goal'],
        summary: "Sedang menganalisis profil Anda...",
        strengths: [],
        gaps: [],
        recommendations: []
    };

    const analysis = data?.analysis || defaultData;
    const { matchScore, careerPath, summary, strengths, gaps, recommendations } = analysis;

    // Calculate circle circumference
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - ((matchScore / 100) * circumference);

    return (
        <motion.div
            className="results-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="result-card">

                {/* HEADER: MATCH SCORE */}
                <div className="result-header">
                    <div className="match-score-ring">
                        <svg className="circular-chart" viewBox="0 0 140 140">
                            <path
                                className="circle-bg"
                                d="M70 10 a 60 60 0 0 1 0 120 a 60 60 0 0 1 0 -120"
                            />
                            <motion.path
                                className="circle"
                                strokeDasharray={`${circumference} ${circumference}`}
                                initial={{ strokeDashoffset: circumference }}
                                animate={{ strokeDashoffset: offset }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                stroke="#8B5CF6"
                                d="M70 10 a 60 60 0 0 1 0 120 a 60 60 0 0 1 0 -120"
                            />
                        </svg>
                        <div className="score-text">
                            <div className="score-value">{matchScore}%</div>
                            <div className="score-label">KECOCOKAN</div>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-4">Hasil Analisis Karir</h2>
                    <p className="career-summary">{summary}</p>
                </div>

                {/* VISUAL CAREER PATH */}
                <div className="career-path-container">
                    <div className="path-line" />
                    <div className="path-progress" />

                    {/* Step 1: Current */}
                    <div className="path-node">
                        <div className="node-icon active">
                            <Layers className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div className="node-label">Saat Ini</div>
                        <div className="node-title">{careerPath[0] || 'Current Role'}</div>
                    </div>

                    {/* Step 2: Next Level (Target) */}
                    <div className="path-node">
                        <div className="node-icon target">
                            <Zap className="w-6 h-6 text-teal-400" />
                        </div>
                        <div className="node-label">Langkah Berikutnya</div>
                        <div className="node-title">{careerPath[1] || 'Next Role'}</div>
                    </div>

                    {/* Step 3: Ultimate Goal */}
                    <div className="path-node">
                        <div className="node-icon">
                            <Target className="w-6 h-6 text-purple-400" />
                        </div>
                        <div className="node-label">Jangka Panjang</div>
                        <div className="node-title">{careerPath[2] || 'Future Goal'}</div>
                    </div>
                </div>

                {/* SKILLS GRID */}
                <div className="skills-grid">
                    {/* Left: Strengths */}
                    <div>
                        <div className="section-title text-indigo-300">
                            <CheckCircle2 className="w-6 h-6" />
                            Kekuatan Utama Anda
                        </div>
                        <div className="skill-list">
                            {strengths.map((s, i) => (
                                <div key={i} className="skill-item">
                                    <div className="flex flex-col gap-1 w-full">
                                        <div className="flex justify-between mb-1">
                                            <span className="skill-name">{s.skill}</span>
                                            <span className="text-xs text-indigo-300">{s.level}%</span>
                                        </div>
                                        <div className="skill-bar-fill strength" style={{ width: `${s.level}%`, height: '4px' }} />
                                    </div>
                                </div>
                            ))}
                            {strengths.length === 0 && <p className="text-gray-500 italic">No specific strengths detected yet.</p>}
                        </div>
                    </div>

                    {/* Right: Gaps */}
                    <div>
                        <div className="section-title text-red-300">
                            <TrendingUp className="w-6 h-6" />
                            Skill yang Perlu Ditingkatkan
                        </div>
                        <div className="skill-list">
                            {gaps.map((g, i) => (
                                <div key={i} className="skill-item group bg-gradient-to-br from-white/5 to-white/0 hover:from-white/10 hover:to-white/5 border border-white/5 hover:border-red-500/30 transition-all duration-300">
                                    <div className="flex flex-col gap-2 w-full">
                                        <span className="skill-name text-lg font-bold text-gray-100">{g.skill}</span>
                                        <p className="text-sm text-gray-400/90 leading-relaxed font-light">
                                            {g.action || 'Fokus tingkatkan skill ini untuk level berikutnya.'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {gaps.length === 0 && <p className="text-gray-500 italic">Anda sudah sangat siap!</p>}
                        </div>
                    </div>
                </div>

                {/* RECOMMENDATIONS */}
                <div className="recommendations-section">
                    <div className="section-title text-white">
                        <Lightbulb className="w-6 h-6 text-yellow-400" />
                        Rekomendasi Aksi
                    </div>

                    {recommendations.map((rec, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                            className="rec-card"
                        >
                            <div className="rec-icon">
                                <ArrowRight className="w-5 h-5" />
                            </div>
                            <div className="rec-content">
                                <h4>{rec.title}</h4>
                                <p>{rec.description}</p>
                            </div>
                        </motion.div>
                    ))}
                    {recommendations.length === 0 && <p className="text-gray-500">Belum ada rekomendasi saat ini.</p>}
                </div>

            </div>
        </motion.div >
    );
};

export default ResultPreview;
