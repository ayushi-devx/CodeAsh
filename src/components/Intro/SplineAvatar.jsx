import React from 'react';
import Spline from '@splinetool/react-spline';

const SplineAvatar = ({ onLoad }) => {
    // User provided Codeash robot scene
    const SCENE_URL = "https://prod.spline.design/3yyr6r5HnA5GqfV5/scene.splinecode";

    return (
        <div className="w-full h-full absolute inset-0 z-10 pointer-events-none">
            <Spline
                scene={SCENE_URL}
                onLoad={onLoad}
                className="w-full h-full"
            />
        </div>
    );
};

export default SplineAvatar;
