import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Cpu, Map, ArrowRight, ArrowLeft } from 'lucide-react';
import './DocsPage.css'; // Reuse premium styles

const GetStartedPage = ({ onBack, onStart }) => {
    const steps = [
        {
            icon: <Upload className="w-8 h-8 text-blue-400" />,
            title: "1. Upload CV Anda",
            desc: "Unggah CV (PDF/Word) dalam format standar. Sistem kami akan mengekstrak teks secara otomatis."
        },
        {
            icon: <Cpu className="w-8 h-8 text-purple-400" />,
            title: "2. AI Bekerja",
            desc: "Engine AI kami memindai ribuan data poin untuk menemukan kekuatan unik dan celah keahlian Anda."
        },
        {
            icon: <Map className="w-8 h-8 text-teal-400" />,
            title: "3. Dapat Roadmap",
            desc: "Terima rencana karir strategis, rekomendasi langkah konkret, dan skor kesiapan karir."
        }
    ];

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="max-w-5xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh] text-center"
            >
                <div className="w-full flex justify-start mb-4">
                    <button
                        onClick={onBack}
                        className="btn-back"
                    >
                        <ArrowLeft className="w-4 h-4" /> Kembali
                    </button>
                </div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <h1 className="text-5xl md:text-6xl docs-header-gradient animate-gradient-x mb-6 drop-shadow-2xl">
                        Mulai Perjalanan Karirmu
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed" style={{ marginBottom: '15px' }}>
                        Hanya butuh 3 langkah sederhana untuk mengubah ketidakpastian menjadi rencana aksi nyata.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 w-full" style={{ gap: '15px', marginBottom: '15px' }}>
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (i * 0.15) }}
                            className="h-full relative group"
                        >
                            {/* Connector Line (Desktop) */}
                            {i !== steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[2px] bg-gradient-to-r from-indigo-500/50 to-transparent transform -translate-y-1/2 z-0" />
                            )}

                            <div className="docs-card h-full flex flex-col items-center">
                                <div className="docs-icon-wrapper mb-6">
                                    {step.icon}
                                </div>
                                <h3 className="docs-title mb-3">{step.title}</h3>
                                <p className="docs-content">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onStart}
                    className="btn-primary text-xl px-10 py-5 flex items-center gap-3"
                >
                    Buat Analisis Baru
                    <ArrowRight className="w-6 h-6" />
                </motion.button>
            </motion.div>
        </>
    );
};

export default GetStartedPage;
