export interface Brand {
  id: string;
  name: string;
  color: string;
  documentsCount: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  timestamp: Date;
}

export interface Source {
  id: string;
  name: string;
  type: "PDF" | "Doc" | "Image" | "URL" | "Sheet";
  url: string;
}

export interface Document {
  id: string;
  name: string;
  source: "Google Drive" | "Upload" | "URL";
  type: "PDF" | "Doc" | "Image" | "Sheet";
  lastUpdated: string;
  status: "Indexed" | "Processing" | "Error";
}

export interface IngestionJob {
  id: string;
  source: string;
  sourceType: "Google Drive" | "Upload" | "URL";
  lastSync: string;
  status: "Success" | "Processing" | "Failed";
  documentsProcessed: number;
  errors: number;
}

export const brands: Brand[] = [
  { id: "1", name: "Acme Corp", color: "#4285F4", documentsCount: 142 },
  { id: "2", name: "Nova Brand", color: "#EA4335", documentsCount: 87 },
  { id: "3", name: "Vertex Labs", color: "#34A853", documentsCount: 203 },
  { id: "4", name: "Pulse Media", color: "#FBBC04", documentsCount: 56 },
  { id: "5", name: "Arc Studio", color: "#8E24AA", documentsCount: 91 },
];

export const mockDocuments: Document[] = [
  { id: "1", name: "Brand Guidelines v3.2.pdf", source: "Google Drive", type: "PDF", lastUpdated: "2026-02-08", status: "Indexed" },
  { id: "2", name: "Product Specifications.docx", source: "Google Drive", type: "Doc", lastUpdated: "2026-02-07", status: "Indexed" },
  { id: "3", name: "Q1 Campaign Assets", source: "Upload", type: "Image", lastUpdated: "2026-02-06", status: "Processing" },
  { id: "4", name: "Competitor Analysis.pdf", source: "Upload", type: "PDF", lastUpdated: "2026-02-05", status: "Indexed" },
  { id: "5", name: "Pricing Sheet 2026.xlsx", source: "Google Drive", type: "Sheet", lastUpdated: "2026-02-04", status: "Indexed" },
  { id: "6", name: "Legal Compliance Notes.pdf", source: "URL", type: "PDF", lastUpdated: "2026-02-03", status: "Error" },
  { id: "7", name: "Social Media Playbook.docx", source: "Google Drive", type: "Doc", lastUpdated: "2026-02-02", status: "Indexed" },
  { id: "8", name: "Product Photography Set", source: "Upload", type: "Image", lastUpdated: "2026-02-01", status: "Indexed" },
];

export const mockIngestionJobs: IngestionJob[] = [
  { id: "1", source: "Brand Drive / Guidelines", sourceType: "Google Drive", lastSync: "2026-02-10 09:15", status: "Success", documentsProcessed: 24, errors: 0 },
  { id: "2", source: "Product Docs Folder", sourceType: "Google Drive", lastSync: "2026-02-10 08:30", status: "Processing", documentsProcessed: 12, errors: 0 },
  { id: "3", source: "Manual Uploads", sourceType: "Upload", lastSync: "2026-02-09 14:22", status: "Success", documentsProcessed: 8, errors: 0 },
  { id: "4", source: "Legal Resources", sourceType: "URL", lastSync: "2026-02-09 10:00", status: "Failed", documentsProcessed: 0, errors: 3 },
  { id: "5", source: "Marketing Assets", sourceType: "Google Drive", lastSync: "2026-02-08 16:45", status: "Success", documentsProcessed: 31, errors: 1 },
];

export const examplePrompts = [
  "What are the brand guidelines?",
  "Summarize product information",
  "What constraints should I know before starting work?",
  "What are the approved color palettes?",
  "List all active campaigns",
  "What's the brand voice and tone?",
];

export const mockChatHistory: ChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "What are the primary brand colors and when should they be used?",
    timestamp: new Date("2026-02-10T10:00:00"),
  },
  {
    id: "2",
    role: "assistant",
    content: `## Primary Brand Colors

The brand uses the following primary color palette:

- **Blue (#4285F4)** — Primary brand color. Used for headlines, CTAs, and key UI elements.
- **Dark Gray (#202124)** — Body text and secondary elements.
- **White (#FFFFFF)** — Backgrounds and contrast areas.

### Usage Guidelines

1. **Digital applications**: Blue should occupy no more than 30% of any given layout
2. **Print materials**: Use the Pantone 2727 C equivalent
3. **Accessibility**: Always maintain a minimum contrast ratio of 4.5:1 against backgrounds

### Restrictions

- Never use the primary blue as a background color for large areas
- Do not modify opacity below 80% for text elements
- The brand gradient (Blue to Light Blue) is reserved for hero sections only`,
    sources: [
      { id: "s1", name: "Brand Guidelines v3.2.pdf", type: "PDF", url: "#" },
      { id: "s2", name: "Digital Style Guide.docx", type: "Doc", url: "#" },
    ],
    timestamp: new Date("2026-02-10T10:00:05"),
  },
];
