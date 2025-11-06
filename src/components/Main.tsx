<<<<<<< HEAD
// src/components/Main.tsx
import React, { useState, useRef } from 'react';
// AiTester removed — analysis now runs automatically when a file is uploaded
import extractTextFromFile from '../utils/fileText';

// Props for ModeRadio
type ModeRadioProps = {
    name: string;
    value: string;
    label: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
=======
import { useState, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Use this new line to point to your local worker file
pdfjsLib.GlobalWorkerOptions.workerSrc = '../../public/pdf.worker.min.mjs';
>>>>>>> 34e8781187786b8d044639fc924c1cd3cd5bd788

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
const ModeRadio: React.FC<ModeRadioProps> = ({ name, value, label, checked, onChange }) => (
    <label className="flex items-center space-x-3 cursor-pointer text-xl md:text-3xl lg:text-5xl font-normal">
        <span className="bg-white px-2 h-10 flex items-center">{label}</span>
        <div className="relative">
            <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border border-black flex items-center justify-center transition-colors duration-200 ${checked ? 'bg-black' : 'bg-white'}`}>
                {checked && <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-white"></div>}
            </div>
        </div>
    </label>
);

export default function Main() {
    const { mode, setMode, style, setStyle, handleDownload } = useContractProcessor();
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [contractText, setContractText] = useState('');
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const modes = [
        { label: 'Complex', value: 'Complex' },
        { label: '', value: 'Thorough' },
        { label: '', value: 'Medium' },
        { label: 'Basic', value: 'Basic' },
    ];
    const [uploadedText, setUploadedText] = useState<string>('');
    const [uploadedName, setUploadedName] = useState<string | null>(null);
    const [analysisText, setAnalysisText] = useState<string>('');
    const [analysisLoading, setAnalysisLoading] = useState<boolean>(false);
    const [analysisError, setAnalysisError] = useState<string | null>(null);

<<<<<<< HEAD
    const processFile = async (file: File) => {
        const allowedExtensions = ['.pdf', '.docx', '.txt'];
        const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
            setAnalysisError('Invalid file type. Supported: .pdf, .docx, .txt');
            return;
        }

        try {
            setAnalysisError(null);
            setUploadedName(file.name);
            setUploadedText('Extracting text...');
            const text = await extractTextFromFile(file);
            setUploadedText(text || '(no text extracted)');
            // Do NOT call AI here automatically. Wait for explicit user action (Analyze button).
        } catch (err: any) {
            setAnalysisError(err?.message || String(err));
        } finally {
            // keep analysis loading false; analysis starts when user clicks Analyze
        }
    };

    // Trigger analysis when user clicks the Analyze button
    const analyzeUploaded = async () => {
        if (!uploadedText) {
            setAnalysisError('No uploaded document to analyze.');
            return;
        }

        try {
            setAnalysisError(null);
            setAnalysisText('');
            setAnalysisLoading(true);

            const prompt = `Analyze the following contract and provide a concise summary of key clauses, potential risks, and suggested edits. Output in ${style} style and ${mode} complexity.\n\nContract:\n${uploadedText}`;

            // Send the extracted text to the server proxy which will call Gemini.
            const resp = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: prompt })
            });

            if (!resp.ok) {
                const txt = await resp.text();
                throw new Error(`Server error: ${resp.status} ${txt}`);
            }

            const data = await resp.json();
            setAnalysisText(data.analysis || JSON.stringify(data));
        } catch (err: any) {
            setAnalysisError(err?.message || String(err));
        } finally {
            setAnalysisLoading(false);
=======
    const getAnalysis = async (text, analysisMode, analysisStyle) => {
        setIsLoading(true);
        setAnalysis('');

        console.log("Sending text to AI for analysis:", { analysisMode, analysisStyle });

        // --- REPLACE THIS SIMULATION WITH A REAL API CALL ---
        await new Promise(resolve => setTimeout(resolve, 2000));
        const mockAnalysis = `This is a mock AI analysis in a ${analysisStyle} style and ${analysisMode} complexity. The document appears to be a standard non-disclosure agreement with clauses covering confidential information, obligations of the receiving party, and term duration. Key areas to review include the definition of "Confidential Information" and the specified term length of the agreement.`;
        // ---------------------------------------------------

        setAnalysis(mockAnalysis);
        setIsLoading(false);
    };

    const processFile = (file) => {
        const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();

        if (fileExtension === '.pdf') {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const typedArray = new Uint8Array(event.target.result as ArrayBuffer);
                try {
                    const pdf = await pdfjsLib.getDocument(typedArray).promise;
                    let fullText = '';
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();
                        fullText += textContent.items.map(item => (item as any).str).join(' ') + '\n';
                    }
                    setContractText(fullText);
                    getAnalysis(fullText, mode, style);
                } catch (error) {
                    console.error("Error parsing PDF:", error);
                    setContractText("Could not read the PDF file.");
                }
            };
            reader.readAsArrayBuffer(file);
        } else if (fileExtension === '.txt') {
             const reader = new FileReader();
             reader.onload = (event) => {
                const text = event.target.result as string;
                setContractText(text);
                getAnalysis(text, mode, style);
             }
             reader.readAsText(file);
        }
        else {
             setContractText(`File type "${fileExtension}" is not yet supported.`);
>>>>>>> 34e8781187786b8d044639fc924c1cd3cd5bd788
        }
    };
    
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            processFile(files[0]);
        }
    };
    
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            processFile(files[0]);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
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
                    accept=".pdf,.txt"
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
<<<<<<< HEAD
                    <div className="flex-grow bg-gray-50 rounded-lg p-4 text-gray-700 overflow-auto">
                        {/* Display extracted uploaded contract text */}
                        {uploadedName && <div className="mb-2 text-sm text-gray-500">{uploadedName}</div>}
                        <div className="whitespace-pre-wrap text-sm md:text-base">{uploadedText || 'No document uploaded yet.'}</div>
=======
                    <div className="flex-grow bg-gray-50 rounded-lg p-4 overflow-auto">
                        <pre className="whitespace-pre-wrap text-sm text-gray-700">{contractText || "Your document content will appear here..."}</pre>
>>>>>>> 34e8781187786b8d044639fc924c1cd3cd5bd788
                    </div>
                </div>

                {/* Analysis and Suggestions Panel */}
                <div className="w-full h-[936px] bg-white rounded-[30px] shadow-lg border-[5px] border-black p-6 flex flex-col relative">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Analysis and Suggestions</h2>
<<<<<<< HEAD
                    <div className="flex-grow bg-gray-50 rounded-lg p-4 text-gray-700 overflow-auto">
                        {/* AI analysis and suggestions will be displayed here */}
                        {analysisError && <div className="text-red-600">{analysisError}</div>}
                        {analysisLoading && <div className="text-sm text-gray-500">Analyzing document…</div>}
                        <div className="whitespace-pre-wrap text-sm md:text-base mt-2">{analysisText || (analysisLoading ? '' : 'Analysis of your document will appear here...')}</div>

                        {/* Analyze button: explicit user action to start AI analysis (prevents unexpected pop-ups) */}
                        <div className="mt-4">
                            <button onClick={analyzeUploaded} disabled={!uploadedText || analysisLoading} className="px-6 py-3 bg-black text-white rounded-full">
                                {analysisLoading ? 'Analyzing…' : 'Analyze Document'}
                            </button>
                        </div>
=======
                    <div className="flex-grow bg-gray-50 rounded-lg p-4 overflow-auto">
                        <p className="whitespace-pre-wrap text-sm text-gray-700">
                            {isLoading ? "Analyzing..." : (analysis || "Analysis of your document will appear here...")}
                        </p>
>>>>>>> 34e8781187786b8d044639fc924c1cd3cd5bd788
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
                             <ModeRadio key={m.value} name="mode" value={m.value} label={m.label} checked={mode === m.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMode(e.target.value)} />
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
            
            {/* Analysis runs automatically when a file is uploaded. */}
        </div>
    );
}