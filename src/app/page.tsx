"use client";

import { useState } from "react";
import { Users, Calendar, BarChart3, FileText, ExternalLink, ChevronRight } from "lucide-react";
import Link from "next/link";

const teamMembers = [
  // Director
  {
    name: "Yasser Omar Zaki Shaaban",
    role: "DIRECTOR",
    status: "AI AVAILABLE",
    color: "bg-purple-100 text-purple-800",
    avatar: "YO",
  },
  
  // Senior Managers (alphabetically)
  {
    name: "Elham Husain Al Hammadi",
    role: "SENIOR MANAGER",
    status: "AI AVAILABLE",
    color: "bg-purple-100 text-purple-800",
    avatar: "EH",
  },
  {
    name: "Fawzia Abdalla",
    role: "SENIOR MANAGER",
    status: "AI AVAILABLE",
    color: "bg-purple-100 text-purple-800",
    avatar: "FA",
  },
  {
    name: "Khalid Riyad Badah",
    role: "SENIOR MANAGER",
    status: "AI AVAILABLE",
    color: "bg-purple-100 text-purple-800",
    avatar: "KB",
  },
  {
    name: "Stela Paneva",
    role: "SENIOR MANAGER",
    status: "AI AVAILABLE",
    color: "bg-purple-100 text-purple-800",
    avatar: "SP",
  },
  
  // Managers (alphabetically)
  {
    name: "Fadhal Abuld Majeed",
    role: "MANAGER",
    status: "AI AVAILABLE",
    color: "bg-blue-100 text-blue-800",
    avatar: "FM",
  },
  {
    name: "Sara Mostafa",
    role: "MANAGER",
    status: "AI AVAILABLE",
    color: "bg-blue-100 text-blue-800",
    avatar: "SM",
  },
  
  // Specialists (alphabetically)
  {
    name: "Maryam Bakhit Alsuwaidi",
    role: "SPECIALIST",
    status: "COMING SOON",
    color: "bg-teal-100 text-teal-800",
    avatar: "MA",
  },
  {
    name: "Mohammad Malkawi",
    role: "SPECIALIST",
    status: "COMING SOON",
    color: "bg-teal-100 text-teal-800",
    avatar: "MM",
  },
  {
    name: "Sara Abdelaziz Alhammadi",
    role: "SPECIALIST",
    status: "COMING SOON",
    color: "bg-teal-100 text-teal-800",
    avatar: "SA",
  },
];

const navigationItems = [
  {
    title: "Agents",
    description: "AI Sales Enablement Assistant",
    icon: Users,
    href: "/agents",
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
  },
  {
    title: "Planner",
    description: "Project Management & Tracking",
    icon: Calendar,
    href: "/planner",
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
  },
  {
    title: "Analytics",
    description: "Usage & Performance Metrics",
    icon: BarChart3,
    href: "/analytics",
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
  },
  {
    title: "Templates",
    description: "Copywriting Templates & Content",
    icon: FileText,
    href: "/method",
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-orange-600",
  },
];

export default function Home() {
  const [selectedMember, setSelectedMember] = useState(teamMembers[0]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">e&</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">GTM Director Portal</h1>
                  <p className="text-sm text-gray-500">AI-Powered Sales Enablement</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <a
                href="https://www.etisalat.ae/en/smb/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Etisalat B2B</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Team Directory */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Team Directory</h2>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>AI Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span>Coming Soon</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                onClick={() => setSelectedMember(member)}
                className={`bg-white rounded-lg border-2 p-6 cursor-pointer transition-all hover:shadow-md ${
                  selectedMember.name === member.name
                    ? "border-blue-500 shadow-md"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-semibold text-sm">{member.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{member.name}</h3>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${member.color}`}
                  >
                    {member.status}
                  </span>
                  {member.status === "AI AVAILABLE" && (
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation Cards */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Portal Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {navigationItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`group block p-6 rounded-lg border-2 transition-all hover:shadow-md ${item.color} hover:scale-105`}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`p-3 rounded-lg ${item.iconColor} bg-white`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      Access Feature
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>&copy; 2024 e& (Etisalat). All rights reserved.</p>
            <p className="mt-2">AI-Powered Go-To-Market Director Portal</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
