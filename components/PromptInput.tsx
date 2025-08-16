import React from 'react';

interface PromptInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  rows?: number;
}

const PromptInput = ({ label, name, value, onChange, placeholder, rows = 2 }: PromptInputProps): React.ReactNode => {
  return (
    <div className="flex flex-col gap-2 animate-fade-in">
      <label htmlFor={name} className="font-semibold text-slate-200">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-surface/50 border border-border rounded-lg p-3 text-slate-200 placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-200 text-base"
      />
    </div>
  );
};

export default PromptInput;