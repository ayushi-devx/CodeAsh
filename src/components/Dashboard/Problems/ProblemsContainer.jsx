import React, { useState } from 'react';
import EnhancedProblemDetail from './EnhancedProblemDetail';
import ProblemsList from './ProblemsList';

const ProblemsContainer = () => {
    const [selectedProblem, setSelectedProblem] = useState(null);

    return (
        <div className="min-h-screen">
            {selectedProblem ? (
                <EnhancedProblemDetail 
                    problem={selectedProblem} 
                    onBack={() => setSelectedProblem(null)} 
                />
            ) : (
                <ProblemsList onSelectProblem={setSelectedProblem} />
            )}
        </div>
    );
};

export default ProblemsContainer;
