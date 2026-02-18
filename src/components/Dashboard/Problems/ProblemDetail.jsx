import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
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
    Code2
} from 'lucide-react';

const ProblemDetail = ({ problem, onBack }) => {
    const [code, setCode] = useState(`function twoSum(nums, target) {
    // Write your code here
    
}`);
    const [language, setLanguage] = useState('javascript');
    const [fontSize, setFontSize] = useState(14);
    const [activeTab, setActiveTab] = useState('description');
    const [testResults, setTestResults] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        
        // Configure Monaco theme
        monaco.editor.defineTheme('codeash-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#0f0f0f',
                'editor.foreground': '#d4d4d4',
                'editorLineNumber.foreground': '#4a4a4a',
                'editorLineNumber.activeForeground': '#22c55e',
                'editor.selectionBackground': '#264f78',
                'editor.inactiveSelectionBackground': '#3a3d41'
            }
        });
        monaco.editor.setTheme('codeash-dark');
    };

    const handleRunCode = () => {
        setIsRunning(true);
        // Simulate code execution
        setTimeout(() => {
            setTestResults({
                passed: 2,
                total: 3,
                cases: [
                    { input: '[2,7,11,15], target = 9', output: '[0,1]', expected: '[0,1]', passed: true, time: '2ms' },
                    { input: '[3,2,4], target = 6', output: '[1,2]', expected: '[1,2]', passed: true, time: '1ms' },
                    { input: '[3,3], target = 6', output: '[0,1]', expected: '[0,1]', passed: false, time: '3ms' }
                ]
            });
            setIsRunning(false);
            setActiveTab('testcases');
        }, 1500);
    };

    const handleSubmit = () => {
        setIsRunning(true);
        setTimeout(() => {
            alert('Solution submitted successfully!');
            setIsRunning(false);
        }, 2000);
    };

    const handleReset = () => {
        setCode(`function twoSum(nums, target) {
    // Write your code here
    
}`);
    };

    return (
        <div className="h-screen flex flex-col bg-[#0b0b0f]">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#1a1a1a]/40 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors group"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    </button>
                    <div>
                        <h2 className="text-white font-semibold text-lg">{problem.id}. {problem.title}</h2>
                        <div className="flex items-center gap-3 mt-1">
                            <span className={`text-sm font-medium ${
                                problem.difficulty === 'Easy' ? 'text-green-400' :
                                problem.difficulty === 'Medium' ? 'text-yellow-400' :
                                'text-red-400'
                            }`}>
                                {problem.difficulty}
                            </span>
                            <span className="text-gray-500 text-sm">•</span>
                            <span className="text-gray-400 text-sm">Acceptance: {problem.acceptance}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg text-gray-300 hover:text-white hover:border-white/20 transition-all flex items-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                    </button>
                    <button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className="px-4 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg text-gray-300 hover:text-white hover:border-green-500/30 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                        <Play className="w-4 h-4" />
                        {isRunning ? 'Running...' : 'Run'}
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isRunning}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-white hover:from-green-600 hover:to-emerald-700 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                        <Send className="w-4 h-4" />
                        Submit
                    </button>
                </div>
            </div>

            {/* Main Content - Split View */}
            <div className="flex-1 flex overflow-hidden">
                
                {/* Left Panel - Problem Description */}
                <div className="w-1/2 border-r border-white/10 overflow-y-auto">
                    <div className="p-6">
                        {/* Tabs */}
                        <div className="flex gap-2 mb-6 border-b border-white/10">
                            {['description', 'editorial', 'solutions'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 text-sm font-medium capitalize transition-all relative ${
                                        activeTab === tab
                                            ? 'text-white'
                                            : 'text-gray-400 hover:text-white'
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
                                    <p className="text-gray-300 leading-relaxed">
                                        Given an array of integers <code className="px-2 py-1 bg-white/5 rounded text-green-400">nums</code> and an integer <code className="px-2 py-1 bg-white/5 rounded text-green-400">target</code>, return indices of the two numbers such that they add up to target.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-white font-semibold mb-3">Example 1:</h3>
                                    <div className="p-4 bg-[#1a1a1a]/60 rounded-xl border border-white/5 font-mono text-sm">
                                        <p className="text-gray-400">Input: <span className="text-white">nums = [2,7,11,15], target = 9</span></p>
                                        <p className="text-gray-400 mt-2">Output: <span className="text-white">[0,1]</span></p>
                                        <p className="text-gray-400 mt-2">Explanation: <span className="text-gray-300">Because nums[0] + nums[1] == 9, we return [0, 1].</span></p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-white font-semibold mb-3">Example 2:</h3>
                                    <div className="p-4 bg-[#1a1a1a]/60 rounded-xl border border-white/5 font-mono text-sm">
                                        <p className="text-gray-400">Input: <span className="text-white">nums = [3,2,4], target = 6</span></p>
                                        <p className="text-gray-400 mt-2">Output: <span className="text-white">[1,2]</span></p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-white font-semibold mb-3">Constraints:</h3>
                                    <ul className="space-y-2 text-gray-300">
                                        <li>• 2 ≤ nums.length ≤ 10⁴</li>
                                        <li>• -10⁹ ≤ nums[i] ≤ 10⁹</li>
                                        <li>• -10⁹ ≤ target ≤ 10⁹</li>
                                        <li>• Only one valid answer exists.</li>
                                    </ul>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Right Panel - Code Editor */}
                <div className="w-1/2 flex flex-col">
                    {/* Editor Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#1a1a1a]/40">
                        <div className="flex items-center gap-3">
                            <Code2 className="w-4 h-4 text-green-400" />
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="px-3 py-1.5 bg-[#0f0f0f] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-green-500/30 cursor-pointer"
                            >
                                <option value="javascript">JavaScript</option>
                                <option value="python">Python</option>
                                <option value="java">Java</option>
                                <option value="cpp">C++</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                                <Settings className="w-4 h-4 text-gray-400" />
                            </button>
                        </div>
                    </div>

                    {/* Monaco Editor */}
                    <div className="flex-1">
                        <Editor
                            height="100%"
                            language={language}
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
                    <div className="h-64 border-t border-white/10 bg-[#0f0f0f] overflow-y-auto">
                        <div className="flex gap-2 px-4 py-3 border-b border-white/10">
                            <button
                                onClick={() => setActiveTab('testcases')}
                                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                                    activeTab === 'testcases'
                                        ? 'bg-white/10 text-white'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                Test Cases
                            </button>
                            <button
                                onClick={() => setActiveTab('results')}
                                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                                    activeTab === 'results'
                                        ? 'bg-white/10 text-white'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                Results
                            </button>
                        </div>

                        <div className="p-4">
                            {testResults ? (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 mb-4">
                                        {testResults.passed === testResults.total ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                                        ) : (
                                            <XCircle className="w-5 h-5 text-red-400" />
                                        )}
                                        <span className="text-white font-medium">
                                            {testResults.passed}/{testResults.total} test cases passed
                                        </span>
                                    </div>
                                    {testResults.cases.map((testCase, i) => (
                                        <div
                                            key={i}
                                            className={`p-3 rounded-lg border ${
                                                testCase.passed
                                                    ? 'bg-green-500/5 border-green-500/20'
                                                    : 'bg-red-500/5 border-red-500/20'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-white font-medium text-sm">Case {i + 1}</span>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-3 h-3 text-gray-400" />
                                                    <span className="text-gray-400 text-xs">{testCase.time}</span>
                                                </div>
                                            </div>
                                            <p className="text-gray-400 text-sm font-mono">Input: {testCase.input}</p>
                                            <p className={`text-sm font-mono mt-1 ${testCase.passed ? 'text-green-400' : 'text-red-400'}`}>
                                                Output: {testCase.output}
                                            </p>
                                            {!testCase.passed && (
                                                <p className="text-gray-400 text-sm font-mono mt-1">Expected: {testCase.expected}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    Run your code to see test results
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemDetail;
