import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { 
    Play, 
    Send, 
    RotateCcw, 
    Settings, 
    ChevronLeft,
    CheckCircle2,
    XCircle,
    Clock,
    Code2,
    Sun,
    Moon,
    Copy,
    Check,
    Lightbulb,
    MessageSquare,
    FileText,
    Maximize2,
    Minimize2,
    Sparkles
} from 'lucide-react';
import axios from 'axios';
import AIAssistant from './AIAssistant';

const EnhancedProblemDetail = ({ problem, onBack }) => {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [fontSize, setFontSize] = useState(14);
    const [theme, setTheme] = useState('dark');
    const [activeTab, setActiveTab] = useState('description');
    const [testResults, setTestResults] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [customInput, setCustomInput] = useState('');
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showAI, setShowAI] = useState(false);
    const editorRef = useRef(null);

    useEffect(() => {
        // Load starter code when language changes
        if (problem?.starterCode) {
            const starter = problem.starterCode.find(sc => sc.language === language);
            if (starter) {
                setCode(starter.code);
            }
        }
    }, [language, problem]);

    useEffect(() => {
        // Auto-save code to localStorage
        const timer = setTimeout(() => {
            if (code && problem) {
                localStorage.setItem(`code_${problem.slug}_${language}`, code);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [code, problem, language]);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        
        // Configure Monaco themes
        monaco.editor.defineTheme('codeash-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'comment', foreground: '6A9955' },
                { token: 'keyword', foreground: '569CD6' },
                { token: 'string', foreground: 'CE9178' },
                { token: 'number', foreground: 'B5CEA8' },
            ],
            colors: {
                'editor.background': '#0f0f0f',
                'editor.foreground': '#d4d4d4',
                'editorLineNumber.foreground': '#4a4a4a',
                'editorLineNumber.activeForeground': '#22c55e',
                'editor.selectionBackground': '#264f78',
                'editor.inactiveSelectionBackground': '#3a3d41',
                'editorCursor.foreground': '#22c55e',
            }
        });

        monaco.editor.defineTheme('codeash-light', {
            base: 'vs',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#ffffff',
                'editorLineNumber.activeForeground': '#22c55e',
            }
        });

        monaco.editor.setTheme(theme === 'dark' ? 'codeash-dark' : 'codeash-light');
    };

    const handleRunCode = async () => {
        if (!code || code.trim() === '') {
            alert('Please write some code first!');
            return;
        }

        if (!problem || !problem._id) {
            alert('Problem data not loaded properly. Please refresh.');
            return;
        }

        setIsRunning(true);
        setActiveTab('testcases');
        
        try {
            console.log('Running code with:', {
                codeLength: code.length,
                language,
                problemId: problem._id,
                hasCustomInput: !!customInput
            });

            const response = await axios.post('http://localhost:5000/api/submissions/run', {
                code,
                language,
                problemId: problem._id,
                customInput: showCustomInput && customInput ? customInput : undefined
            });

            console.log('Run response:', response.data);
            setTestResults(response.data.data);
        } catch (error) {
            console.error('Error running code:', error);
            console.error('Error details:', error.response?.data);
            const errorMsg = error.response?.data?.message || error.message || 'Error running code';
            alert(`Error: ${errorMsg}\n\nCheck browser console for details.`);
        } finally {
            setIsRunning(false);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        
        try {
            const token = localStorage.getItem('codeash_token');
            const response = await axios.post(
                'http://localhost:5000/api/submissions/submit',
                {
                    code,
                    language,
                    problemId: problem._id
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setTestResults(response.data.data);
            setActiveTab('testcases');
            
            if (response.data.data.status === 'Accepted') {
                alert('🎉 Accepted! Great job!');
            }
        } catch (error) {
            console.error('Error submitting code:', error);
            alert('Error submitting code. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        const starter = problem.starterCode?.find(sc => sc.language === language);
        if (starter) {
            setCode(starter.code);
        }
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        if (editorRef.current) {
            editorRef.current.updateOptions({
                theme: newTheme === 'dark' ? 'codeash-dark' : 'codeash-light'
            });
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy': return 'text-green-400 bg-green-500/10 border-green-500/20';
            case 'Medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
            case 'Hard': return 'text-red-400 bg-red-500/10 border-red-500/20';
            default: return 'text-gray-400';
        }
    };

    return (
        <div className={`h-screen flex flex-col ${theme === 'dark' ? 'bg-[#0b0b0f]' : 'bg-white'}`}>
            {/* Top Bar */}
            <div className={`flex items-center justify-between px-6 py-4 border-b ${
                theme === 'dark' ? 'border-white/10 bg-[#1a1a1a]/40' : 'border-gray-200 bg-gray-50'
            } backdrop-blur-sm`}>
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className={`p-2 hover:bg-white/5 rounded-lg transition-colors group`}
                    >
                        <ChevronLeft className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-black'}`} />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>
                                {problem.order}. {problem.title}
                            </h2>
                            <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                                {problem.difficulty}
                            </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                Acceptance: {problem.acceptanceRate}%
                            </span>
                            {problem.tags?.slice(0, 3).map((tag, i) => (
                                <span key={i} className={`px-2 py-0.5 rounded text-xs ${
                                    theme === 'dark' ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-600'
                                }`}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowAI(!showAI)}
                        className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                            showAI
                                ? 'bg-purple-500 text-white hover:bg-purple-600'
                                : theme === 'dark'
                                    ? 'bg-[#1a1a1a] border border-white/10 text-gray-300 hover:text-white hover:border-purple-500/30'
                                    : 'bg-white border border-gray-200 text-gray-700 hover:text-black hover:border-purple-500'
                        }`}
                    >
                        <Sparkles className="w-4 h-4" />
                        AI Assistant
                    </button>
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-lg transition-all ${
                            theme === 'dark' 
                                ? 'bg-[#1a1a1a] border border-white/10 hover:border-white/20' 
                                : 'bg-white border border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        {theme === 'dark' ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
                    </button>
                    <button
                        onClick={handleReset}
                        className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                            theme === 'dark'
                                ? 'bg-[#1a1a1a] border border-white/10 text-gray-300 hover:text-white hover:border-white/20'
                                : 'bg-white border border-gray-200 text-gray-700 hover:text-black hover:border-gray-300'
                        }`}
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                    </button>
                    <button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                            theme === 'dark'
                                ? 'bg-[#1a1a1a] border border-white/10 text-gray-300 hover:text-white hover:border-green-500/30'
                                : 'bg-white border border-gray-200 text-gray-700 hover:text-black hover:border-green-500'
                        } disabled:opacity-50`}
                    >
                        <Play className="w-4 h-4" />
                        {isRunning ? 'Running...' : 'Run'}
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-white hover:from-green-600 hover:to-emerald-700 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                        <Send className="w-4 h-4" />
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </div>

            {/* Main Content - Split View */}
            <div className="flex-1 flex overflow-hidden">
                
                {/* Left Panel - Problem Description */}
                <div className={`w-1/2 border-r ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'} overflow-y-auto`}>
                    <div className="p-6">
                        {/* Tabs */}
                        <div className={`flex gap-2 mb-6 border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
                            {['description', 'editorial', 'solutions', 'submissions'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 text-sm font-medium capitalize transition-all relative ${
                                        activeTab === tab
                                            ? theme === 'dark' ? 'text-white' : 'text-black'
                                            : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                                    }`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="activeDescTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-400"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Description Content */}
                        {activeTab === 'description' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div>
                                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} leading-relaxed whitespace-pre-wrap`}>
                                        {problem.description}
                                    </p>
                                </div>

                                {problem.examples?.map((example, i) => (
                                    <div key={i}>
                                        <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-semibold mb-3`}>
                                            Example {i + 1}:
                                        </h3>
                                        <div className={`p-4 rounded-xl border font-mono text-sm ${
                                            theme === 'dark' 
                                                ? 'bg-[#1a1a1a]/60 border-white/5' 
                                                : 'bg-gray-50 border-gray-200'
                                        }`}>
                                            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                                                Input: <span className={theme === 'dark' ? 'text-white' : 'text-black'}>{example.input}</span>
                                            </p>
                                            <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                Output: <span className={theme === 'dark' ? 'text-white' : 'text-black'}>{example.output}</span>
                                            </p>
                                            {example.explanation && (
                                                <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                    Explanation: <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{example.explanation}</span>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {problem.constraints && problem.constraints.length > 0 && (
                                    <div>
                                        <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-semibold mb-3`}>
                                            Constraints:
                                        </h3>
                                        <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                            {problem.constraints.map((constraint, i) => (
                                                <li key={i}>• {constraint}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {problem.hints && problem.hints.length > 0 && (
                                    <div className={`p-4 rounded-xl border ${
                                        theme === 'dark' 
                                            ? 'bg-blue-500/5 border-blue-500/20' 
                                            : 'bg-blue-50 border-blue-200'
                                    }`}>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Lightbulb className="w-5 h-5 text-blue-400" />
                                            <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-semibold`}>
                                                Hints
                                            </h3>
                                        </div>
                                        <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                            {problem.hints.map((hint, i) => (
                                                <li key={i}>💡 {hint}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Editorial Tab */}
                        {activeTab === 'editorial' && (
                            <EditorialTab problem={problem} theme={theme} />
                        )}

                        {/* Solutions Tab */}
                        {activeTab === 'solutions' && (
                            <SolutionsTab problem={problem} theme={theme} />
                        )}

                        {/* Submissions Tab */}
                        {activeTab === 'submissions' && (
                            <SubmissionsTab problem={problem} theme={theme} />
                        )}
                    </div>
                </div>

                {/* Right Panel - Code Editor */}
                <div className="w-1/2 flex flex-col">
                    {/* Editor Header */}
                    <div className={`flex items-center justify-between px-4 py-3 border-b ${
                        theme === 'dark' ? 'border-white/10 bg-[#1a1a1a]/40' : 'border-gray-200 bg-gray-50'
                    }`}>
                        <div className="flex items-center gap-3">
                            <Code2 className="w-4 h-4 text-green-400" />
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className={`px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 cursor-pointer ${
                                    theme === 'dark'
                                        ? 'bg-[#0f0f0f] border border-white/10 text-white'
                                        : 'bg-white border border-gray-200 text-gray-900'
                                }`}
                            >
                                <option value="javascript">JavaScript</option>
                                <option value="python">Python</option>
                                <option value="java">Java</option>
                                <option value="cpp">C++</option>
                                <option value="c">C</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleCopyCode}
                                className={`p-2 hover:bg-white/5 rounded-lg transition-colors`}
                            >
                                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                            </button>
                            <button
                                onClick={() => setIsFullscreen(!isFullscreen)}
                                className={`p-2 hover:bg-white/5 rounded-lg transition-colors`}
                            >
                                {isFullscreen ? <Minimize2 className="w-4 h-4 text-gray-400" /> : <Maximize2 className="w-4 h-4 text-gray-400" />}
                            </button>
                        </div>
                    </div>

                    {/* Monaco Editor */}
                    <div className="flex-1">
                        <Editor
                            height="100%"
                            language={language === 'cpp' ? 'cpp' : language}
                            value={code}
                            onChange={(value) => setCode(value)}
                            onMount={handleEditorDidMount}
                            options={{
                                fontSize: fontSize,
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                lineNumbers: 'on',
                                renderLineHighlight: 'all',
                                automaticLayout: true,
                                tabSize: 2,
                                fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
                                fontLigatures: true,
                                cursorBlinking: 'smooth',
                                smoothScrolling: true,
                                padding: { top: 16, bottom: 16 }
                            }}
                        />
                    </div>

                    {/* Test Cases Panel */}
                    <div className={`h-64 border-t ${theme === 'dark' ? 'border-white/10 bg-[#0f0f0f]' : 'border-gray-200 bg-gray-50'} overflow-y-auto`}>
                        <div className={`flex gap-2 px-4 py-3 border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
                            <button
                                onClick={() => setShowCustomInput(false)}
                                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                                    !showCustomInput
                                        ? theme === 'dark' ? 'bg-white/10 text-white' : 'bg-white text-black'
                                        : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                                }`}
                            >
                                Test Cases
                            </button>
                            <button
                                onClick={() => setShowCustomInput(true)}
                                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                                    showCustomInput
                                        ? theme === 'dark' ? 'bg-white/10 text-white' : 'bg-white text-black'
                                        : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                                }`}
                            >
                                Custom Input
                            </button>
                        </div>

                        <div className="p-4">
                            {showCustomInput ? (
                                <textarea
                                    value={customInput}
                                    onChange={(e) => setCustomInput(e.target.value)}
                                    placeholder="Enter custom test input..."
                                    className={`w-full h-32 p-3 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 ${
                                        theme === 'dark'
                                            ? 'bg-[#1a1a1a] border border-white/10 text-white placeholder-gray-500'
                                            : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-400'
                                    }`}
                                />
                            ) : testResults ? (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 mb-4">
                                        {testResults.status === 'Accepted' || testResults.allPassed ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                                        ) : (
                                            <XCircle className="w-5 h-5 text-red-400" />
                                        )}
                                        <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium>
                                            {testResults.passed}/{testResults.total} test cases passed
                                        </span>
                                    </div>
                                    {testResults.results?.map((testCase, i) => (
                                        <div
                                            key={i}
                                            className={`p-3 rounded-lg border ${
                                                testCase.passed
                                                    ? theme === 'dark' 
                                                        ? 'bg-green-500/5 border-green-500/20' 
                                                        : 'bg-green-50 border-green-200'
                                                    : theme === 'dark'
                                                        ? 'bg-red-500/5 border-red-500/20'
                                                        : 'bg-red-50 border-red-200'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium text-sm`}>
                                                    Test Case {i + 1}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-3 h-3 text-gray-400" />
                                                    <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-xs`}>
                                                        {testCase.runtime || '0ms'}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm font-mono`}>
                                                Input: {testCase.input || testCase.expectedOutput}
                                            </p>
                                            <p className={`text-sm font-mono mt-1 ${testCase.passed ? 'text-green-400' : 'text-red-400'}`}>
                                                Output: {testCase.actualOutput || testCase.output}
                                            </p>
                                            {!testCase.passed && testCase.expectedOutput && (
                                                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm font-mono mt-1`}>
                                                    Expected: {testCase.expectedOutput}
                                                </p>
                                            )}
                                            {testCase.error && (
                                                <p className="text-red-400 text-sm font-mono mt-1">
                                                    Error: {testCase.error}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                                    Run your code to see test results
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Assistant Panel */}
            <AnimatePresence>
                {showAI && (
                    <AIAssistant
                        problem={problem}
                        userCode={code}
                        onClose={() => setShowAI(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

// Editorial Tab Component
const EditorialTab = ({ problem, theme }) => {
    const [editorial, setEditorial] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEditorial();
    }, [problem.slug]);

    const fetchEditorial = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/problems/${problem.slug}/editorial`);
            setEditorial(response.data.data.editorial);
        } catch (error) {
            console.error('Error fetching editorial:', error);
        } finally {
            setLoading(false);
        }
    };

    // Extract YouTube video ID from URL
    const getYouTubeVideoId = (url) => {
        if (!url) return null;
        const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
        return match ? match[1] : null;
    };

    const videoId = getYouTubeVideoId(problem.videoUrl);
    const coderArmyVideoId = getYouTubeVideoId(problem.coderArmyVideo);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Striver's Video Section */}
            {videoId && (
                <div className={`p-6 rounded-xl border ${
                    theme === 'dark' ? 'bg-[#1a1a1a]/60 border-white/5' : 'bg-gray-50 border-gray-200'
                }`}>
                    <div className="flex items-center gap-2 mb-4">
                        <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>
                            Striver's Video Explanation
                        </h3>
                    </div>
                    <div className="aspect-video rounded-lg overflow-hidden">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        />
                    </div>
                    <a
                        href={problem.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-3 inline-flex items-center gap-2 text-sm ${
                            theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                        }`}
                    >
                        Watch on YouTube
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            )}

            {/* Coder Army Video Section */}
            {coderArmyVideoId && (
                <div className={`p-6 rounded-xl border ${
                    theme === 'dark' ? 'bg-[#1a1a1a]/60 border-white/5' : 'bg-gray-50 border-gray-200'
                }`}>
                    <div className="flex items-center gap-2 mb-4">
                        <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>
                            Coder Army Video Explanation
                        </h3>
                    </div>
                    <div className="aspect-video rounded-lg overflow-hidden">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${coderArmyVideoId}`}
                            title="Coder Army video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        />
                    </div>
                    <a
                        href={problem.coderArmyVideo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-3 inline-flex items-center gap-2 text-sm ${
                            theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                        }`}
                    >
                        Watch on YouTube
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            )}

            {/* Editorial Text Section */}
            <div className={`p-6 rounded-xl border ${
                theme === 'dark' ? 'bg-[#1a1a1a]/60 border-white/5' : 'bg-gray-50 border-gray-200'
            }`}>
                <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-green-400" />
                    <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>
                        Official Editorial
                    </h3>
                </div>
                <div className={`prose ${theme === 'dark' ? 'prose-invert' : ''} max-w-none`}>
                    <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} whitespace-pre-wrap leading-relaxed`}>
                        {editorial}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Solutions Tab Component
const SolutionsTab = ({ problem, theme }) => {
    const [solutions, setSolutions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSolutions();
    }, [problem.slug]);

    const fetchSolutions = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/problems/${problem.slug}/solutions`);
            setSolutions(response.data.data);
        } catch (error) {
            console.error('Error fetching solutions:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
        >
            {solutions.map((solution, i) => (
                <div
                    key={solution.id}
                    className={`p-6 rounded-xl border ${
                        theme === 'dark' ? 'bg-[#1a1a1a]/60 border-white/5' : 'bg-gray-50 border-gray-200'
                    }`}
                >
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-semibold text-lg mb-1`}>
                                {solution.title}
                            </h3>
                            <div className="flex items-center gap-3 text-sm">
                                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                                    by {solution.author}
                                </span>
                                <span className={`px-2 py-0.5 rounded ${
                                    theme === 'dark' ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-600'
                                }`}>
                                    {solution.language}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className={`px-3 py-1.5 rounded-lg transition-colors ${
                                theme === 'dark' 
                                    ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' 
                                    : 'bg-green-50 text-green-600 hover:bg-green-100'
                            }`}>
                                ▲ {solution.votes}
                            </button>
                        </div>
                    </div>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                        {solution.explanation}
                    </p>
                    <div className={`p-4 rounded-lg font-mono text-sm overflow-x-auto ${
                        theme === 'dark' ? 'bg-[#0f0f0f] border border-white/5' : 'bg-white border border-gray-200'
                    }`}>
                        <pre className={theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}>
                            {solution.code}
                        </pre>
                    </div>
                    <div className="flex items-center gap-4 mt-4 text-sm">
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                            Runtime: {solution.runtime}
                        </span>
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                            Memory: {solution.memory}
                        </span>
                    </div>
                </div>
            ))}
        </motion.div>
    );
};

// Submissions Tab Component
const SubmissionsTab = ({ problem, theme }) => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubmissions();
    }, [problem.slug]);

    const fetchSubmissions = async () => {
        try {
            const token = localStorage.getItem('codeash_token');
            const response = await axios.get(
                `http://localhost:5000/api/problems/${problem.slug}/submissions`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSubmissions(response.data.data);
        } catch (error) {
            console.error('Error fetching submissions:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full" />
            </div>
        );
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Accepted':
                return theme === 'dark' ? 'text-green-400 bg-green-500/10' : 'text-green-600 bg-green-50';
            case 'Wrong Answer':
                return theme === 'dark' ? 'text-red-400 bg-red-500/10' : 'text-red-600 bg-red-50';
            case 'Runtime Error':
            case 'Compilation Error':
                return theme === 'dark' ? 'text-orange-400 bg-orange-500/10' : 'text-orange-600 bg-orange-50';
            default:
                return theme === 'dark' ? 'text-gray-400 bg-gray-500/10' : 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
        >
            {/* Submissions Count Header */}
            {submissions.length > 0 && (
                <div className={`p-4 rounded-xl border ${
                    theme === 'dark' ? 'bg-[#1a1a1a]/60 border-white/5' : 'bg-gray-50 border-gray-200'
                }`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>
                                Your Submissions
                            </h3>
                            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm mt-1`}>
                                Total: {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-400">
                                    {submissions.filter(s => s.status === 'Accepted').length}
                                </div>
                                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Accepted
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-red-400">
                                    {submissions.filter(s => s.status !== 'Accepted').length}
                                </div>
                                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Failed
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {submissions.length === 0 ? (
                <div className={`text-center py-12 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                    No submissions yet. Submit your solution to see history!
                </div>
            ) : (
                submissions.map((submission, i) => (
                    <div
                        key={i}
                        className={`p-4 rounded-xl border ${
                            theme === 'dark' ? 'bg-[#1a1a1a]/60 border-white/5' : 'bg-gray-50 border-gray-200'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(submission.status)}`}>
                                    {submission.status}
                                </span>
                                <span className={`px-2 py-0.5 rounded text-xs ${
                                    theme === 'dark' ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-600'
                                }`}>
                                    {submission.language}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                                    {submission.runtime?.toFixed(2)}s
                                </span>
                                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                                    {submission.memory?.toFixed(1)}KB
                                </span>
                                <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}>
                                    {new Date(submission.submittedAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </motion.div>
    );
};

export default EnhancedProblemDetail;
