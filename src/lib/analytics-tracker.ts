// Real-time Analytics Tracker for GTM Portal
// Tracks actual usage data and provides real-time analytics

export interface AnalyticsData {
  loginStats: {
    totalLogins: number;
    uniqueSessions: number;
    peakConcurrent: number;
    averageSessionTime: string;
    lastLogin: string;
  };
  taskStats: {
    totalTasks: number;
    completedTasks: number;
    inProgressTasks: number;
    overdueTasks: number;
    completionRate: number;
  };
  aiUsage: {
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    averageResponseTime: string;
    mostUsedFeature: string;
  };
  teamActivity: Array<{
    name: string;
    requests: number;
    lastActive: string;
  }>;
  recentActivity: Array<{
    action: string;
    user: string;
    time: string;
    type: 'success' | 'error' | 'info';
  }>;
}

class AnalyticsTracker {
  private data: AnalyticsData;
  private sessionId: string;
  private startTime: number;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.data = this.loadStoredData();
    this.initializeSession();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private loadStoredData(): AnalyticsData {
    try {
      const stored = localStorage.getItem('gtm_analytics_data');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    }

    // Default data
    return {
      loginStats: {
        totalLogins: 0,
        uniqueSessions: 0,
        peakConcurrent: 0,
        averageSessionTime: "0m",
        lastLogin: new Date().toISOString(),
      },
      taskStats: {
        totalTasks: 0,
        completedTasks: 0,
        inProgressTasks: 0,
        overdueTasks: 0,
        completionRate: 0,
      },
      aiUsage: {
        totalRequests: 0,
        successfulRequests: 0,
        failedRequests: 0,
        averageResponseTime: "0s",
        mostUsedFeature: "Content Generation",
      },
      teamActivity: [],
      recentActivity: []
    };
  }

  private saveData(): void {
    try {
      localStorage.setItem('gtm_analytics_data', JSON.stringify(this.data));
    } catch (error) {
      console.error('Failed to save analytics data:', error);
    }
  }

  private initializeSession(): void {
    // Track login
    this.trackLogin();
    
    // Update session time periodically
    setInterval(() => {
      this.updateSessionTime();
    }, 60000); // Every minute
  }

  trackLogin(): void {
    this.data.loginStats.totalLogins++;
    this.data.loginStats.lastLogin = new Date().toISOString();
    
    // Check if this is a new session
    const lastSession = localStorage.getItem('last_session_id');
    if (lastSession !== this.sessionId) {
      this.data.loginStats.uniqueSessions++;
      localStorage.setItem('last_session_id', this.sessionId);
    }
    
    this.saveData();
  }

  trackAIRequest(success: boolean, responseTime: number, feature: string): void {
    this.data.aiUsage.totalRequests++;
    
    if (success) {
      this.data.aiUsage.successfulRequests++;
    } else {
      this.data.aiUsage.failedRequests++;
    }
    
    // Update average response time
    const currentAvg = parseFloat(this.data.aiUsage.averageResponseTime.replace('s', ''));
    const newAvg = (currentAvg + responseTime) / 2;
    this.data.aiUsage.averageResponseTime = `${newAvg.toFixed(1)}s`;
    
    // Update most used feature
    this.data.aiUsage.mostUsedFeature = feature;
    
    this.saveData();
  }

  trackTaskCreation(): void {
    this.data.taskStats.totalTasks++;
    this.saveData();
  }

  trackTaskCompletion(): void {
    this.data.taskStats.completedTasks++;
    this.updateCompletionRate();
    this.saveData();
  }

  trackTaskStatusChange(fromStatus: string, toStatus: string): void {
    if (toStatus === 'completed') {
      this.data.taskStats.completedTasks++;
    } else if (toStatus === 'in-progress') {
      this.data.taskStats.inProgressTasks++;
    }
    
    this.updateCompletionRate();
    this.saveData();
  }

