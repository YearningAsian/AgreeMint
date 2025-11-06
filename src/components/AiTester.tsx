import React, { useState } from 'react';
import chatWithGemini, { streamChatWithGemini } from '../utils/ai';

const AiTester: React.FC = () => {
  const [prompt, setPrompt] = useState('Summarize this contract in plain English.');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useStream, setUseStream] = useState<boolean>(false);

  const handleAsk = async () => {
    setError(null);
    setResponse('');
    setLoading(true);
    try {
      if (useStream) {
        // stream parts and append to response
        for await (const part of streamChatWithGemini(prompt)) {
          setResponse((prev) => prev + part);
        }
      } else {
        const res = await chatWithGemini(prompt);
        setResponse(res);
      }
    } catch (err: any) {
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white/90 p-6 rounded-2xl border border-black mt-8">
      <h3 className="text-2xl md:text-3xl font-bold mb-4">Ask Gemini 2.5 Pro</h3>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        className="w-full p-3 border rounded-md mb-3"
      />
      <div className="flex gap-3 items-center">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={useStream} onChange={(e) => setUseStream(e.target.checked)} />
          <span className="text-sm">Stream response</span>
        </label>
        <button onClick={handleAsk} disabled={loading} className="px-6 py-3 bg-black text-white rounded-full">
          {loading ? 'Thinking…' : 'Ask Gemini 2.5 Pro'}
        </button>
        {error && <div className="text-red-600">{error}</div>}
      </div>
      <div className="mt-4">
        <h4 className="text-lg font-semibold">Response</h4>
        <div className="whitespace-pre-wrap mt-2 p-3 bg-gray-50 rounded-md min-h-[4rem]">
          {response || (loading ? 'Waiting for response…' : 'No response yet')}
        </div>
      </div>
    </div>
  );
};

export default AiTester;
