import React, { useState, useEffect, useMemo } from 'react';
import { 
  Video, 
  Sparkles, 
  Copy, 
  RefreshCw, 
  Trash2, 
  Camera, 
  Sun, 
  Palette, 
  Move, 
  MapPin, 
  Smile, 
  ChevronRight,
  Check,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

interface PromptCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  options: string[];
}

const CATEGORIES: PromptCategory[] = [
  {
    id: 'subject',
    label: 'Subject',
    icon: <Video className="w-4 h-4" />,
    placeholder: 'e.g., A majestic dragon, a futuristic robot...',
    options: ['A cybernetic samurai', 'A bioluminescent jellyfish', 'A vintage steam engine', 'An astronaut in a garden', 'A golden retriever puppy']
  },
  {
    id: 'action',
    label: 'Action',
    icon: <Move className="w-4 h-4" />,
    placeholder: 'e.g., flying through clouds, dancing in rain...',
    options: ['slowly dissolving into sand', 'sprinting through a neon city', 'floating in zero gravity', 'emerging from a portal', 'weaving through traffic']
  },
  {
    id: 'setting',
    label: 'Setting',
    icon: <MapPin className="w-4 h-4" />,
    placeholder: 'e.g., cyberpunk city, ancient forest...',
    options: ['in a rain-slicked Tokyo alley', 'atop a floating mountain', 'inside a crystal cave', 'on a desolate Martian plain', 'within a Victorian library']
  },
  {
    id: 'style',
    label: 'Style',
    icon: <Palette className="w-4 h-4" />,
    placeholder: 'e.g., cinematic, anime, 3D render...',
    options: ['Cinematic film noir', 'Studio Ghibli style', 'Hyper-realistic 8K', 'Vaporwave aesthetic', 'Surrealist oil painting']
  },
  {
    id: 'camera',
    label: 'Camera',
    icon: <Camera className="w-4 h-4" />,
    placeholder: 'e.g., drone shot, close-up, panning...',
    options: ['Slow motion tracking shot', 'Extreme close-up macro', 'Wide angle drone view', 'Handheld shaky cam', '360-degree orbit']
  },
  {
    id: 'lighting',
    label: 'Lighting',
    icon: <Sun className="w-4 h-4" />,
    placeholder: 'e.g., golden hour, neon glow, dramatic...',
    options: ['Soft golden hour light', 'Harsh neon flickering', 'Volumetric god rays', 'Soft moonlight', 'High-contrast chiaroscuro']
  },
  {
    id: 'mood',
    label: 'Mood',
    icon: <Smile className="w-4 h-4" />,
    placeholder: 'e.g., melancholic, epic, peaceful...',
    options: ['Ethereal and dreamlike', 'Tense and suspenseful', 'Joyful and vibrant', 'Dark and gritty', 'Peaceful and serene']
  }
];

