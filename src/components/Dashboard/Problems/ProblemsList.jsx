import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, 
    Filter, 
    CheckCircle2, 
    Circle, 
    TrendingUp, 
    Star,
    Bookmark,
    ChevronDown,
    X
} from 'lucide-react';
import axios from 'axios';

const ProblemsList = ({ onSelectProblem }) => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');

    useEffect(() => {
        fetchProblems();
    }, []);

    const fetchProblems = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/problems');
            console.log('Problems fetched:', response.data);
            setProblems(response.data.data || []);
        } catch (error) {
            console.error('Error fetching problems:', error);
            alert('Error loading problems. Please refresh the page.');
        } finally {
            setLoading(false);
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy': return 'text-green-400';
            case 'Medium': return 'text-yellow-400';
            case 'Hard': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };

    const getStatusIcon = (status) => {
        if (status === 'solved') return <CheckCircle2 className="w-5 h-5 text-green-400" />;
        if (status === 'attempted') return <Circle className="w-5 h-5 text-yellow-400" />;
        return <Circle className="w-5 h-5 text-gray-600" />;
    };

    const filteredProblems = problems.filter(problem => {
        const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDifficulty = selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty;
        const matchesStatus = selectedStatus === 'all' || problem.status === selectedStatus;
        return matchesSearch && matchesDifficulty && matchesStatus;
    });

    return (
        <div className="max-w-[1600px] mx-auto px-6 py-8">
            
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl font-bold text-white mb-2">Problems</h1>
                <p className="text-gray-400">Solve coding challenges and improve your skills</p>
            </motion.div>

            {/* Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 flex flex-col md:flex-row gap-4"
            >
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search problems..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a]/60 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-500/10 transition-all"
                    />
                </div>

                {/* Difficulty Filter */}
                <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="px-4 py-3 bg-[#1a1a1a]/60 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:border-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-500/10 transition-all cursor-pointer"
                >
                    <option value="all">All Difficulties</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>

                {/* Status Filter */}
                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-3 bg-[#1a1a1a]/60 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:border-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-500/10 transition-all cursor-pointer"
                >
                    <option value="all">All Status</option>
                    <option value="solved">Solved</option>
                    <option value="attempted">Attempted</option>
                    <option value="unsolved">Todo</option>
                </select>
            </motion.div>

            {/* Problems Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-[#1a1a1a]/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
            >
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 text-gray-400 text-sm font-medium">
                    <div className="col-span-1">Status</div>
                    <div className="col-span-4">Title</div>
                    <div className="col-span-2">Links</div>
                    <div className="col-span-2">Difficulty</div>
                    <div className="col-span-3">Tags</div>
                </div>

                {/* Table Body */}
                {loading ? (
                    <div className="p-12 text-center text-gray-500">
                        <div className="animate-spin w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full mx-auto mb-4" />
                        Loading problems...
                    </div>
                ) : problems.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        No problems found
                    </div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {filteredProblems.map((problem, index) => (
                            <motion.div
                                key={problem._id || problem.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + index * 0.05 }}
                                onClick={() => onSelectProblem(problem)}
                                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-white/5 transition-all cursor-pointer group"
                            >
                                <div className="col-span-1 flex items-center">
                                    {getStatusIcon(problem.status || 'unsolved')}
                                </div>
                                <div className="col-span-4 flex items-center">
                                    <span className="text-white group-hover:text-green-400 transition-colors font-medium">
                                        {problem.order || problem.id}. {problem.title}
                                    </span>
                                </div>
                                <div className="col-span-2 flex items-center gap-2">
                                    {problem.externalLinks?.leetcode && (
                                        <a
                                            href={problem.externalLinks.leetcode}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-lg transition-all hover:scale-110"
                                            title="LeetCode"
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
                                            </svg>
                                        </a>
                                    )}
                                    {problem.externalLinks?.gfg && (
                                        <a
                                            href={problem.externalLinks.gfg}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg transition-all hover:scale-110"
                                            title="GeeksforGeeks"
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M21.45 17.98c-1.17.63-2.54.96-4.13.96-2.57 0-4.65-.81-6.09-2.44-1.44-1.63-2.16-3.79-2.16-6.49 0-2.7.72-4.86 2.16-6.49C12.67 1.89 14.75 1.08 17.32 1.08c1.59 0 2.96.33 4.13.96v3.28c-1.17-.81-2.46-1.21-3.87-1.21-1.59 0-2.88.54-3.87 1.62-.99 1.08-1.48 2.52-1.48 4.32 0 1.8.49 3.24 1.48 4.32.99 1.08 2.28 1.62 3.87 1.62 1.41 0 2.7-.4 3.87-1.21v3.2zM2.55 1.44h3.6v16.8h-3.6z"/>
                                            </svg>
                                        </a>
                                    )}
                                    {problem.videoUrl && (
                                        <a
                                            href={problem.videoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all hover:scale-110"
                                            title="YouTube"
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                            </svg>
                                        </a>
                                    )}
                                </div>
                                <div className="col-span-2 flex items-center">
                                    <span className={`${getDifficultyColor(problem.difficulty)} font-medium`}>
                                        {problem.difficulty}
                                    </span>
                                </div>
                                <div className="col-span-3 flex items-center gap-2 flex-wrap">
                                    {problem.tags?.slice(0, 3).map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-1 bg-white/5 rounded-md text-xs text-gray-400"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default ProblemsList;
