import React from 'react';
import { TrendingUp, Award, Target, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ScoreCardProps {
  score: number;
  category: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  suggestions?: string[];
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
  score,
  category,
  icon,
  color,
  description,
  suggestions = []
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-accent';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-accent';
    if (score >= 60) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <Card className="score-card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${color}/10`}>
              {icon}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{category}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
              {score}%
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className={getScoreColor(score)}>{score}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${getProgressColor(score)}`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
        </div>

        {suggestions.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Suggestions:</h4>
            <ul className="space-y-1">
              {suggestions.slice(0, 3).map((suggestion, index) => (
                <li key={index} className="text-sm flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
};

export const OverallScoreCard: React.FC<{ overallScore: number }> = ({ overallScore }) => {
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  const getScoreGrade = (score: number) => {
    if (score >= 90) return { grade: 'A+', color: 'text-accent', message: 'Excellent!' };
    if (score >= 80) return { grade: 'A', color: 'text-accent', message: 'Great job!' };
    if (score >= 70) return { grade: 'B+', color: 'text-warning', message: 'Good work!' };
    if (score >= 60) return { grade: 'B', color: 'text-warning', message: 'Needs improvement' };
    return { grade: 'C', color: 'text-destructive', message: 'Significant improvement needed' };
  };

  const { grade, color, message } = getScoreGrade(overallScore);

  return (
    <Card className="score-card text-center">
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold mb-2">Overall Score</h3>
          <p className="text-muted-foreground">Your resume's ATS compatibility and optimization score</p>
        </div>

        <div className="relative w-32 h-32 mx-auto">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-muted"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="text-primary transition-all duration-1000 ease-out progress-ring"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-3xl font-bold ${color}`}>{overallScore}%</div>
            <div className={`text-sm font-medium ${color}`}>{grade}</div>
          </div>
        </div>

        <div className="space-y-2">
          <p className={`font-medium ${color}`}>{message}</p>
          <p className="text-sm text-muted-foreground">
            Based on ATS optimization, keyword matching, and formatting analysis
          </p>
        </div>
      </div>
    </Card>
  );
};