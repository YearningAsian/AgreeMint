// src/components/Main.tsx
import React, { useState, useRef } from 'react';

// A custom hook for a more complex state if needed in the future
const useContractProcessor = () => {
    const [mode, setMode] = useState('Complex');
    const [style, setStyle] = useState('Formal');
    
    // Placeholder for future logic
    const handleDownload = () => {
        console.log(`Downloading summary with Mode: ${mode}, Style: ${style}`);
    };

    return {
        mode,
        setMode,
        style,
        setStyle,
        handleDownload
    };
};



// Radio button component for mode selection
const ModeRadio = ({ name, value, label, checked, onChange }) => (
    <label className="flex flex-col items-center space-y-2 cursor-pointer text-lg md:text-2xl lg:text-3xl font-normal z-10">
        <span className="bg-white px-2 h-10 flex items-center">{label}</span>
        <div className="relative">
            <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
            <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-black flex items-center justify-center transition-colors duration-200 ${checked ? 'bg-black' : 'bg-white'}`}>
                {checked && <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-white"></div>}
            </div>
        </div>
    </label>
);

export default function Main() {
    const { mode, setMode, style, setStyle, handleDownload } = useContractProcessor();
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const modes = [
        { label: 'Complex', value: 'Complex' },
        { label: '', value: 'Thorough' },
        { label: '', value: 'Medium' },
        { label: 'Basic', value: 'Basic' },
    ];

    const processFile = (file) => {
        const allowedExtensions = ['.pdf', '.docx', '.txt'];
        const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();

        if (allowedExtensions.includes(fileExtension)) {
             console.log("File accepted:", file.name);
             // Logic to read/upload file goes here.
        } else {
             console.log("Invalid file type:", file.name);
             // You could set an error state here to inform the user.
        }
    };
    
    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation(); // Necessary to allow dropping
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            processFile(files[0]);
        }
    };
    
    const handleFileSelect = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            processFile(files[0]);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div data-layer="Main" className="Main w-full min-h-screen relative bg-white overflow-x-hidden font-['Noto_Sans_JP'] text-black py-4 sm:py-6 md:py-8 px-8 sm:px-12 md:px-16">
            
            {/* Upload Section */}
            <div 
                onClick={handleUploadClick}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`w-full lg:w-3/4 xl:w-1/2 mx-auto mb-8 p-8 flex flex-col items-center justify-center h-56 rounded-[30px] border-[5px] border-black border-dashed cursor-pointer transition-colors duration-200 ${isDragging ? 'bg-blue-100 border-blue-500' : 'bg-white/10 hover:bg-gray-50'}`}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="hidden"
                    accept=".pdf,.docx,.txt"
                />
                <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-normal mb-2 pointer-events-none">
                    Click here or drop contract to upload!
                </h1>
                <p className="text-xl md:text-2xl lg:text-4xl font-normal text-gray-600 pointer-events-none">
                    PDF, DOCX, TXT
                </p>
            </div>

            {/* Main Content Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Uploaded Contract Panel */}
                <div className="w-full h-[936px] bg-white rounded-[30px] shadow-lg border-[5px] border-black p-6 flex flex-col">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Uploaded Contract</h2>
                    <div className="flex-grow bg-gray-50 rounded-lg p-4 text-gray-500">
                        {/* Content of the uploaded contract will be displayed here */}
                        <p>Your document content will appear here...</p>
                    </div>
                </div>

                {/* Analysis and Suggestions Panel */}
                <div className="w-full h-[936px] bg-white rounded-[30px] shadow-lg border-[5px] border-black p-6 flex flex-col relative">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Analysis and Suggestions</h2>
                    <div className="flex-grow bg-gray-50 rounded-lg p-4 text-gray-500">
                        {/* AI analysis and suggestions will be displayed here */}
                        <p>Analysis of your document will appear here...</p>
                    </div>
                    <button 
                        onClick={handleDownload}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-auto px-8 py-4 bg-white rounded-[50px] shadow-lg border-[3px] border-black text-xl md:text-2xl font-bold hover:bg-gray-100 transition-transform duration-200 ease-in-out hover:scale-105 whitespace-nowrap"
                    >
                        Download Summary
                    </button>
                </div>
            </div>
            
            {/* Modes Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <h2 className="text-5xl md:text-7xl font-normal [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)]">
                    MODES
                </h2>

                <div className="w-full md:w-auto flex-grow flex items-center justify-center p-6 bg-white rounded-[100px] shadow-lg border border-black">
                    <div className="w-full flex justify-between items-end relative px-10">
                         {/* Slider Line */}
                        <div className="h-2.5 bg-black absolute top-1/2 left-10 right-10 -translate-y-1/2 mt-4"></div>
                         {modes.map(m => (
                            <ModeRadio key={m.value} name="mode" value={m.value} label={m.label} checked={mode === m.value} onChange={(e) => setMode(e.target.value)} />
                         ))}
                    </div>
                </div>

                <div className="flex flex-col space-y-4">
                    <button onClick={() => setStyle('Formal')} className={`w-48 h-20 bg-white rounded-[100px] shadow-lg border-2 border-black text-3xl md:text-4xl font-normal transition-transform duration-200 ease-in-out hover:scale-105 ${style === 'Formal' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
                        Formal
                    </button>
                    <button onClick={() => setStyle('Casual')} className={`w-48 h-20 bg-white rounded-[100px] shadow-lg border-2 border-black text-3xl md:text-4xl font-normal transition-transform duration-200 ease-in-out hover:scale-105 ${style === 'Casual' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
                        Casual
                    </button>
                </div>
            </div>
        </div>
    );
}