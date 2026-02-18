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
                    <div className="col-span-5">Title</div>
                    <div className="col-span-2">Difficulty</div>
                    <div className="col-span-2">Acceptance</div>
                    <div className="col-span-2">Tags</div>
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
                                <div className="col-span-5 flex items-center">
                                    <span className="text-white group-hover:text-green-400 transition-colors font-medium">
                                        {problem.order || problem.id}. {problem.title}
                                    </span>
                                </div>
                                <div className="col-span-2 flex items-center">
                                    <span className={`${getDifficultyColor(problem.difficulty)} font-medium`}>
                                        {problem.difficulty}
                                    </span>
                                </div>
                                <div className="col-span-2 flex items-center text-gray-400">
                                    {problem.acceptanceRate}%
                                </div>
                                <div className="col-span-2 flex items-center gap-2">
                                    {problem.tags?.slice(0, 2).map((tag, i) => (
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

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                <div className="p-4 bg-[#1a1a1a]/40 backdrop-blur-sm border border-white/10 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Solved</p>
                            <p className="text-white text-xl font-bold">2</p>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-[#1a1a1a]/40 backdrop-blur-sm border border-white/10 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-500/10 rounded-lg">
                            <Circle className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Attempted</p>
                            <p className="text-white text-xl font-bold">1</p>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-[#1a1a1a]/40 backdrop-blur-sm border border-white/10 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Acceptance Rate</p>
                            <p className="text-white text-xl font-bold">66.7%</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProblemsList;
