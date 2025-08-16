import React, { useState, useCallback, useEffect } from 'react';
import { enhancePrompt } from './services/geminiService';
import PromptInput from './components/PromptInput';
import Button from './components/Button';
import ApiKeyModal from './components/ApiKeyModal';
import LandingPage from './components/LandingPage';
import Header from './components/Header';


const App = (): React.ReactNode => {
  const [apiKey, setApiKey] = useState<string>('');
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [numPrompts, setNumPrompts] = useState<number>(1);
  const [shotType, setShotType] = useState<string>('');
  const [finalPrompts, setFinalPrompts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTool, setShowTool] = useState(false);
  
  const shotTypes = [
    "Let AI Decide", "Close Up", "Medium Close Up", "Medium Shot",
    "Long Shot", "Wide Shot", "Extreme Wide Shot", "Dutch Angle",
    "Point of View (POV)", "Over-the-Shoulder Shot", "Low Angle Shot", "High Angle Shot"
  ];

  useEffect(() => {
    if (showTool) {
      const storedApiKey = localStorage.getItem('gemini-api-key');
      if (storedApiKey) {
        setApiKey(storedApiKey);
      } else {
        setIsModalOpen(true); // Open modal on first visit to the tool
      }
    }
  }, [showTool]);
  
  const handleSaveApiKey = (newKey: string) => {
    const trimmedKey = newKey.trim();
    setApiKey(trimmedKey);
    localStorage.setItem('gemini-api-key', trimmedKey);
  };

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserPrompt(e.target.value);
  }, []);
  
  const handleNumPromptsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const clampedValue = Math.max(1, Math.min(5, value || 1));
    setNumPrompts(clampedValue);
  };

  const handleShotTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "Let AI Decide" ? "" : e.target.value;
    setShotType(value);
  };

  const handleEnhanceClick = async () => {
    if (!apiKey) {
      setIsModalOpen(true);
      return;
    }
    setIsLoading(true);
    setFinalPrompts([]);
    setCopiedIndex(null);
    if(isSidebarOpen) setIsSidebarOpen(false);
    try {
      const enhanced = await enhancePrompt(userPrompt, numPrompts, shotType, apiKey);
      setFinalPrompts(enhanced);
    } catch (error) {
      console.error(error);
      setFinalPrompts(["Sorry, an error occurred. Please check your API key and try again."]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopyClick = useCallback((textToCopy: string, index: number) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);

  const handleReset = () => {
    setUserPrompt('');
    setFinalPrompts([]);
    setNumPrompts(1);
    setShotType('');
    setCopiedIndex(null);
  };

  if (!showTool) {
    return <LandingPage onStart={() => setShowTool(true)} />;
  }

  const SidebarContent = () => (
    <>
        <div className="flex items-center justify-between p-4 border-b border-slate-700 h-16">
          <h2 className="text-lg font-semibold text-white">Controls</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <i className="fa-solid fa-xmark w-6 h-6"></i>
          </button>
        </div>

        <div className="p-4 space-y-6 flex-1">
            <div>
              <label className="block font-medium text-slate-300 mb-2">API Key</label>
              <Button variant="secondary" onClick={() => setIsModalOpen(true)} className="w-full">
                <i className="fa-solid fa-key w-5 h-5"></i>
                {apiKey ? 'Update API Key' : 'Set API Key'}
              </Button>
              {apiKey ? (
                <p className="text-xs text-green-500 mt-2 text-center">API Key is set and ready.</p>
              ) : (
                <p className="text-xs text-amber-500 mt-2 text-center">API Key is required.</p>
              )}
            </div>

            <div>
              <label htmlFor="num-prompts" className="block font-medium text-slate-300 mb-2">
                Variations
              </label>
              <input
                id="num-prompts"
                type="number"
                value={numPrompts}
                onChange={handleNumPromptsChange}
                min="1"
                max="5"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                aria-label="Number of prompt variations"
              />
            </div>
            
            <div>
              <label htmlFor="shot-type" className="block font-medium text-slate-300 mb-2">
                Shot Type
              </label>
              <select
                id="shot-type"
                value={shotType || "Let AI Decide"}
                onChange={handleShotTypeChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 appearance-none"
                 style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundSize: '1.5em 1.5em',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                {shotTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
        </div>
    </>
  );

  const LoadingState = () => (
    <div className="flex flex-col justify-center items-center min-h-[120px] text-center">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-16 w-16 rounded-full border-2 border-indigo-500/50"></div>
        <div className="absolute h-16 w-16 rounded-full border-t-2 border-indigo-500 animate-spin" style={{ animationDuration: '1s' }}></div>
        <i className="fa-solid fa-wand-magic-sparkles w-6 h-6 text-indigo-400"></i>
      </div>
      <p className="text-slate-400 mt-4">Crafting your prompts with AI...</p>
    </div>
  );

  return (
    <div className="font-sans bg-slate-900 text-white">
      <Header showMenuButton={true} onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="relative min-h-screen md:flex">
        <ApiKeyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveApiKey}
          currentApiKey={apiKey}
        />
        {/* Background decoration */}
        <div 
          className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"
        >
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-20 blur-[100px]"></div>
        </div>
        
        {/* Mobile sidebar overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-slate-900/80 backdrop-blur-md border-r border-slate-800 shadow-2xl md:shadow-none transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <SidebarContent />
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-24 md:pt-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 rounded-xl p-6 shadow-lg">
                <PromptInput 
                    label="Your Core Idea" 
                    name="userPrompt" 
                    value={userPrompt} 
                    onChange={handleInputChange} 
                    placeholder="e.g., A majestic lion wearing a crown of stars, cyberpunk city"
                    rows={4}
                />
                 <div className="mt-6 flex items-center justify-center gap-4">
                    <Button onClick={handleEnhanceClick} isLoading={isLoading} variant="primary" disabled={!userPrompt.trim() || isLoading}>
                      <i className="fa-solid fa-wand-magic-sparkles w-5 h-5"></i>
                      Enhance with AI
                    </Button>
                    <Button onClick={handleReset} variant="secondary">
                      Reset
                    </Button>
                  </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-slate-200 mb-4 flex items-center gap-2">
                  <span className="p-1.5 bg-slate-800 rounded-md border border-slate-700"><i className="fa-solid fa-wand-magic-sparkles w-5 h-5 text-cyan-400"></i></span>
                  Generated Prompts
                </h2>
                <div className="space-y-4">
                    {isLoading && <LoadingState />}
                    {!isLoading && finalPrompts.length === 0 && (
                      <div className="flex justify-center items-center min-h-[120px] rounded-lg border-2 border-dashed border-slate-700">
                        <p className="text-slate-500 text-center">Your AI-generated prompts will appear here...</p>
                      </div>
                    )}
                    {!isLoading && finalPrompts.map((prompt, index) => (
                      <div 
                        key={index} 
                        className="relative bg-slate-800/70 p-4 rounded-lg border border-slate-700 group opacity-0 animate-fade-in-stagger"
                        style={{ animationDelay: `${index * 120}ms`, animationFillMode: 'forwards' }}
                      >
                        <p className="font-mono text-slate-300 whitespace-pre-wrap pr-12">
                          {prompt}
                        </p>
                        <button 
                          onClick={() => handleCopyClick(prompt, index)}
                          className="absolute top-3 right-3 p-2 bg-slate-700 rounded-md hover:bg-indigo-600 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 text-slate-300 hover:text-white"
                          aria-label="Copy prompt"
                        >
                           {copiedIndex === index ? <i className="fa-solid fa-check w-5 h-5 text-green-400"></i> : <i className="fa-regular fa-copy w-5 h-5"></i>}
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <footer className="text-center mt-12 text-slate-500">
              <p>Powered by Google Gemini</p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;