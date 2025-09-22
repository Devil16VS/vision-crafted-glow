import React, { useState } from 'react';
import { Sparkles, Brain, Shield, Zap } from 'lucide-react';
import { ResumeUploader } from '@/components/ResumeUploader';
import { AnalysisResults } from '@/components/AnalysisResults';
import heroBackground from '@/assets/hero-bg.jpg';
import resumeIcon from '@/assets/resume-icon.png';

interface AnalysisData {
  overallScore: number;
  atsScore: number;
  keywordScore: number;
  formattingScore: number;
  contentScore: number;
  skills: string[];
  missingSkills: string[];
  improvements: string[];
  strengths: string[];
  filename: string;
  jobDescription?: string;
  jobMatchScore?: number;
}

const Index = () => {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock analysis function - in real app, this would call your AI API
  const analyzeResume = async (file: File, jobDescription?: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate job-specific analysis if job description is provided
    const hasJobDescription = jobDescription && jobDescription.trim().length > 0;
    const jobMatchScore = hasJobDescription ? Math.floor(Math.random() * 30) + 65 : undefined;
    
    const baseSkills = ['React', 'TypeScript', 'Node.js', 'Python', 'SQL', 'Git', 'AWS'];
    const jobSpecificSkills = hasJobDescription 
      ? ['Machine Learning', 'Data Analysis', 'Project Management', 'API Development', 'Microservices']
      : ['Machine Learning', 'Data Analysis', 'Project Management'];
    
    const baseMissingSkills = ['Docker', 'Kubernetes', 'GraphQL', 'Next.js'];
    const jobSpecificMissingSkills = hasJobDescription
      ? ['TensorFlow', 'Agile', 'CI/CD', 'MongoDB', 'Redis', 'Elasticsearch']
      : ['TensorFlow', 'Agile'];

    const baseImprovements = [
      'Add quantifiable achievements with specific metrics and numbers',
      'Standardize formatting and use consistent bullet point styles',
      'Add a professional summary section at the top of your resume'
    ];
    
    const jobSpecificImprovements = hasJobDescription ? [
      ...baseImprovements,
      `Include keywords from the job description: ${jobDescription.slice(0, 100)}...`,
      'Highlight experience that directly matches the role requirements',
      'Quantify achievements relevant to the specific job responsibilities',
      'Add technical skills mentioned in the job posting',
      'Tailor your professional summary to match the job requirements'
    ] : [
      ...baseImprovements,
      'Include more technical keywords relevant to your target role',
      'Include relevant certifications and professional development',
      'Use action verbs to start each bullet point in experience section'
    ];

    const baseStrengths = [
      'Strong technical skill set with modern technologies',
      'Clear work experience progression and career growth',
      'Good use of industry-standard terminology',
      'Professional formatting with appropriate sections'
    ];

    const jobSpecificStrengths = hasJobDescription ? [
      ...baseStrengths,
      'Resume contains several keywords that match the job requirements',
      'Experience aligns well with the role responsibilities',
      'Technical skills are relevant to the position'
    ] : [
      ...baseStrengths,
      'Relevant educational background and achievements'
    ];
    
    // Mock analysis results
    const mockResults: AnalysisData = {
      overallScore: hasJobDescription ? jobMatchScore! + 10 : 78,
      atsScore: 85,
      keywordScore: hasJobDescription ? jobMatchScore! : 72,
      formattingScore: 82,
      contentScore: hasJobDescription ? jobMatchScore! + 5 : 75,
      skills: [...baseSkills, ...jobSpecificSkills],
      missingSkills: [...baseMissingSkills, ...jobSpecificMissingSkills],
      improvements: jobSpecificImprovements,
      strengths: jobSpecificStrengths,
      filename: file.name,
      jobDescription: hasJobDescription ? jobDescription : undefined,
      jobMatchScore: jobMatchScore
    };
    
    setAnalysisData(mockResults);
    setIsAnalyzing(false);
  };

  const handleNewUpload = () => {
    setAnalysisData(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-20 lg:py-32 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1)), url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            {/* Hero Content */}
            <div className="space-y-6">
              <div className="flex justify-center mb-6">
                <img 
                  src={resumeIcon} 
                  alt="Resume Analyzer" 
                  className="w-24 h-24 rounded-2xl shadow-lg"
                />
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold gradient-text leading-tight">
                Next-Gen Resume Analyzer
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Powered by AI to optimize your resume for ATS systems, improve keyword matching, 
                and maximize your job application success rate.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {[
                { icon: Brain, title: "AI-Powered", desc: "Smart analysis" },
                { icon: Zap, title: "Instant Results", desc: "In seconds" },
                { icon: Shield, title: "ATS Optimized", desc: "Beat the bots" },
                { icon: Sparkles, title: "Expert Tips", desc: "Actionable advice" }
              ].map((feature, index) => (
                <div key={index} className="glass rounded-xl p-4 hover:scale-105 transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          {!analysisData ? (
            <div className="max-w-2xl mx-auto">
              <ResumeUploader 
                onFileUpload={analyzeResume}
                isAnalyzing={isAnalyzing}
              />
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">
              <AnalysisResults 
                data={analysisData}
                onNewUpload={handleNewUpload}
              />
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <img src={resumeIcon} alt="Logo" className="w-8 h-8" />
              <span className="font-semibold text-lg">Resume Analyzer</span>
            </div>
            <p className="text-muted-foreground">
              Empowering job seekers with AI-driven resume optimization since 2024
            </p>
            <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
              <span>Privacy First</span>
              <span>•</span>
              <span>Secure Processing</span>
              <span>•</span>
              <span>No Data Stored</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
