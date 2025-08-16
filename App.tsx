import React, { useState, useCallback, useEffect } from 'react';
import { enhancePrompt } from './services/geminiService';
import PromptInput from './components/PromptInput';
import Button from './components/Button';
import { SparkleIcon, CopyIcon, MenuIcon, XIcon, KeyIcon } from './components/icons';
import ApiKeyModal from './components/ApiKeyModal';


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
  
  const shotTypes = [
    "Let AI Decide", "Close Up", "Medium Close Up", "Medium Shot",
    "Long Shot", "Wide Shot", "Extreme Wide Shot", "Dutch Angle",
    "Point of View (POV)", "Over-the-Shoulder Shot", "Low Angle Shot", "High Angle Shot"
  ];

  useEffect(() => {
    const storedApiKey = localStorage.getItem('gemini-api-key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    } else {
      setIsModalOpen(true); // Open modal on first visit if no key is found
    }
  }, []);
  
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

  const SidebarContent = () => (
    <>
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">Controls</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 space-y-6 flex-1">
            <div>
              <label className="block font-medium text-slate-300 mb-2">API Key</label>
              <Button variant="secondary" onClick={() => setIsModalOpen(true)} className="w-full">
                <KeyIcon className="w-5 h-5"/>
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

  return (
    <div className="relative min-h-screen font-sans bg-slate-900 text-white md:flex">
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
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-slate-900/80 backdrop-blur-md border-r border-slate-700 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <header className="flex items-center justify-between md:justify-center text-center mb-10">
            <div className="md:hidden">
              <button onClick={() => setIsSidebarOpen(true)} className="text-slate-400 hover:text-white">
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 pb-2">
                AI Image Prompt Crafter
              </h1>
              <p className="text-slate-400 mt-2 text-md hidden sm:block">Enter a simple idea and let AI expand it into a masterpiece prompt.</p>
            </div>
             <div className="md:hidden w-6"></div> {/* Spacer to balance header */}
          </header>

          <div className="space-y-8">
            <div>
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
                    <SparkleIcon className="w-5 h-5" />
                    Enhance with AI
                  </Button>
                  <Button onClick={handleReset} variant="secondary">
                    Reset
                  </Button>
                </div>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 animate-fade-in space-y-4">
              <h2 className="text-xl font-semibold text-slate-200">Final Prompts</h2>
              <div className="space-y-4">
                  {isLoading && (
                    <div className="flex justify-center items-center min-h-[120px]">
                      <p className="text-slate-400">Generating your prompts with AI...</p>
                    </div>
                  )}
                  {!isLoading && finalPrompts.length === 0 && (
                    <div className="flex justify-center items-center min-h-[120px]">
                      <p className="text-slate-400">Your AI-generated prompts will appear here...</p>
                    </div>
                  )}
                  {!isLoading && finalPrompts.map((prompt, index) => (
                    <div key={index} className="relative bg-slate-900/70 p-4 rounded-md border border-slate-600 group animate-fade-in">
                      <p className="font-mono text-slate-300 whitespace-pre-wrap pr-10">
                        {prompt}
                      </p>
                      <div className="absolute top-2 right-2">
                         {copiedIndex === index && <span className="text-green-400 text-xs transition-opacity duration-300 mr-2">Copied!</span>}
                          <button 
                            onClick={() => handleCopyClick(prompt, index)}
                            className="p-2 bg-slate-700 rounded-md hover:bg-slate-600 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                            aria-label="Copy prompt"
                          >
                            <CopyIcon className="w-5 h-5 text-slate-300" />
                          </button>
                      </div>
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
  );
};

export default App;