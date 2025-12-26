import React, { useCallback, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, X, Loader2, Sparkles, AlertCircle, ChevronDown, Trash2 } from 'lucide-react';
import { extractTextFromPDF } from '../utils/pdfExtractor';
import './input-form.css';

const InputForm = ({ onAnalyze }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [careerStage, setCareerStage] = useState('Mahasiswa / Magang');
    const [isFounder, setIsFounder] = useState(false);

    // Explicit ref for file input if needed
    const fileInputRef = useRef(null);

    const onDrop = useCallback(async (acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        if (selectedFile) {
            if (selectedFile.type !== 'application/pdf') {
                setError('Hanya file PDF yang diperbolehkan');
                return;
            }
            if (selectedFile.size > 5 * 1024 * 1024) {
                setError('Ukuran file maksimal 5MB');
                return;
            }
            setFile(selectedFile);
            setError(null);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false,
        noClick: true // Disable click on root since we handle it explicitly
    });

    const handleSubmit = async () => {
        if (!file) return;
        setLoading(true);
        try {
            const text = await extractTextFromPDF(file);
            onAnalyze({
                cvText: text,
                careerStage,
                isFounder
            });
        } catch (err) {
            console.error(err);
            setError('Gagal memproses PDF. Pastikan file tidak rusak.');
        } finally {
            setLoading(false);
        }
    };

    const removeFile = (e) => {
        e.stopPropagation();
        setFile(null);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="input-form-container w-full mx-auto relative z-20"
        >
            <div className="upload-card-wrapper" id="upload-zone">
                <div className="upload-card">

                    {/* DROPZONE AREA */}
                    <div
                        {...(!file ? getRootProps({ onClick: open }) : {})}
                        className={`drop-zone ${file ? 'has-file' : ''} ${isDragActive ? 'active' : ''}`}
                    >
                        {!file && <input {...getInputProps()} />}

                        <AnimatePresence mode="wait">
                            {!file ? (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center text-center p-4"
                                >
                                    <div className="upload-icon-wrapper">
                                        <Upload className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="zone-title">
                                        {isDragActive ? 'Lepaskan File...' : 'Upload CV Kamu'}
                                    </h3>
                                    <p className="zone-subtitle">
                                        Drag & drop atau klik disini (PDF, Max 5MB)
                                    </p>

                                    <div className="privacy-badge">
                                        <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                                        Privasi Aman Dijamin
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="fileselected"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="flex flex-col items-center w-full"
                                >
                                    {/* Large PDF Icon */}
                                    <FileText className="file-icon-large" />

                                    <h3 className="file-name truncate max-w-[400px]">
                                        {file.name}
                                    </h3>

                                    <div className="upload-success-badge">
                                        <Sparkles className="w-3 h-3" />
                                        Upload Berhasil
                                    </div>

                                    <button
                                        onClick={removeFile}
                                        className="delete-btn"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Hapus & Upload Ulang
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* ERROR MESSAGE */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-200"
                            >
                                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                                <p className="text-sm font-medium">{error}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* CONFIGURATION SECTION (Only shows when file uploaded) */}
                    <AnimatePresence>
                        {file && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="form-section space-y-8">

                                    {/* Career Stage - Custom Select */}
                                    <div className="space-y-4 mb-8">
                                        <label className="form-label">Pengalaman Kerja Saat Ini</label>
                                        <div className="select-wrapper">
                                            <select
                                                value={careerStage}
                                                onChange={(e) => setCareerStage(e.target.value)}
                                                className="custom-select"
                                            >
                                                <option value="Mahasiswa / Magang">🎓 Mahasiswa / Magang</option>
                                                <option value="Junior (0-2 tahun)">🌱 Junior (0-2 tahun)</option>
                                                <option value="Mid-Level (3-5 tahun)">🚀 Mid-Level (3-5 tahun)</option>
                                                <option value="Senior (>5 tahun)">💎 Senior (&gt;5 tahun)</option>
                                                <option value="Executive / C-Level">👑 Executive / C-Level</option>
                                            </select>
                                            <ChevronDown className="w-5 h-5 absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                                        </div>
                                    </div>

                                    {/* Explicit Spacer */}
                                    <div style={{ height: '40px' }} />

                                    {/* Founder Interest - Modern Toggle */}
                                    <div className="space-y-4">
                                        <label className="form-label">Apakah Anda Tertarik Jadi Founder?</label>
                                        <div className="option-group">
                                            <div
                                                onClick={() => setIsFounder(false)}
                                                className={`option-item ${!isFounder ? 'active' : ''}`}
                                            >
                                                Tidak
                                            </div>
                                            <div
                                                onClick={() => setIsFounder(true)}
                                                className={`option-item ${isFounder ? 'active' : ''}`}
                                            >
                                                Ya, Sangat Tertarik
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ACTION BUTTON */}
                    <div className="mt-2">
                        <button
                            onClick={file ? handleSubmit : open}
                            disabled={loading}
                            className={`action-btn ${file ? 'primary' : 'secondary'}`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    Menganalisa CV...
                                </>
                            ) : (
                                <>
                                    {file ? (
                                        <>
                                            Mulai Analisa Sekarang
                                            <Sparkles className="w-5 h-5 fill-current" />
                                        </>
                                    ) : 'Pilih File PDF'}
                                </>
                            )}
                        </button>
                    </div>

                </div>
            </div>
        </motion.div>
    );
};

export default InputForm;