  trackTeamActivity(userName: string, action: string): void {
    // Update team activity
    const existingMember = this.data.teamActivity.find(member => member.name === userName);
    if (existingMember) {
      existingMember.requests++;
      existingMember.lastActive = "Just now";
    } else {
      this.data.teamActivity.push({
        name: userName,
        requests: 1,
        lastActive: "Just now"
      });
    }
    
    // Add to recent activity
    this.data.recentActivity.unshift({
      action: action,
      user: userName,
      time: "Just now",
      type: 'success'
    });
    
    // Keep only last 10 activities
    if (this.data.recentActivity.length > 10) {
      this.data.recentActivity = this.data.recentActivity.slice(0, 10);
    }
    
    this.saveData();
  }

  private updateCompletionRate(): void {
    if (this.data.taskStats.totalTasks > 0) {
      this.data.taskStats.completionRate = Math.round(
        (this.data.taskStats.completedTasks / this.data.taskStats.totalTasks) * 100
      );
    }
  }

  private updateSessionTime(): void {
    const sessionDuration = Date.now() - this.startTime;
    const minutes = Math.floor(sessionDuration / 60000);
    this.data.loginStats.averageSessionTime = `${minutes}m`;
  }

  getAnalyticsData(): AnalyticsData {
    // Update real-time data
    this.updateRealTimeData();
    return this.data;
  }

  private updateRealTimeData(): void {
    // Update last active times
    this.data.teamActivity.forEach(member => {
      if (member.lastActive === "Just now") {
        member.lastActive = "1 minute ago";
      }
    });
    
    // Update recent activity times
    this.data.recentActivity.forEach(activity => {
      if (activity.time === "Just now") {
        activity.time = "1 minute ago";
      }
    });
  }

  // Simulate some realistic data for demo
  generateDemoData(): void {
    this.data = {
      loginStats: {
        totalLogins: Math.floor(Math.random() * 100) + 200,
        uniqueSessions: Math.floor(Math.random() * 50) + 80,
        peakConcurrent: Math.floor(Math.random() * 10) + 8,
        averageSessionTime: `${Math.floor(Math.random() * 60) + 30}m`,
        lastLogin: new Date().toISOString(),
      },
      taskStats: {
        totalTasks: Math.floor(Math.random() * 50) + 100,
        completedTasks: Math.floor(Math.random() * 30) + 60,
        inProgressTasks: Math.floor(Math.random() * 20) + 20,
        overdueTasks: Math.floor(Math.random() * 10) + 5,
        completionRate: Math.floor(Math.random() * 30) + 50,
      },
      aiUsage: {
        totalRequests: Math.floor(Math.random() * 500) + 1000,
        successfulRequests: Math.floor(Math.random() * 400) + 900,
        failedRequests: Math.floor(Math.random() * 50) + 20,
        averageResponseTime: `${(Math.random() * 2 + 1).toFixed(1)}s`,
        mostUsedFeature: "Content Generation",
      },
      teamActivity: [
        { name: "Yasser Omar Zaki Shaaban", requests: Math.floor(Math.random() * 200) + 300, lastActive: "2 hours ago" },
        { name: "Elham Husain Al Hammadi", requests: Math.floor(Math.random() * 100) + 150, lastActive: "1 day ago" },
        { name: "Fawzia Abdalla", requests: Math.floor(Math.random() * 100) + 100, lastActive: "3 hours ago" },
        { name: "Stela Paneva", requests: Math.floor(Math.random() * 100) + 80, lastActive: "5 hours ago" },
        { name: "Khalid Riyad Badah", requests: Math.floor(Math.random() * 50) + 50, lastActive: "2 days ago" },
      ],
      recentActivity: [
        { action: "Generated Sales Brochure", user: "Yasser Omar Zaki Shaaban", time: "2 hours ago", type: "success" },
        { action: "Uploaded Knowledge Base", user: "Elham Husain Al Hammadi", time: "4 hours ago", type: "info" },
        { action: "Created Project Plan", user: "Fawzia Abdalla", time: "6 hours ago", type: "success" },
        { action: "AI Request Failed", user: "Stela Paneva", time: "8 hours ago", type: "error" },
        { action: "Completed Task", user: "Yasser Omar Zaki Shaaban", time: "1 day ago", type: "success" },
      ]
    };
    
    this.saveData();
  }
}

export const analyticsTracker = new AnalyticsTracker();
