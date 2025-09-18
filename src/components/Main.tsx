// src/components/Main.tsx
import { useState } from 'react';

// A custom hook for a more complex state if needed in the future
const useContractProcessor = () => {
    const [mode, setMode] = useState('Complex');
    const [style, setStyle] = useState('Formal');
    
    // Placeholder for future logic
    const handleUpload = () => {
        console.log("Uploading contract...");
    };
    
    const handleDownload = () => {
        console.log(`Downloading summary with Mode: ${mode}, Style: ${style}`);
    };

    return {
        mode,
        setMode,
        style,
        setStyle,
        handleUpload,
        handleDownload
    };
};


// Radio button component for mode selection
const ModeRadio = ({ name, value, label, checked, onChange }) => (
    <label className="flex flex-col items-center space-y-2 cursor-pointer text-xl md:text-3xl lg:text-4xl font-normal">
        <span>{label}</span>
        <div className="relative">
            <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-black flex items-center justify-center transition-colors duration-200 ${checked ? 'bg-black' : 'bg-white'}`}>
                {checked && <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-white"></div>}
            </div>
        </div>
    </label>
);

export default function Main() {
    const { mode, setMode, style, setStyle, handleUpload, handleDownload } = useContractProcessor();
    const modes = ['Complex', 'Thorough', 'Medium', 'Basic'];

    return (
        <div data-layer="Main" className="Main w-full min-h-screen relative bg-white overflow-x-hidden font-['Noto_Sans_JP'] text-black p-4 sm:p-6 md:p-8">
            
            {/* Upload Section */}
            <div 
                onClick={handleUpload}
                className="w-full lg:w-3/4 xl:w-1/2 mx-auto mb-8 p-8 flex flex-col items-center justify-center h-56 bg-white/10 rounded-[30px] border-[5px] border-black border-dashed cursor-pointer hover:bg-gray-50 transition-colors"
            >
                <h1 className="text-center text-3xl md:text-4xl lg:text-6xl font-normal mb-2">
                    Click here to upload contract
                </h1>
                <p className="text-xl md:text-2xl lg:text-4xl font-normal text-gray-600">
                    PDF, DOCX, TXT
                </p>
            </div>

            {/* Main Content Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Uploaded Contract Panel */}
                <div className="w-full h-[936px] bg-white rounded-[30px] shadow-lg border-[5px] border-black p-6 flex flex-col">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Uploaded Contract</h2>
                    <div className="flex-grow bg-gray-50 rounded-lg p-4 text-gray-500">
                        {/* Content of the uploaded contract will be displayed here */}
                        <p>Your document content will appear here...</p>
                    </div>
                </div>

                {/* Analysis and Suggestions Panel */}
                <div className="w-full h-[936px] bg-white rounded-[30px] shadow-lg border-[5px] border-black p-6 flex flex-col relative">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Analysis and Suggestions</h2>
                    <div className="flex-grow bg-gray-50 rounded-lg p-4 text-gray-500">
                        {/* AI analysis and suggestions will be displayed here */}
                        <p>Analysis of your document will appear here...</p>
                    </div>
                    <button 
                        onClick={handleDownload}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 md:w-auto px-12 py-6 bg-white rounded-[50px] shadow-lg border-[3px] border-black text-2xl md:text-4xl font-bold hover:bg-gray-100 transition-transform duration-200 ease-in-out hover:scale-105"
                    >
                        Download Summary
                    </button>
                </div>
            </div>
            
            {/* Modes Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <h2 className="text-6xl md:text-8xl font-normal [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)]">
                    MODES
                </h2>

                <div className="w-full md:w-auto flex-grow flex items-center justify-center p-6 bg-white rounded-[100px] shadow-lg border border-black relative">
                    {/* Slider Line */}
                    <div className="w-[90%] h-2.5 bg-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-4"></div>
                    
                    <div className="w-full flex justify-between items-end z-10">
                         {modes.map(m => (
                            <ModeRadio key={m} name="mode" value={m} label={m} checked={mode === m} onChange={(e) => setMode(e.target.value)} />
                         ))}
                    </div>
                </div>

                <div className="flex flex-col space-y-4">
                    <button onClick={() => setStyle('Formal')} className={`w-60 h-24 bg-white rounded-[100px] shadow-lg border-2 border-black text-4xl md:text-5xl font-normal transition-transform duration-200 ease-in-out hover:scale-105 ${style === 'Formal' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
                        Formal
                    </button>
                    <button onClick={() => setStyle('Casual')} className={`w-60 h-24 bg-white rounded-[100px] shadow-lg border-2 border-black text-4xl md:text-5xl font-normal transition-transform duration-200 ease-in-out hover:scale-105 ${style === 'Casual' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
                        Casual
                    </button>
                </div>
            </div>
        </div>
    );
}