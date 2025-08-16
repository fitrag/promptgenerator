import React, { useState, useEffect } from 'react';
import Button from './Button';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
  currentApiKey: string;
}

const ApiKeyModal = ({ isOpen, onClose, onSave, currentApiKey }: ApiKeyModalProps): React.ReactNode => {
  const [localApiKey, setLocalApiKey] = useState(currentApiKey);

  useEffect(() => {
    setLocalApiKey(currentApiKey);
  }, [currentApiKey]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(localApiKey);
    onClose();
  };
  
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleOverlayClick}
    >
      <div 
        className="bg-surface/80 backdrop-blur-xl border border-border rounded-lg shadow-2xl w-full max-w-md p-6 m-4"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <div className="flex items-center gap-3">
            <i className="fa-solid fa-key w-6 h-6 text-primary"></i>
            <h2 className="text-xl font-bold text-white">Manage API Key</h2>
        </div>
        <p className="text-muted mt-2 mb-4">
          Your API key is stored securely in your browser's local storage and is never sent to our servers.
        </p>
        <div className="space-y-4">
          <input
            type="password"
            value={localApiKey}
            onChange={(e) => setLocalApiKey(e.target.value)}
            placeholder="Enter your Google Gemini API Key"
            className="w-full bg-base border border-border rounded-lg p-3 text-slate-200 placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
            aria-label="Google Gemini API Key"
          />
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave} disabled={!localApiKey.trim()}>
              Save Key
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;