"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Copy } from "lucide-react";

const templates = [
  {
    title: "Value Proposition (Short)",
    body: "e& Business helps [segment] achieve [outcome] with [product], delivering [key benefit] in [timeframe].",
  },
  {
    title: "Email Outreach (AIDA)",
    body: "Subject: Unlock faster growth with [product] at e&\n\nHi [Name],\n\nAttention: [key pain].\nInterest: With [product], companies like [peer] get [benefit].\nDesire: You’ll see [metric] improve within [timeframe].\nAction: Can we schedule a 15‑min call this week?\n\nBest,\n[Rep]",
  },
  {
    title: "Landing Hero (Problem → Solution)",
    body: "[Problem in one sentence].\n\nMeet [product] — the fastest way to [primary outcome].\n• Key benefit 1\n• Key benefit 2\n• Key benefit 3\n\nCTA: Get started",
  },
  {
    title: "EDM (Offer + Deadline)",
    body: "Headline: Upgrade to [product] — offer ends [date].\n\nHi [First Name],\nHere’s how [product] helps you [goal]:\n• [Benefit 1]\n• [Benefit 2]\n• [Benefit 3]\n\nClaim your offer by [date].",
  },
];

export default function MeloMethodPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 1200);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
              <span className="ml-2">Back to Directory</span>
            </Link>
          </div>
          <h1 className="text-lg font-semibold text-gray-900">Melo Method — Copywriting Templates</h1>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <p className="text-sm text-gray-600 mb-6">Use these proven templates for fast, on‑brand GTM content. Click copy to paste into Jammy or your docs.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((t, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-gray-900">{t.title}</h2>
                <button
                  onClick={() => handleCopy(t.body, idx)}
                  className="flex items-center space-x-1 px-3 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-800"
                >
                  <Copy className="h-3 w-3" />
                  <span>{copiedIndex === idx ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <pre className="whitespace-pre-wrap text-sm text-gray-800 bg-gray-50 p-3 rounded">
{t.body}
              </pre>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import { ArrowLeft, FileText, Mail, MessageSquare, Download, Upload, Plus, Save, X } from "lucide-react";
import Link from "next/link";
import { templateGenerator, Template, TemplateRequest } from "@/lib/template-generator";

// Template interface is imported from template-generator

const initialTemplates: Template[] = [
  {
    id: "1",
    name: "Enterprise Solutions EDM",
    type: "edm",
    industry: "Technology",
    description: "Email template for enterprise technology solutions",
    content: "Subject: Transform Your Business with e& Enterprise Solutions\n\nDear [Customer Name],\n\nIn today's fast-paced digital world, staying ahead requires innovative solutions...",
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    name: "Mobile Data SMS Campaign",
    type: "sms",
    industry: "Telecommunications",
    description: "SMS template for mobile data promotions",
    content: "Get 50% more data with e& Business Mobile! Upgrade now and enjoy unlimited connectivity. Reply YES to activate. T&C apply.",
    createdAt: "2024-01-12",
  },
  {
    id: "3",
    name: "Digital Transformation Brochure",
    type: "brochure",
    industry: "All Industries",
    description: "Comprehensive brochure for digital transformation services",
    content: "Digital Transformation with e&\n\nTransform your business with our comprehensive digital solutions...",
    createdAt: "2024-01-08",
  },
  {
    id: "4",
    name: "Event Invitation Flyer",
    type: "flyer",
    industry: "Events",
    description: "Professional flyer for business events and webinars",
    content: "Join us for an exclusive event:\n\n[Event Name]\n[Date] | [Time] | [Location]\n\nDiscover the future of business technology...",
    createdAt: "2024-01-14",
  },
  {
    id: "5",
    name: "5G Solutions White Paper",
    type: "whitepaper",
    industry: "Technology",
    description: "Technical white paper on 5G business solutions",
    content: "Executive Summary\n\n5G technology represents a paradigm shift in business connectivity...",
    createdAt: "2024-01-05",
  },
  {
    id: "6",
    name: "Welcome Note Template",
    type: "welcome",
    industry: "All Industries",
    description: "Personalized welcome note for new clients",
    content: "Welcome to e& Business Solutions!\n\nDear [Client Name],\n\nWe're excited to partner with you on your digital transformation journey...",
    createdAt: "2024-01-15",
  },
];

const industryMoods = {
  "Technology": ["innovative", "cutting-edge", "transformative", "scalable", "efficient"],
  "Healthcare": ["reliable", "secure", "life-saving", "precise", "trusted"],
  "Education": ["empowering", "accessible", "collaborative", "engaging", "inclusive"],
  "Finance": ["secure", "transparent", "efficient", "trusted", "compliant"],
  "Retail": ["engaging", "personalized", "convenient", "seamless", "customer-focused"],
  "Manufacturing": ["robust", "efficient", "scalable", "reliable", "optimized"],
  "All Industries": ["professional", "reliable", "innovative", "trusted", "comprehensive"],
};

const templateTypes = {
  edm: { name: "Email Marketing", icon: Mail, color: "bg-blue-100 text-blue-800" },
  sms: { name: "SMS Campaign", icon: MessageSquare, color: "bg-green-100 text-green-800" },
  brochure: { name: "Brochure", icon: FileText, color: "bg-purple-100 text-purple-800" },
  flyer: { name: "Flyer", icon: FileText, color: "bg-orange-100 text-orange-800" },
  whitepaper: { name: "White Paper", icon: FileText, color: "bg-gray-100 text-gray-800" },
  welcome: { name: "Welcome Note", icon: FileText, color: "bg-pink-100 text-pink-800" },
};

export default function MethodPage() {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [showNewTemplate, setShowNewTemplate] = useState(false);
  const [newTemplate, setNewTemplate] = useState<TemplateRequest>({
    type: "edm",
    industry: "retail",
    title: "",
    description: ""
  });

  const filteredTemplates = templates.filter(template => 
    selectedIndustry === "All Industries" || template.industry === selectedIndustry
  );

  const handleGenerateTemplate = () => {
    if (newTemplate.title.trim() && newTemplate.industry) {
      const generatedTemplate = templateGenerator.generateTemplate(newTemplate);
      setTemplates(prev => [generatedTemplate, ...prev]);
      setNewTemplate({
        type: "edm",
        industry: "retail",
        title: "",
        description: ""
      });
      setShowNewTemplate(false);
    }
  };

  const handleDownloadTemplate = (template: Template) => {
    const blob = new Blob([template.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
                <h1 className="text-xl font-bold text-gray-900">Melo Method</h1>
                <p className="text-sm text-gray-500">Copywriting Templates & Industry-Specific Content</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowNewTemplate(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>New Template</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Industry Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter by Industry</h2>
          <div className="flex flex-wrap gap-2">
            {Object.keys(industryMoods).map((industry) => (
              <button
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedIndustry === industry
                    ? "bg-red-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        {/* Industry Mood Words */}
        {selectedIndustry !== "All Industries" && (
          <div className="mb-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedIndustry} Industry Mood Words
            </h3>
            <div className="flex flex-wrap gap-2">
              {industryMoods[selectedIndustry as keyof typeof industryMoods].map((word, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => {
            const TemplateIcon = templateTypes[template.type].icon;
            return (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template)}
                className="bg-white rounded-lg border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${templateTypes[template.type].color}`}>
                      <TemplateIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{template.name}</h3>
                      <p className="text-sm text-gray-500">{template.industry}</p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{template.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Created: {template.createdAt}</span>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Upload className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* How-to Guide */}
        <div className="mt-12 bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use Melo Method</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Template</h3>
              <p className="text-gray-600">Choose from our library of proven templates based on your industry and content type.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fill in Details</h3>
              <p className="text-gray-600">Use industry-specific mood words and customize the content for your specific needs.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Human Review</h3>
              <p className="text-gray-600">Review and edit the generated content to ensure it meets your brand standards.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Template Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">{selectedTemplate.name}</h3>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">{selectedTemplate.description}</p>
            </div>
            
            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <pre className="whitespace-pre-wrap text-sm text-gray-700">{selectedTemplate.content}</pre>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <Upload className="h-4 w-4" />
                    <span>Upload to AI</span>
                  </button>
                </div>
                <span className="text-sm text-gray-500">Created: {selectedTemplate.createdAt}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Template Modal */}
      {showNewTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Generate New Template</h3>
                <button
                  onClick={() => setShowNewTemplate(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template Title *
                </label>
                <input
                  type="text"
                  value={newTemplate.title}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                  placeholder="Enter template title"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Type *
                  </label>
                  <select
                    value={newTemplate.type}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                  >
                    {templateGenerator.getTemplateTypes().map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry *
                  </label>
                  <select
                    value={newTemplate.industry}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, industry: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                  >
                    {templateGenerator.getAvailableIndustries().map(industry => (
                      <option key={industry} value={industry}>
                        {industry.charAt(0).toUpperCase() + industry.slice(1).replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                  rows={3}
                  placeholder="Enter template description (optional)"
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowNewTemplate(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateTemplate}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Generate Template</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
