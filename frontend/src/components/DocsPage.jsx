import { motion } from 'framer-motion';
import { Book, Shield, Zap, HelpCircle, ArrowLeft, Target, ChevronDown } from 'lucide-react';
import './DocsPage.css';

const DocsPage = ({ onBack }) => {
    const sections = [
        {
            icon: <Zap className="w-8 h-8 text-yellow-400" />,
            title: "Bagaimana AI Bekerja?",
            content: "Sistem kami menggunakan model AI canggih untuk membedah setiap kalimat dalam CV Anda. Ia mencari pola keahlian, pengalaman proyek, dan pencapaian, lalu membandingkannya dengan standar industri global."
        },
        {
            icon: <Target className="w-8 h-8 text-purple-400" />,
            title: "Memahami Skor Kecocokan",
            content: "Skor 0-100% bukan nilai ujian, tapi indikator kesiapan Anda untuk naik level. Skor 85% ke atas berarti Anda sangat siap. Di bawah itu berarti ada potensi besar yang masih bisa digali."
        },
        {
            icon: <Shield className="w-8 h-8 text-teal-400" />,
            title: "Privasi Data",
            content: "Kami tidak menyimpan CV Anda secara permanen. Analisis dilakukan secara realtime dan sesi Anda bersifat sementara. Privasi karir Anda adalah prioritas utama kami."
        }
    ];

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="docs-container max-w-7xl mx-auto px-6 py-12 lg:py-20"
            >
                {/* Header Navigation */}
                <div className="mb-16 lg:mb-24">
                    <button
                        onClick={onBack}
                        className="btn-back"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium tracking-wide">Kembali ke Dashboard</span>
                    </button>
                </div>

                {/* Hero Section */}
                <div className="text-center relative z-10 max-w-4xl mx-auto" style={{ marginBottom: '15px' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="flex justify-center mb-10"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                            AI Powered Knowledge
                        </div>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-10 leading-[1.1] tracking-tight">
                        <span className="block text-white mb-2 filter drop-shadow-lg">PUSAT</span>
                        <span className="docs-header-gradient animate-gradient-x">BANTUAN</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light max-w-2xl mx-auto">
                        Panduan lengkap untuk memaksimalkan potensi karir Anda dengan teknologi <span className="text-white font-semibold relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-indigo-500/50">AI Career Architect</span>.
                    </p>
                </div>

                {/* Feature Cards Grid - Inline Styles for Guaranteed Spacing */}
                <div
                    className="flex flex-col md:grid md:grid-cols-3 relative z-10"
                    style={{ gap: '15px', marginBottom: '80px' }} // Adjusted gap to 15px
                >
                    {sections.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (i * 0.15) }}
                            whileHover={{ y: -8 }}
                            className="h-full"
                            style={{ marginBottom: '15px' }} // Adjusted margin to 15px
                        >
                            <div className="docs-card h-full">
                                <div className="docs-icon-wrapper">
                                    {React.cloneElement(item.icon, { className: "w-9 h-9 transition-transform duration-500" })}
                                </div>

                                <h3 className="docs-title">{item.title}</h3>
                                <p className="docs-content">{item.content}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="max-w-6xl mx-auto border-t border-white/5" style={{ paddingTop: '15px' }}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Left Column: FAQ Header */}
                        <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit text-center lg:text-left" style={{ marginBottom: '15px' }}>
                            <div className="inline-flex justify-center lg:justify-start items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center">
                                    <HelpCircle className="w-6 h-6 text-indigo-400" />
                                </div>
                                <span className="text-3xl font-bold docs-header-gradient tracking-tight">FAQ</span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight docs-header-gradient">
                                Pertanyaan <br className="hidden lg:block" />Umum
                            </h2>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                Temukan jawaban cepat seputar cara kerja, privasi, dan fitur AI Career Architect di sini.
                            </p>
                        </div>

                        {/* Right Column: Accordion Items */}
                        <div className="lg:col-span-8 space-y-6">
                            {[
                                {
                                    q: "Apakah layanan ini gratis?",
                                    a: "Ya, versi Beta ini sepenuhnya gratis untuk mahasiswa dan profesional muda. Kami berkomitmen mendukung akselerasi karir talenta teknologi Indonesia."
                                },
                                {
                                    q: "Berapa lama proses analisisnya?",
                                    a: "Instan! Analisis AI kami memproses CV Anda dalam waktu 5-10 detik. Hasilnya langsung muncul berupa dashboard interaktif."
                                },
                                {
                                    q: "Apakah data CV saya aman?",
                                    a: "Sangat aman. Kami menggunakan enkripsi standar industri dan tidak menyimpan data pribadi Anda lebih lama dari sesi analisis. CV Anda tidak akan dibagikan ke pihak ketiga."
                                }
                            ].map((faq, idx) => (
                                <details key={idx} className="docs-faq-card group" style={{ marginBottom: '15px' }}>
                                    <summary className="docs-faq-summary">
                                        <span>{faq.q}</span>
                                        <div className="ml-4 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-open:bg-indigo-500 group-open:border-transparent transition-all duration-300 shrink-0">
                                            <ChevronDown className="w-5 h-5 text-gray-400 group-open:text-white transform group-open:rotate-180 transition-transform duration-300" />
                                        </div>
                                    </summary>
                                    <div className="docs-faq-content">
                                        {faq.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default DocsPage;
