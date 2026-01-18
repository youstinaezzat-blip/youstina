
import React, { useState, useRef } from 'react';
import { 
  Settings, X, Save, Copy, Image as ImageIcon, Download, 
  RefreshCw, CheckCircle2, Database, FileText, Clipboard, UploadCloud,
  ShieldCheck, HardDrive, FileJson
} from 'lucide-react';

interface AdminPanelProps {
  content: any;
  onUpdate: (newContent: any) => void;
  isAdminMode: boolean;
  setAdminMode: (mode: boolean) => void;
  onReset: () => void;
  lastSaved: Date | null;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ content, onUpdate, isAdminMode, setAdminMode, onReset, lastSaved }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'visual' | 'backup'>('visual');
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [backupJson, setBackupJson] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (path: string, value: string) => {
    const newContent = JSON.parse(JSON.stringify(content));
    const keys = path.split('.');
    let current = newContent;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    onUpdate(newContent);
  };

  const forceManualSync = () => {
    localStorage.setItem('gem_persistence_v3', JSON.stringify(content));
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 2000);
  };

  const downloadConfig = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "gem_luxury_config_backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const copyConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(content, null, 2));
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 2000);
  };

  const importConfig = () => {
    try {
      const parsed = JSON.parse(backupJson);
      onUpdate(parsed);
      alert("Configuration restored successfully.");
      setBackupJson('');
    } catch (e) {
      alert("Invalid backup data. Please check and try again.");
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[101] w-14 h-14 bg-[#c5a059] text-black rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(197,160,89,0.4)] hover:scale-110 active:scale-95 transition-all group"
      >
        <Settings size={28} className={isOpen ? 'rotate-90' : 'group-hover:rotate-45 transition-transform duration-500'} />
      </button>

      <div className={`fixed inset-y-0 right-0 w-80 md:w-96 bg-stone-950 border-l border-white/10 z-[102] transform transition-transform duration-500 shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/10 bg-black/40">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[#c5a059] font-serif text-xl tracking-wide uppercase">Master Console</h2>
              <button onClick={() => setIsOpen(false)} className="text-stone-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex bg-stone-900/50 p-1 rounded-lg">
              <button 
                onClick={() => setActiveTab('visual')}
                className={`flex-1 py-2 text-[9px] font-bold uppercase tracking-[0.2em] rounded-md transition-all ${activeTab === 'visual' ? 'bg-[#c5a059] text-black' : 'text-stone-500 hover:text-stone-300'}`}
              >
                Visual Edit
              </button>
              <button 
                onClick={() => setActiveTab('backup')}
                className={`flex-1 py-2 text-[9px] font-bold uppercase tracking-[0.2em] rounded-md transition-all ${activeTab === 'backup' ? 'bg-[#c5a059] text-black' : 'text-stone-500 hover:text-stone-300'}`}
              >
                Safety Backup
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
            {activeTab === 'visual' ? (
              <>
                {/* MANUAL SYNC BUTTON - PRIMARY FOCUS */}
                <div className="space-y-4">
                  <button 
                    onClick={forceManualSync}
                    className={`w-full py-5 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 transition-all group shadow-xl ${showSaveSuccess ? 'bg-green-600/20 border-green-500 text-green-500' : 'bg-[#c5a059] border-[#c5a059] text-black hover:brightness-110'}`}
                  >
                    {showSaveSuccess ? <CheckCircle2 size={24} /> : <ShieldCheck size={24} className="group-hover:scale-110 transition-transform" />}
                    <span className="text-[11px] font-black uppercase tracking-[0.25em]">
                      {showSaveSuccess ? 'Vault Updated' : 'Sync to Browser Vault'}
                    </span>
                    <span className="text-[8px] opacity-70 uppercase font-bold tracking-widest">Ensures edits persist on refresh</span>
                  </button>
                  
                  <div className="bg-[#c5a059]/5 p-5 rounded-2xl border border-[#c5a059]/10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059]">On-Page Editing</span>
                      <button onClick={() => setAdminMode(!isAdminMode)} className={`w-12 h-6 rounded-full transition-all relative ${isAdminMode ? 'bg-[#c5a059]' : 'bg-stone-700'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isAdminMode ? 'left-7' : 'left-1'}`} />
                      </button>
                    </div>
                    <p className="text-[10px] text-stone-500 leading-relaxed italic">
                      {isAdminMode ? "Mode: ON. Click and type anywhere to edit." : "Turn this ON to edit text directly on the page."}
                    </p>
                  </div>
                </div>

                <div className="space-y-6 pt-4">
                  <div className="flex items-center gap-2 text-[#c5a059]">
                    <ImageIcon size={18} />
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">Asset Links</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[9px] text-stone-500 uppercase font-bold tracking-widest mb-2 block">Brand Logo URL</label>
                      <input 
                        type="text" 
                        defaultValue={content.brand.logoUrl}
                        onBlur={(e) => handleInputChange('brand.logoUrl', e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl p-3 text-[10px] text-stone-300 focus:border-[#c5a059] outline-none" 
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-stone-500 uppercase font-bold tracking-widest mb-2 block">Hero Image URL</label>
                      <input 
                        type="text" 
                        defaultValue={content.hero.backgroundImage} 
                        onBlur={(e) => handleInputChange('hero.backgroundImage', e.target.value)} 
                        className="w-full bg-black border border-white/10 rounded-xl p-3 text-[10px] text-stone-300 focus:border-[#c5a059] outline-none" 
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-8 animate-fadeIn">
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059] flex items-center gap-2">
                    <HardDrive size={14} /> Ultimate Safety: Download File
                  </h3>
                  <p className="text-[10px] text-stone-500 leading-relaxed">
                    Download your entire design to your computer. This file is your 100% guarantee against data loss.
                  </p>
                  <button 
                    onClick={downloadConfig}
                    className="w-full py-4 bg-stone-900 border border-white/10 rounded-xl flex items-center justify-center gap-3 text-[#c5a059] hover:bg-stone-800 transition-all text-[10px] font-bold uppercase tracking-widest shadow-lg"
                  >
                    <FileJson size={18} /> Download Design File (.json)
                  </button>
                </div>

                <div className="space-y-4 pt-8 border-t border-white/5">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-amber-500 flex items-center gap-2">
                    <Clipboard size={14} /> Option 2: Clipboard Backup
                  </h3>
                  <button 
                    onClick={copyConfig}
                    className="w-full py-4 bg-stone-900 border border-white/10 rounded-xl flex items-center justify-center gap-3 text-stone-300 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest"
                  >
                    {showSaveSuccess ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
                    {showSaveSuccess ? 'Config Copied!' : 'Copy to Clipboard'}
                  </button>
                </div>

                <div className="space-y-4 pt-8 border-t border-white/5">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-300 flex items-center gap-2">
                    <UploadCloud size={14} /> Restore from Text
                  </h3>
                  <textarea 
                    value={backupJson}
                    onChange={(e) => setBackupJson(e.target.value)}
                    placeholder="Paste your JSON backup text here..."
                    className="w-full h-32 bg-black border border-white/10 rounded-xl p-4 text-[9px] font-mono text-stone-400 focus:border-[#c5a059] outline-none resize-none"
                  />
                  <button 
                    onClick={importConfig}
                    disabled={!backupJson}
                    className="w-full py-4 bg-amber-600/20 border border-amber-600/40 text-amber-500 rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-amber-600/30 transition-all disabled:opacity-20"
                  >
                    Apply Restored Design
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-white/10 bg-black/80 space-y-4">
            <div className="flex justify-between items-center text-[8px] uppercase tracking-widest text-stone-500 px-1">
              <span>Cloud Vault Status:</span>
              <span className="text-green-500 flex items-center gap-1 font-black">
                <CheckCircle2 size={10} /> {lastSaved ? `Verified at ${lastSaved.toLocaleTimeString()}` : 'Syncing...'}
              </span>
            </div>
            <button onClick={onReset} className="w-full py-3 border border-red-500/20 text-red-500 text-[9px] font-bold uppercase tracking-widest hover:bg-red-500/5 transition-all rounded-xl">
              <RefreshCw size={12} className="inline mr-2" /> Reset Factory Settings
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
