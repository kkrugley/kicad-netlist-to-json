'use client';

import { SpinnerGap } from '@phosphor-icons/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProcessingLoaderProps {
  fileName?: string;
}

export function ProcessingLoader({ fileName }: ProcessingLoaderProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">Converting Netlist</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 py-8">
        <SpinnerGap 
          size={48} 
          className="animate-spin text-primary" 
        />
        <p className="text-muted-foreground text-center">
          {fileName ? `Processing ${fileName}...` : 'Processing your file...'}
        </p>
      </CardContent>
    </Card>
  );
}