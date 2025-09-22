import React from 'react';
import { FileText, Target, Award, Zap, Users, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { ScoreCard, OverallScoreCard } from './ScoreCard';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
}

interface AnalysisResultsProps {
  data: AnalysisData;
  onNewUpload: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ data, onNewUpload }) => {
  const {
    overallScore,
    atsScore,
    keywordScore,
    formattingScore,
    contentScore,
    skills,
    missingSkills,
    improvements,
    strengths,
    filename
  } = data;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <FileText className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold gradient-text">Analysis Complete</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We've analyzed <span className="font-medium text-foreground">{filename}</span> and 
          identified optimization opportunities to improve your resume's performance.
        </p>
      </div>

      {/* Overall Score */}
      <div className="flex justify-center">
        <OverallScoreCard overallScore={overallScore} />
      </div>

      {/* Detailed Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ScoreCard
          score={atsScore}
          category="ATS Compatibility"
          icon={<Target className="w-6 h-6 text-primary" />}
          color="primary"
          description="How well your resume passes ATS systems"
          suggestions={[
            "Use standard section headings",
            "Avoid complex formatting",
            "Include relevant keywords"
          ]}
        />
        <ScoreCard
          score={keywordScore}
          category="Keyword Optimization"
          icon={<Zap className="w-6 h-6 text-accent" />}
          color="accent"
          description="Relevance of keywords for your target role"
          suggestions={[
            "Add industry-specific terms",
            "Include skill variations",
            "Match job description keywords"
          ]}
        />
        <ScoreCard
          score={formattingScore}
          category="Formatting"
          icon={<Award className="w-6 h-6 text-secondary" />}
          color="secondary"
          description="Professional formatting and structure"
          suggestions={[
            "Use consistent fonts",
            "Improve spacing",
            "Standardize bullet points"
          ]}
        />
        <ScoreCard
          score={contentScore}
          category="Content Quality"
          icon={<TrendingUp className="w-6 h-6 text-warning" />}
          color="warning"
          description="Effectiveness of your content"
          suggestions={[
            "Quantify achievements",
            "Use action verbs",
            "Tailor to job requirements"
          ]}
        />
      </div>

      {/* Detailed Analysis */}
      <Tabs defaultValue="skills" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
          <TabsTrigger value="strengths">Strengths</TabsTrigger>
          <TabsTrigger value="improvements">Improvements</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="score-card">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-accent" />
                  <h3 className="text-lg font-semibold">Identified Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-accent/10 text-accent">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="score-card">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-6 h-6 text-warning" />
                  <h3 className="text-lg font-semibold">Missing Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {missingSkills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="border-warning text-warning">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Consider adding these in-demand skills to improve your match rate.
                </p>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="strengths" className="space-y-4">
          <Card className="score-card">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Award className="w-6 h-6 text-accent" />
                <h3 className="text-lg font-semibold">Your Resume Strengths</h3>
              </div>
              <ul className="space-y-3">
                {strengths.map((strength, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="improvements" className="space-y-4">
          <Card className="score-card">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold">Improvement Opportunities</h3>
              </div>
              <ul className="space-y-3">
                {improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card className="score-card">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-secondary" />
                <h3 className="text-lg font-semibold">AI Recommendations</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Priority Actions</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Add 3-5 missing technical skills relevant to your field</li>
                    <li>• Quantify at least 5 achievements with specific numbers</li>
                    <li>• Use industry-standard section headers (Experience, Education, Skills)</li>
                    <li>• Ensure consistent formatting throughout the document</li>
                  </ul>
                </div>
                <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                  <h4 className="font-medium mb-2 text-accent">Pro Tip</h4>
                  <p className="text-sm text-muted-foreground">
                    Tailor your resume for each application by including 6-8 keywords from the job description
                    while maintaining natural language flow.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Button */}
      <div className="text-center">
        <button 
          onClick={onNewUpload}
          className="btn-hero"
        >
          Analyze Another Resume
        </button>
      </div>
    </div>
  );
};