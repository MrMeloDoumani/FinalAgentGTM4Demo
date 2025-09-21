"use client";

import { ArrowLeft, TrendingUp, Users, Clock, CheckCircle, BarChart3, Calendar } from "lucide-react";
import Link from "next/link";

const analyticsData = {
  loginStats: {
    totalLogins: 247,
    uniqueSessions: 89,
    peakConcurrent: 12,
    averageSessionTime: "2h 34m",
    lastLogin: "2024-01-15 14:30",
  },
  taskStats: {
    totalTasks: 156,
    completedTasks: 89,
    inProgressTasks: 45,
    overdueTasks: 22,
    completionRate: 57.1,
  },
  aiUsage: {
    totalRequests: 1247,
    successfulRequests: 1198,
    failedRequests: 49,
    averageResponseTime: "2.3s",
    mostUsedFeature: "Content Generation",
  },
  teamActivity: [
    { name: "Yasser Omar Zaki Shaaban", requests: 456, lastActive: "2 hours ago" },
    { name: "Elham Husain Al Hammadi", requests: 234, lastActive: "1 day ago" },
    { name: "Fawzia Abdalla", requests: 189, lastActive: "3 hours ago" },
    { name: "Stela Paneva", requests: 156, lastActive: "5 hours ago" },
    { name: "Khalid Riyad Badah", requests: 98, lastActive: "2 days ago" },
  ],
  recentActivity: [
    { action: "Generated Sales Brochure", user: "Yasser Omar Zaki Shaaban", time: "2 hours ago", type: "success" },
    { action: "Uploaded Knowledge Base", user: "Elham Husain Al Hammadi", time: "4 hours ago", type: "info" },
    { action: "Created Project Plan", user: "Fawzia Abdalla", time: "6 hours ago", type: "success" },
    { action: "AI Request Failed", user: "Stela Paneva", time: "8 hours ago", type: "error" },
    { action: "Completed Task", user: "Yasser Omar Zaki Shaaban", time: "1 day ago", type: "success" },
  ],
};

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Directory</span>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-sm text-gray-500">GTM Portal usage and performance metrics</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Logins</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.loginStats.totalLogins}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unique Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.loginStats.uniqueSessions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Peak Concurrent</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.loginStats.peakConcurrent}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.taskStats.completionRate}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Task Statistics */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Task Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-700">Completed Tasks</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{analyticsData.taskStats.completedTasks}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">In Progress</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{analyticsData.taskStats.inProgressTasks}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-red-500" />
                  <span className="text-sm font-medium text-gray-700">Overdue</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{analyticsData.taskStats.overdueTasks}</span>
              </div>
            </div>
          </div>

          {/* AI Usage Statistics */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Usage Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Total Requests</span>
                <span className="text-lg font-bold text-gray-900">{analyticsData.aiUsage.totalRequests}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Successful Requests</span>
                <span className="text-lg font-bold text-green-600">{analyticsData.aiUsage.successfulRequests}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Failed Requests</span>
                <span className="text-lg font-bold text-red-600">{analyticsData.aiUsage.failedRequests}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Avg Response Time</span>
                <span className="text-lg font-bold text-gray-900">{analyticsData.aiUsage.averageResponseTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Activity */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Team Activity</h3>
            <div className="space-y-4">
              {analyticsData.teamActivity.map((member, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{member.name}</p>
                    <p className="text-xs text-gray-500">Last active: {member.lastActive}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{member.requests}</p>
                    <p className="text-xs text-gray-500">requests</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {analyticsData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === "success" ? "bg-green-500" :
                    activity.type === "error" ? "bg-red-500" : "bg-blue-500"
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
