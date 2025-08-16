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
      <label htmlFor={name} className="font-medium text-slate-300">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
      />
    </div>
  );
};

export default PromptInput;