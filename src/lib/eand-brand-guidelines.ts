// e& Brand Guidelines for B2B Marketing
export interface EandB2BStyle {
  colors: {
    primary: string;      // e& Purple
    secondary: string;    // e& Teal
    accent: string;       // e& Orange
    background: string;   // Clean white
    text: string;         // Dark gray for readability
    lightText: string;    // Secondary text
    success: string;      // Green for success states
    warning: string;      // Yellow for warnings
    error: string;        // Red for errors
  };
  typography: {
    primary: string;
    heading: string;
    sizes: {
      small: number;
      medium: number;
      large: number;
      xlarge: number;
      xxlarge: number;
    };
    weights: {
      normal: number;
      medium: number;
      bold: number;
    };
  };
  layout: {
    spacing: number;
    borderRadius: number;
    shadows: string;
    grid: string;
    maxWidth: number;
  };
  brandElements: {
    logo: string;
    patterns: string[];
    icons: string[];
  };
}

export const EAND_B2B_BRAND: EandB2BStyle = {
  colors: {
    primary: '#6100ED',      // e& Purple
    secondary: '#02D9C7',    // e& Teal
    accent: '#FF6B35',       // e& Orange
    background: '#FFFFFF',   // Clean white
    text: '#1A1A1A',         // Dark gray for readability
    lightText: '#666666',    // Secondary text
    success: '#10B981',      // Green for success states
    warning: '#F59E0B',      // Yellow for warnings
    error: '#EF4444',        // Red for errors
  },
  typography: {
    primary: 'Helvetica Neue, Arial, sans-serif',
    heading: 'Helvetica Neue Bold, Arial, sans-serif',
    sizes: {
      small: 12,
      medium: 14,
      large: 16,
      xlarge: 20,
      xxlarge: 24,
    },
    weights: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
  },
  layout: {
    spacing: 16,
    borderRadius: 8,
    shadows: '0 2px 4px rgba(0, 0, 0, 0.1)',
    grid: 'professional',
    maxWidth: 1200,
  },
  brandElements: {
    logo: 'e&',
    patterns: ['geometric', 'minimal', 'professional'],
    icons: ['business', 'technology', 'connectivity'],
  },
};

// Industry-specific adaptations
export const INDUSTRY_STYLES = {
  retail: {
    accent: '#FF6B35',      // Orange for retail energy
    patterns: ['shopping', 'consumer', 'vibrant'],
  },
  education: {
    accent: '#3B82F6',      // Blue for education trust
    patterns: ['learning', 'academic', 'clean'],
  },
  healthcare: {
    accent: '#10B981',      // Green for healthcare trust
    patterns: ['medical', 'care', 'professional'],
  },
  finance: {
    accent: '#8B5CF6',      // Purple for finance sophistication
    patterns: ['financial', 'secure', 'premium'],
  },
  technology: {
    accent: '#06B6D4',      // Cyan for tech innovation
    patterns: ['tech', 'digital', 'modern'],
  },
  manufacturing: {
    accent: '#F59E0B',      // Amber for manufacturing strength
    patterns: ['industrial', 'robust', 'efficient'],
  },
  government: {
    accent: '#6B7280',      // Gray for government neutrality
    patterns: ['official', 'formal', 'authoritative'],
  },
  hospitality: {
    accent: '#F97316',      // Orange for hospitality warmth
    patterns: ['welcoming', 'service', 'comfortable'],
  },
  logistics: {
    accent: '#84CC16',      // Lime for logistics efficiency
    patterns: ['movement', 'efficiency', 'connectivity'],
  },
  real_estate: {
    accent: '#DC2626',      // Red for real estate impact
    patterns: ['property', 'growth', 'investment'],
  },
};

export interface LearningProgress {
  totalUploads: number;
  learnedPatterns: number;
  styleConfidence: number;
  lastLearning: Date;
  improvements: string[];
  industryStyles: Record<string, Partial<EandB2BStyle>>;
}

export interface StylePattern {
  id: string;
  name: string;
  type: 'uploaded' | 'learned' | 'adjusted';
  source: string;
  confidence: number;
  colors: Partial<EandB2BStyle['colors']>;
  typography: Partial<EandB2BStyle['typography']>;
  layout: Partial<EandB2BStyle['layout']>;
  brandElements: Partial<EandB2BStyle['brandElements']>;
  createdAt: Date;
  lastUsed: Date;
  usageCount: number;
}

// Learning insights for user feedback
export const generateLearningInsights = (progress: LearningProgress): string[] => {
  const insights: string[] = [];
  
  if (progress.totalUploads > 0) {
    insights.push(`📚 Analyzed ${progress.totalUploads} uploaded files`);
  }
  
  if (progress.learnedPatterns > 0) {
    insights.push(`🎨 Learned ${progress.learnedPatterns} style patterns`);
  }
  
  if (progress.styleConfidence > 0.8) {
    insights.push(`✨ High confidence in style matching (${Math.round(progress.styleConfidence * 100)}%)`);
  } else if (progress.styleConfidence > 0.5) {
    insights.push(`📈 Building style confidence (${Math.round(progress.styleConfidence * 100)}%)`);
  }
  
  if (progress.improvements.length > 0) {
    insights.push(`🔧 Recent improvements: ${progress.improvements.slice(-3).join(', ')}`);
  }
  
  const industryCount = Object.keys(progress.industryStyles).length;
  if (industryCount > 0) {
    insights.push(`🏢 Adapted styles for ${industryCount} industries`);
  }
  
  return insights;
};
