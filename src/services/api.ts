export async function summarizeText(text: string): Promise<string> {
  const res = await fetch('http://localhost:3001/process-text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),  // Make sure the key is 'text' as per the backend
  });

  if (!res.ok) throw new Error('Summarization failed');

  const data = await res.json();
  return data.processedText;  // Backend returns 'processedText'
}
