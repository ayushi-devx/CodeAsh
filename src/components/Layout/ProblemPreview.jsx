import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProblemPreview = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('c');

    const languageOptions = [
        { id: 'java', name: 'Java' },
        { id: 'cpp', name: 'C++' },
        { id: 'c', name: 'C' }
    ];

    const boilerplateCode = {
        java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> hashmap = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (hashmap.containsKey(complement)) {
                return new int[]{hashmap.get(complement), i};
            }
            hashmap.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
        cpp: `#include <cstdlib.h>

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                int* result = (int*)malloc(2 * sizeof(int));
                result[0] = i;
                result[1] = j;
                *returnSize = 2;
                return result;
            }
        }
    }
    *returnSize = 0;
    return NULL;
}`,
        c: `#include <cstdlib.h>

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                int* result = (int*)malloc(2 * sizeof(int));
                result[0] = i;
                result[1] = j;
                *returnSize = 2;
                return result;
            }
        }
    }
    *returnSize = 0;
    return NULL;
}`
    };

    const getCodeLines = (code) => {
        return code.split('\n').map((line, index) => ({
            number: index + 1,
            content: line
        }));
    };

    const highlightSyntax = (line, lang) => {
        const keywords = {
            java: ['import', 'class', 'public', 'int', 'for', 'if', 'return', 'new', 'Map', 'Integer', 'HashMap'],
            cpp: ['include', 'int', 'for', 'if', 'return', 'malloc', 'sizeof'],
            c: ['include', 'int', 'for', 'if', 'return', 'malloc', 'sizeof']
        };

        let highlighted = line;
        keywords[lang]?.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            highlighted = highlighted.replace(regex, `<span class="text-purple-400">${keyword}</span>`);
        });

        return highlighted;
    };

    return (
        <section className="relative w-full py-20 px-6 md:px-12 overflow-hidden bg-black">
            {/* Background gradient glow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

                    {/* Left Content - Problem Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#0d0d0d] rounded-xl border border-white/10 p-8 flex flex-col h-full"
                    >
                        {/* Problem Header */}
                        <div className="flex items-baseline gap-3 pb-5 border-b border-white/10">
                            <span className="text-gray-500 text-sm font-mono">1.</span>
                            <h3 className="text-3xl font-bold text-white">Two Sum</h3>
                        </div>

                        {/* Difficulty & Tags */}
                        <div className="flex flex-wrap gap-2 mt-5">
                            <span className="bg-green-500/15 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-md border border-green-500/30">
                                Easy
                            </span>
                            <span className="bg-blue-500/10 text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-md border border-blue-500/20">
                                Array
                            </span>
                            <span className="bg-blue-500/10 text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-md border border-blue-500/20">
                                Hash Table
                            </span>
                        </div>

                        {/* Problem Description */}
                        <div className="mt-6 space-y-4 text-gray-300 leading-relaxed flex-grow">
                            <p>
                                <span className="text-white font-semibold">Given</span> an array of integers{' '}
                                <code className="bg-white/5 px-2 py-0.5 rounded text-green-400 font-mono text-sm">nums</code>{' '}
                                and an integer{' '}
                                <code className="bg-white/5 px-2 py-0.5 rounded text-green-400 font-mono text-sm">target</code>,
                                return indices of the two numbers such that they add up to target.
                            </p>
                            <p className="text-gray-400 text-sm">
                                You may assume that each input would have{' '}
                                <span className="text-white font-semibold">exactly one solution</span>, and you may not use the same element twice.
                            </p>

                            {/* Example */}
                            <div className="mt-6">
                                <h4 className="text-white font-semibold mb-3">Example 1:</h4>
                                <div className="bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-sm space-y-1.5">
                                    <div>
                                        <span className="text-gray-500">Input:</span>{' '}
                                        <span className="text-gray-300">nums = [2, 7, 11, 15], target = 9</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Output:</span>{' '}
                                        <span className="text-gray-300">[0, 1]</span>
                                    </div>
                                    <div className="pt-2 text-gray-500 text-xs border-t border-white/5">
                                        Explanation: nums[0] + nums[1] = 2 + 7 = 9
                                    </div>
                                </div>
                            </div>

                            {/* Constraints */}
                            <div className="mt-6">
                                <h4 className="text-white font-semibold mb-3">Constraints:</h4>
                                <ul className="space-y-1.5 text-sm text-gray-400">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400">•</span>
                                        <span>2 ≤ nums.length ≤ 10⁴</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400">•</span>
                                        <span>-10⁹ ≤ nums[i] ≤ 10⁹</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400">•</span>
                                        <span>-10⁹ ≤ target ≤ 10⁹</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400">•</span>
                                        <span>Only one valid answer exists.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Content - Code Editor */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="bg-[#0d0d0d] rounded-xl border border-green-500/20 overflow-hidden shadow-[0_0_40px_-10px_rgba(34,197,94,0.2)] flex flex-col h-full"
                    >
                        {/* Title Bar */}
                        <div className="bg-[#1a1a1a] px-5 py-3.5 flex items-center justify-between border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <span className="text-xs text-gray-400 font-mono">
                                    Solution.{selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage}
                                </span>
                            </div>

                            {/* Language Selector */}
                            <div className="flex items-center gap-1 bg-black/40 rounded-lg p-0.5 border border-white/5">
                                {languageOptions.map((lang) => (
                                    <button
                                        key={lang.id}
                                        onClick={() => setSelectedLanguage(lang.id)}
                                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${selectedLanguage === lang.id
                                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                : 'text-gray-400 hover:text-gray-300 hover:bg-white/5'
                                            }`}
                                    >
                                        {lang.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Code Content */}
                        <div className="p-5 font-mono text-[13px] leading-relaxed overflow-auto flex-grow bg-[#0d0d0d]">
                            <div className="space-y-0">
                                {getCodeLines(boilerplateCode[selectedLanguage]).map((line) => (
                                    <div key={line.number} className="flex hover:bg-white/5 px-2 -mx-2 rounded">
                                        <span className="select-none text-gray-600 w-10 text-right pr-4 flex-shrink-0">
                                            {line.number}
                                        </span>
                                        <span
                                            className="text-gray-300 flex-1"
                                            dangerouslySetInnerHTML={{
                                                __html: highlightSyntax(line.content, selectedLanguage)
                                                    .replace(/</g, '&lt;')
                                                    .replace(/>/g, '&gt;')
                                                    .replace(/&lt;span class="text-purple-400"&gt;/g, '<span class="text-purple-400">')
                                                    .replace(/&lt;\/span&gt;/g, '</span>')
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default ProblemPreview;
