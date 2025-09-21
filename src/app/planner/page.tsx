"use client";

import { useState } from "react";
import { ArrowLeft, Plus, Calendar, Flag, User, Clock, MoreVertical, CheckCircle, Circle } from "lucide-react";
import Link from "next/link";

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "todo" | "in-progress" | "completed";
  milestone?: boolean;
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Q1 Sales Strategy Review",
    description: "Review and update Q1 sales strategy based on market analysis",
    assignee: "Yasser Omar Zaki Shaaban",
    dueDate: "2024-01-15",
    priority: "high",
    status: "in-progress",
    milestone: true,
  },
  {
    id: "2",
    title: "Enterprise Sales Playbook",
    description: "Develop comprehensive playbook for enterprise sales team",
    assignee: "Elham Husain Al Hammadi",
    dueDate: "2024-01-20",
    priority: "high",
    status: "todo",
  },
  {
    id: "3",
    title: "Customer Success Metrics",
    description: "Define and implement customer success measurement framework",
    assignee: "Fawzia Abdalla",
    dueDate: "2024-01-25",
    priority: "medium",
    status: "todo",
  },
  {
    id: "4",
    title: "Marketing Campaign Launch",
    description: "Launch new digital transformation marketing campaign",
    assignee: "Stela Paneva",
    dueDate: "2024-02-01",
    priority: "high",
    status: "completed",
  },
  {
    id: "5",
    title: "Technical Documentation",
    description: "Update technical documentation for new solutions",
    assignee: "Mohammad Malkawi",
    dueDate: "2024-01-30",
    priority: "low",
    status: "in-progress",
  },
];

const statusColumns = [
  { id: "todo", title: "To Do", color: "bg-gray-100" },
  { id: "in-progress", title: "In Progress", color: "bg-blue-100" },
  { id: "completed", title: "Completed", color: "bg-green-100" },
];

const priorityColors = {
  high: "text-red-600 bg-red-100",
  medium: "text-yellow-600 bg-yellow-100",
  low: "text-green-600 bg-green-100",
};

export default function PlannerPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showNewTask, setShowNewTask] = useState(false);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    if (draggedTask) {
      setTasks(prev =>
        prev.map(task =>
          task.id === draggedTask.id
            ? { ...task, status: newStatus as Task["status"] }
            : task
        )
      );
      setDraggedTask(null);
    }
  };

  const getStatusCount = (status: string) => {
    return tasks.filter(task => task.status === status).length;
  };

  const getPriorityCount = (priority: string) => {
    return tasks.filter(task => task.priority === priority).length;
  };

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
                <h1 className="text-xl font-bold text-gray-900">Project Planner</h1>
                <p className="text-sm text-gray-500">Track and manage GTM projects</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowNewTask(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>New Project</span>
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{getStatusCount("in-progress")}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{getStatusCount("completed")}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <Flag className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-gray-900">{getPriorityCount("high")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {statusColumns.map((column) => (
            <div key={column.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className={`p-4 rounded-t-lg ${column.color}`}>
                <h3 className="font-semibold text-gray-900">{column.title}</h3>
                <p className="text-sm text-gray-600">{getStatusCount(column.id)} projects</p>
              </div>
              
              <div
                className="p-4 min-h-96"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                <div className="space-y-4">
                  {tasks
                    .filter(task => task.status === column.id)
                    .map((task) => (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={() => handleDragStart(task)}
                        className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-move"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
                          <div className="flex items-center space-x-1">
                            {task.milestone && (
                              <Flag className="h-4 w-4 text-orange-500" />
                            )}
                            <MoreVertical className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="text-xs text-gray-600">{task.assignee}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-xs text-gray-600">{task.dueDate}</span>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex items-center justify-between">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}
                          >
                            {task.priority.toUpperCase()}
                          </span>
                          <div className="flex items-center space-x-1">
                            {task.status === "completed" && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                            {task.status === "in-progress" && (
                              <Clock className="h-4 w-4 text-blue-500" />
                            )}
                            {task.status === "todo" && (
                              <Circle className="h-4 w-4 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
