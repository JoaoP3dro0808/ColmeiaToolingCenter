import React from 'react';
import { X, Copy, FolderOpen } from 'lucide-react';

export default function FilePathModal({ isOpen, onClose, filePath, title }) {
  if (!isOpen) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(filePath);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Modal */}
      <div 
        className="relative bg-gradient-to-br from-teal-700 to-teal-900 rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-teal-600 p-2 rounded-lg">
              <FolderOpen size={24} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-teal-200 hover:text-white transition-colors p-1 hover:bg-teal-600 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <label className="text-teal-200 text-sm font-medium mb-2 block">
            Caminho do arquivo:
          </label>
          <div className="bg-teal-950/50 rounded-lg p-3 border border-teal-600/30">
            <p className="text-white font-mono text-sm break-all">
              {filePath}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={copyToClipboard}
            className="flex-1 bg-gradient-to-br from-teal-600 to-teal-800 hover:from-teal-500 hover:to-teal-700 text-white py-3 px-4 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <Copy size={18} />
            Copiar Caminho
          </button>
          <button
            onClick={onClose}
            className="bg-teal-800/50 hover:bg-teal-700/50 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}