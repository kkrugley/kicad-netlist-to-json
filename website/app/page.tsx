'use client';

import { useState } from 'react';
import { Circuitry } from '@phosphor-icons/react';
import { FileUploader } from '@/components/file-uploader';
import { ProcessingLoader } from '@/components/processing-loader';
import { ResultPreview } from '@/components/result-preview';

type AppState = 'idle' | 'uploading' | 'processing' | 'result' | 'error';

interface ConversionResult {
  components?: unknown;
  nets?: unknown;
  library?: unknown;
  [key: string]: unknown;
}

export default function Home() {
  const [state, setState] = useState<AppState>('idle');
  const [fileName, setFileName] = useState<string>('');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileSelect = async (file: File) => {
    setFileName(file.name);
    setState('uploading');

    try {
      const formData = new FormData();
      formData.append('file', file);

      setState('processing');

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Conversion failed');
      }

      const data = await response.json();
      setResult(data);
      setState('result');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setState('error');
    }
  };

  const handleReset = () => {
    setState('idle');
    setFileName('');
    setResult(null);
    setError('');
  };

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-6">
      <div className="flex items-center gap-3 mb-4">
        <Circuitry size={40} weight="fill" className="text-primary" />
        <h1 className="text-2xl font-semibold">KiCad Netlist to JSON</h1>
      </div>

      {state === 'idle' && (
        <FileUploader onFileSelect={handleFileSelect} />
      )}

      {state === 'uploading' && (
        <ProcessingLoader fileName={fileName} />
      )}

      {state === 'processing' && (
        <ProcessingLoader fileName={fileName} />
      )}

      {state === 'result' && result && (
        <ResultPreview
          data={result}
          fileName={fileName}
          onReset={handleReset}
        />
      )}

      {state === 'error' && (
        <div className="w-full max-w-md p-4 rounded-lg bg-destructive/10 border border-destructive text-destructive text-center">
          <p>{error}</p>
          <button
            onClick={handleReset}
            className="mt-4 text-sm underline"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}