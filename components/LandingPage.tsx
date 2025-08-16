import React from 'react';
import Button from './Button';

interface LandingPageProps {
    onStart: () => void;
}

const FeatureCard = ({ icon, title, children, delay }: { icon: string; title: string; children: React.ReactNode; delay: number }) => (
    <div 
      className="bg-surface/50 backdrop-blur-sm border border-border rounded-2xl p-6 text-left shadow-2xl shadow-black/20 opacity-0 animate-fade-in-stagger"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-xl bg-surface/70 border border-border">
          <i className={`fa-solid ${icon} text-xl text-primary`}></i>
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-muted text-sm leading-relaxed">
        {children}
      </p>
    </div>
);


const LandingPage = ({ onStart }: LandingPageProps): React.ReactNode => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden text-white font-sans">
        {/* Background Mesh Gradient */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div 
            className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-indigo-900/50 via-purple-900/30 to-base animate-gradient-bg"
            style={{backgroundSize: '400% 400%'}}
          ></div>
        </div>

        <main className="z-10 flex flex-col items-center w-full max-w-5xl">
            <div className="text-center animate-fade-in" style={{ animationFillMode: 'forwards' }}>
                <div className="mb-4 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-surface/50 backdrop-blur-sm border border-border shadow-2xl shadow-black/20">
                    <i className="fa-solid fa-wand-magic-sparkles text-4xl text-primary"></i>
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400 py-2">
                    Craft Stunning Visuals with AI
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-muted">
                    Transform your simple ideas into rich, detailed prompts for AI image generators. Unlock creative possibilities and generate breathtaking images with perfectly engineered prompts.
                </p>
                <div className="mt-10">
                    <Button onClick={onStart} variant="primary" className="text-lg px-8 py-4">
                        <i className="fa-solid fa-rocket mr-2"></i>
                        Launch Prompt Crafter
                    </Button>
                </div>
            </div>

            <div className="mt-24 w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <FeatureCard icon="fa-lightbulb" title="Idea to Masterpiece" delay={200}>
                    Start with a basic concept and let our AI expand it into multiple, highly descriptive and creative prompt variations.
                </FeatureCard>
                <FeatureCard icon="fa-sliders" title="Fine-Tune Your Vision" delay={400}>
                    Control the artistic direction with style selectors and camera shot types to get the exact visual you're imagining.
                </FeatureCard>
                <FeatureCard icon="fa-copy" title="Instant Variations" delay={600}>
                    Generate up to 5 unique prompts at once, giving you a range of options to explore for your final image.
                </FeatureCard>
            </div>
        </main>
        <footer className="absolute bottom-6 text-muted text-sm">
            Powered by Google Gemini
        </footer>
    </div>
  );
};

export default LandingPage;