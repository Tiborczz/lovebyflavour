import React, { createContext, useContext, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Eye, 
  EyeOff, 
  Keyboard, 
  Volume2, 
  Settings,
  Sun,
  Moon,
  Contrast
} from 'lucide-react';

interface AccessibilityContextType {
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: 'small' | 'medium' | 'large';
  screenReader: boolean;
  keyboardNavigation: boolean;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  toggleScreenReader: () => void;
  toggleKeyboardNavigation: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [screenReader, setScreenReader] = useState(false);
  const [keyboardNavigation, setKeyboardNavigation] = useState(true);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const savedPrefs = localStorage.getItem('accessibility-preferences');
    if (savedPrefs) {
      const prefs = JSON.parse(savedPrefs);
      setHighContrast(prefs.highContrast || false);
      setReducedMotion(prefs.reducedMotion || false);
      setFontSize(prefs.fontSize || 'medium');
      setScreenReader(prefs.screenReader || false);
      setKeyboardNavigation(prefs.keyboardNavigation !== false);
    }

    // Detect system preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setReducedMotion(true);
    }
  }, []);

  useEffect(() => {
    // Save preferences
    const prefs = {
      highContrast,
      reducedMotion,
      fontSize,
      screenReader,
      keyboardNavigation
    };
    localStorage.setItem('accessibility-preferences', JSON.stringify(prefs));

    // Apply CSS classes
    document.documentElement.classList.toggle('high-contrast', highContrast);
    document.documentElement.classList.toggle('reduced-motion', reducedMotion);
    document.documentElement.classList.toggle('screen-reader-optimized', screenReader);
    document.documentElement.setAttribute('data-font-size', fontSize);

    // Apply keyboard navigation styles
    if (keyboardNavigation) {
      document.documentElement.classList.add('keyboard-navigation');
    } else {
      document.documentElement.classList.remove('keyboard-navigation');
    }
  }, [highContrast, reducedMotion, fontSize, screenReader, keyboardNavigation]);

  const toggleHighContrast = () => setHighContrast(prev => !prev);
  const toggleReducedMotion = () => setReducedMotion(prev => !prev);
  const toggleScreenReader = () => setScreenReader(prev => !prev);
  const toggleKeyboardNavigation = () => setKeyboardNavigation(prev => !prev);

  const value = {
    highContrast,
    reducedMotion,
    fontSize,
    screenReader,
    keyboardNavigation,
    toggleHighContrast,
    toggleReducedMotion,
    setFontSize,
    toggleScreenReader,
    toggleKeyboardNavigation
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
      
      {/* Accessibility Panel Toggle */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setShowPanel(!showPanel)}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl"
          aria-label="Open accessibility settings"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Accessibility Panel */}
      {showPanel && (
        <div className="fixed bottom-20 right-4 z-50 animate-in slide-in-from-bottom">
          <Card className="w-80 bg-white/95 backdrop-blur-md shadow-2xl border border-purple-200/60">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-candy-cocoa-800 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Accessibility Settings
              </h3>

              <div className="space-y-4">
                {/* High Contrast */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Contrast className="w-4 h-4 text-candy-cocoa-600" />
                    <span className="text-sm font-medium text-candy-cocoa-700">High Contrast</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleHighContrast}
                    className={highContrast ? 'bg-purple-100 border-purple-300' : ''}
                  >
                    {highContrast ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                </div>

                {/* Font Size */}
                <div>
                  <label className="text-sm font-medium text-candy-cocoa-700 mb-2 block">Font Size</label>
                  <div className="flex gap-2">
                    {(['small', 'medium', 'large'] as const).map((size) => (
                      <Button
                        key={size}
                        variant="outline"
                        size="sm"
                        onClick={() => setFontSize(size)}
                        className={fontSize === size ? 'bg-purple-100 border-purple-300' : ''}
                      >
                        {size === 'small' && 'A'}
                        {size === 'medium' && 'A'}
                        {size === 'large' && 'A'}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Keyboard Navigation */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Keyboard className="w-4 h-4 text-candy-cocoa-600" />
                    <span className="text-sm font-medium text-candy-cocoa-700">Keyboard Focus</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleKeyboardNavigation}
                    className={keyboardNavigation ? 'bg-purple-100 border-purple-300' : ''}
                  >
                    {keyboardNavigation ? 'On' : 'Off'}
                  </Button>
                </div>

                {/* Reduced Motion */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4 text-candy-cocoa-600" />
                    <span className="text-sm font-medium text-candy-cocoa-700">Reduced Motion</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleReducedMotion}
                    className={reducedMotion ? 'bg-purple-100 border-purple-300' : ''}
                  >
                    {reducedMotion ? 'On' : 'Off'}
                  </Button>
                </div>

                {/* Screen Reader Optimized */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-candy-cocoa-600" />
                    <span className="text-sm font-medium text-candy-cocoa-700">Screen Reader Mode</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleScreenReader}
                    className={screenReader ? 'bg-purple-100 border-purple-300' : ''}
                  >
                    {screenReader ? 'On' : 'Off'}
                  </Button>
                </div>
              </div>

              <Button
                onClick={() => setShowPanel(false)}
                className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </AccessibilityContext.Provider>
  );
};

export default AccessibilityProvider;