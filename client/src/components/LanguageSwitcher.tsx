import { useI18n, type Language } from '@/contexts/I18nContext';
import { Globe } from 'lucide-react';
import { useState } from 'react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; label: string; nativeLabel: string }[] = [
    { code: 'zh-CN', label: 'Simplified Chinese', nativeLabel: '简体中文' },
    { code: 'zh-TW', label: 'Traditional Chinese', nativeLabel: '繁體中文' },
    { code: 'en-US', label: 'English', nativeLabel: 'English' },
  ];

  const currentLang = languages.find((l) => l.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg card-glass border border-border hover:border-primary/50 transition-all duration-300"
        title="Select Language"
      >
        <Globe className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium">{currentLang?.nativeLabel}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 card-glass border border-border rounded-lg shadow-lg z-50 overflow-hidden">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left text-sm transition-all duration-200 ${
                language === lang.code
                  ? 'bg-primary/20 text-primary border-l-2 border-primary'
                  : 'hover:bg-primary/10 text-foreground'
              }`}
            >
              <div className="font-medium">{lang.nativeLabel}</div>
              <div className="text-xs text-secondary-foreground">{lang.label}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
