import { useState, useEffect } from 'react';

export default function SplashScreen() {
  const [text, setText] = useState('');
  const fullText = 'Jack Machine';
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    if (index < fullText.length) {
      const timer = setTimeout(() => {
        setText((prevText) => prevText + fullText[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, 150);
      
      return () => clearTimeout(timer);
    }
  }, [index]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 text-white relative">
      <div className="flex items-center justify-center">
        <h1 className="text-5xl font-bold">
          {text}
          <span className="inline-block animate-pulse">|</span>
        </h1>
      </div>
      
      <div className="absolute bottom-6 right-6 text-sm opacity-80">
        Developed by: Dev Fab250
      </div>
    </div>
  );
}