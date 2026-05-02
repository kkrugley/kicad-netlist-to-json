'use client';

import { useState, useRef } from 'react';
import { UploadSimple, File } from '@phosphor-icons/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export function FileUploader({ onFileSelect, disabled }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.net')) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.net')) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent className="pt-6">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative flex flex-col items-center justify-center w-full h-40 
            border-2 border-dashed rounded-lg cursor-pointer 
            transition-colors duration-200
            ${isDragging 
              ? 'border-primary bg-primary/5' 
              : 'border-muted-foreground/30 hover:border-primary/50'
            }
            ${disabled ? 'opacity-50 pointer-events-none' : ''}
          `}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".net"
            onChange={handleFileChange}
            className="hidden"
            disabled={disabled}
          />
          
          {selectedFile ? (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <File size={32} weight="fill" className="text-primary" />
              <span className="text-sm font-medium">{selectedFile.name}</span>
              <span className="text-xs text-muted-foreground">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <UploadSimple size={32} />
              <span className="text-sm">Drag & drop your .net file here</span>
              <span className="text-xs">or click to browse</span>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button
            onClick={() => inputRef.current?.click()}
            disabled={disabled}
            variant="outline"
          >
            Select File
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}