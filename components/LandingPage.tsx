import React from 'react';
import Button from './Button';

interface LandingPageProps {
    onStart: () => void;
}

const LandingPage = ({ onStart }: LandingPageProps): React.ReactNode => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden text-white font-sans">
        {/* Background decoration */}
        <div 
          className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"
        >
            <div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] rounded-full bg-gradient-to-br from-indigo-600 to-purple-800 opacity-20 blur-[120px]"></div>
        </div>

        <main className="z-10 flex flex-col items-center animate-fade-in">
            <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 border border-slate-700">
                <i className="fa-solid fa-wand-magic-sparkles w-8 h-8 text-indigo-400"></i>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-slate-200 to-slate-400">
                Craft Stunning Visuals with AI
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-400">
                Transform your simple ideas into rich, detailed prompts for AI image generators. Unlock creative possibilities and generate breathtaking images with perfectly engineered prompts.
            </p>
            <div className="mt-10">
                <Button onClick={onStart} variant="primary" className="text-lg px-8 py-4">
                    Launch Prompt Crafter
                </Button>
            </div>
        </main>
        <footer className="absolute bottom-6 text-slate-500 text-sm">
            Powered by Google Gemini
        </footer>
    </div>
  );
};

export default LandingPage;