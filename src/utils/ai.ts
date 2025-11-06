// Deprecated: Puter client wrapper removed. The project now proxies requests to Gemini via a local server.
// Keep this file as a harmless placeholder in case imports remain. Do NOT use Puter client-side.
export async function chatWithGemini(_: string): Promise<string> {
  throw new Error('Puter client removed. Use server-side Gemini proxy /api/analyze instead.');
}

export async function* streamChatWithGemini(_: string): AsyncGenerator<string, void, unknown> {
  throw new Error('Puter client removed. Use server-side Gemini proxy /api/analyze instead.');
}

export default chatWithGemini;
