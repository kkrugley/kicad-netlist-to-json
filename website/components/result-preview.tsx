'use client';

import { useState } from 'react';
import { FileJs, Download, ArrowCounterClockwise } from '@phosphor-icons/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ResultPreviewProps {
  data: unknown;
  fileName: string;
  onReset: () => void;
}

export function ResultPreview({ data, fileName, onReset }: ResultPreviewProps) {
  const [isCopied, setIsCopied] = useState(false);

  const jsonString = JSON.stringify(data, null, 2);
  const jsonSize = new Blob([jsonString]).size;

  const downloadJson = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName.replace('.net', '.json');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(jsonString);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileJs size={24} weight="fill" className="text-primary" />
          <CardTitle>Conversion Complete</CardTitle>
        </div>
        <CardDescription>
          {fileName.replace('.net', '.json')} ({(jsonSize / 1024).toFixed(1)} KB)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-64 text-xs font-mono">
            {jsonString.length > 2000 
              ? jsonString.slice(0, 2000) + '\n\n... (truncated for display)'
              : jsonString
            }
          </pre>
        </div>

        <div className="flex gap-2">
          <Button onClick={downloadJson} className="flex-1">
            <Download size={18} className="mr-2" />
            Download JSON
          </Button>
          <Button onClick={onReset} variant="outline">
            <ArrowCounterClockwise size={18} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}