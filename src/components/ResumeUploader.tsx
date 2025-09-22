import React, { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface ResumeUploaderProps {
  onFileUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export const ResumeUploader: React.FC<ResumeUploaderProps> = ({
  onFileUpload,
  isAnalyzing
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileUpload(file);
    }
  }, []);

  const handleFileUpload = (file: File) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or Word document.",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive"
      });
      return;
    }

    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onFileUpload(file);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  if (isAnalyzing || uploadProgress > 0) {
    return (
      <Card className="score-card text-center">
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="text-lg font-medium">
              {uploadProgress < 100 ? 'Uploading...' : 'Analyzing your resume...'}
            </span>
          </div>
          <Progress value={uploadProgress < 100 ? uploadProgress : 100} className="w-full" />
          <p className="text-muted-foreground">
            Our AI is reviewing your resume for ATS compatibility, skills matching, and optimization opportunities.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div
      className={`upload-zone text-center cursor-pointer transition-all duration-300 ${
        dragActive ? 'dragover' : ''
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept=".pdf,.doc,.docx"
        onChange={handleFileSelect}
      />
      
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Upload className="w-10 h-10 text-primary" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-semibold gradient-text">
            Upload Your Resume
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Drop your resume here or click to browse. We support PDF and Word documents up to 10MB.
          </p>
        </div>

        <Button
          onClick={() => document.getElementById('file-upload')?.click()}
          className="btn-hero"
          size="lg"
        >
          Choose File to Upload
        </Button>

        <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-accent" />
            <span>ATS Optimized</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-accent" />
            <span>AI Powered</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-accent" />
            <span>Secure & Private</span>
          </div>
        </div>
      </div>
    </div>
  );
};