export default function App() {
  const [promptParts, setPromptParts] = useState<Record<string, string>>({
    subject: '',
    action: '',
    setting: '',
    style: '',
    camera: '',
    lighting: '',
    mood: ''
  });
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState('subject');

  const fullPrompt = useMemo(() => {
    return Object.values(promptParts)
      .filter(part => part.trim() !== '')
      .join(', ');
  }, [promptParts]);

  const handleInputChange = (id: string, value: string) => {
    setPromptParts(prev => ({ ...prev, [id]: value }));
  };

  const clearPrompt = () => {
    setPromptParts({
      subject: '',
      action: '',
      setting: '',
      style: '',
      camera: '',
      lighting: '',
      mood: ''
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const enhanceWithAI = async () => {
    if (!fullPrompt) return;
    setIsEnhancing(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Enhance this video generation prompt to be more descriptive, cinematic, and detailed. Keep it concise but powerful. Original prompt: "${fullPrompt}"`,
        config: {
          systemInstruction: "You are an expert AI video prompt engineer. Your goal is to take simple descriptions and turn them into high-quality, professional prompts for models like Veo or Sora. Focus on visual details, lighting, camera movement, and texture.",
        }
      });
      
      const enhanced = response.text || '';
      // We'll just put the whole enhanced prompt into the subject for now or split it?
      // Let's just update the subject and clear others for a "clean" enhanced result
      setPromptParts({
        subject: enhanced,
        action: '',
        setting: '',
        style: '',
        camera: '',
        lighting: '',
        mood: ''
      });
    } catch (error) {
      console.error("AI Enhancement failed:", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A] font-sans selection:bg-[#1A1A1A] selection:text-white">
      {/* Header */}
      <header className="border-b border-[#E5E5E5] bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1A1A1A] rounded-lg flex items-center justify-center">
              <Video className="text-white w-5 h-5" />
            </div>
            <h1 className="text-lg font-semibold tracking-tight uppercase">Prompt Builder</h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={clearPrompt}
              className="p-2 hover:bg-red-50 text-red-600 rounded-full transition-colors"
              title="Clear all"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Categories & Inputs */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E5E5] overflow-hidden">
            <div className="flex border-b border-[#E5E5E5] overflow-x-auto no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                    activeCategory === cat.id 
                      ? 'border-[#1A1A1A] text-[#1A1A1A]' 
                      : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="p-8">
              <AnimatePresence mode="wait">
                {CATEGORIES.map((cat) => activeCategory === cat.id && (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                        {cat.label} Description
                      </label>
                      <textarea
                        value={promptParts[cat.id]}
                        onChange={(e) => handleInputChange(cat.id, e.target.value)}
                        placeholder={cat.placeholder}
                        className="w-full h-32 p-4 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/5 focus:border-[#1A1A1A] transition-all resize-none text-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                        Quick Presets
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {cat.options.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleInputChange(cat.id, option)}
                            className="px-4 py-2 bg-white border border-[#E5E5E5] hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white rounded-full text-sm transition-all duration-200"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-[#1A1A1A] text-white p-6 rounded-2xl flex items-start gap-4">
            <div className="bg-white/10 p-2 rounded-lg">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Pro Tip</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Start with a strong subject and action. Use lighting and camera angles to define the cinematic quality. The AI Enhancer works best when you provide at least a subject and a setting.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Preview & Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E5E5] p-6 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">Final Prompt</h2>
              <div className="flex gap-2">
                <button 
                  onClick={copyToClipboard}
                  className={`p-2 rounded-lg transition-all ${copied ? 'bg-green-50 text-green-600' : 'hover:bg-gray-100 text-gray-600'}`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="min-h-[200px] p-4 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl text-lg leading-relaxed mb-6 break-words">
              {fullPrompt || <span className="text-gray-300 italic">Start building your prompt...</span>}
            </div>

            <div className="space-y-3">
              <button
                disabled={!fullPrompt || isEnhancing}
                onClick={enhanceWithAI}
                className="w-full py-4 bg-[#1A1A1A] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#1A1A1A]/10 active:scale-[0.98]"
              >
                {isEnhancing ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Sparkles className="w-5 h-5" />
                )}
                {isEnhancing ? 'Enhancing...' : 'Enhance with AI'}
              </button>
              
              <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">
                Powered by Gemini 3 Flash
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-[#E5E5E5]">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => handleInputChange('style', 'Cinematic 8K, highly detailed')}
                  className="p-3 text-xs border border-[#E5E5E5] rounded-lg hover:border-[#1A1A1A] transition-all text-left"
                >
                  Apply 8K Style
                </button>
                <button 
                  onClick={() => handleInputChange('camera', 'Slow motion, 120fps')}
                  className="p-3 text-xs border border-[#E5E5E5] rounded-lg hover:border-[#1A1A1A] transition-all text-left"
                >
                  Slow Motion
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 py-12 border-t border-[#E5E5E5] mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">© 2026 Video Prompt Builder. Built for creators.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-400 hover:text-[#1A1A1A] transition-colors">Documentation</a>
            <a href="#" className="text-sm text-gray-400 hover:text-[#1A1A1A] transition-colors">Best Practices</a>
            <a href="#" className="text-sm text-gray-400 hover:text-[#1A1A1A] transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
