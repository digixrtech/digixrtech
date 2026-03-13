export type Industry = 'healthcare' | 'education' | 'finance' | 'manufacturing' | 'retail' | 'other';

export type AgentColor = 'cyan' | 'teal' | 'emerald';

export interface AgentSpec {
  name: string;
  desc: string;
  icon: string;
  color: AgentColor;
}

export interface LifecycleMapping {
  context: string;
  build: string;
  secure: string;
  assure: string;
}

export interface ArchitectureTemplate {
  challenges: string[];
  agents: AgentSpec[];
  lifecycle: LifecycleMapping;
  complexity: 'Simple' | 'Moderate' | 'Complex';
}

export const industries: { key: Industry; label: string }[] = [
  { key: 'healthcare', label: 'Healthcare' },
  { key: 'education', label: 'Education' },
  { key: 'finance', label: 'Finance' },
  { key: 'manufacturing', label: 'Manufacturing' },
  { key: 'retail', label: 'Retail' },
  { key: 'other', label: 'Other' },
];

export const architectureTemplates: Record<Industry, ArchitectureTemplate> = {
  healthcare: {
    challenges: ['Appointment scheduling', 'Patient engagement', 'Clinical decision support'],
    agents: [
      { name: 'Intake Agent', desc: 'Processes patient requests, extracts intent, and routes to scheduling or triage workflows.', icon: '01', color: 'cyan' },
      { name: 'Scheduling Agent', desc: 'Coordinates availability across providers, handles conflicts, and confirms appointments.', icon: '02', color: 'teal' },
      { name: 'Notification Agent', desc: 'Sends confirmations, reminders, and follow-ups via SMS, email, or patient portal.', icon: '03', color: 'emerald' },
    ],
    lifecycle: {
      context: 'Patient data + EHR context',
      build: 'Supervisor + worker agents, MCP tools',
      secure: 'PHI/PII redaction, HIPAA guardrails',
      assure: 'Scheduling accuracy, agent denial rate, bias detection',
    },
    complexity: 'Moderate',
  },
  education: {
    challenges: ['Student guidance', 'Enrollment optimization', 'Course recommendation'],
    agents: [
      { name: 'Guidance Agent', desc: 'Understands student goals, academic history, and recommends pathways aligned with outcomes.', icon: '01', color: 'cyan' },
      { name: 'Enrollment Agent', desc: 'Checks prerequisites, handles waitlists, and optimizes section placement.', icon: '02', color: 'teal' },
      { name: 'Outreach Agent', desc: 'Proactively engages at-risk students with personalized support and resources.', icon: '03', color: 'emerald' },
    ],
    lifecycle: {
      context: 'Student records + transcript data',
      build: 'RAG pipeline + advisor agents',
      secure: 'FERPA compliance, data access controls',
      assure: 'Equity audits, recommendation fairness, outcome tracking',
    },
    complexity: 'Moderate',
  },
  finance: {
    challenges: ['Fraud detection', 'Customer support', 'Portfolio management'],
    agents: [
      { name: 'Monitor Agent', desc: 'Continuously analyzes transaction patterns and flags anomalies for review.', icon: '01', color: 'cyan' },
      { name: 'Investigation Agent', desc: 'Deep-dives flagged transactions, correlates with historical patterns, and generates risk scores.', icon: '02', color: 'teal' },
      { name: 'Resolution Agent', desc: 'Coordinates response actions — account holds, customer notifications, and compliance reporting.', icon: '03', color: 'emerald' },
    ],
    lifecycle: {
      context: 'Transaction streams + customer profiles',
      build: 'Event-driven agents, real-time processing',
      secure: 'PCI-DSS, encryption at rest/transit',
      assure: 'False positive rate, detection latency, audit trail',
    },
    complexity: 'Complex',
  },
  manufacturing: {
    challenges: ['Quality inspection automation', 'Supply chain optimization', 'Predictive maintenance'],
    agents: [
      { name: 'Inspection Agent', desc: 'Analyzes sensor data and visual inputs to detect defects in real-time on the production line.', icon: '01', color: 'cyan' },
      { name: 'Planning Agent', desc: 'Optimizes production schedules based on demand forecasts, inventory levels, and resource availability.', icon: '02', color: 'teal' },
      { name: 'Maintenance Agent', desc: 'Predicts equipment failures from telemetry data and schedules preventive maintenance windows.', icon: '03', color: 'emerald' },
    ],
    lifecycle: {
      context: 'IoT sensor data + production logs',
      build: 'Edge agents + cloud orchestrator',
      secure: 'OT/IT network segmentation, access controls',
      assure: 'Defect escape rate, downtime reduction, cost savings',
    },
    complexity: 'Complex',
  },
  retail: {
    challenges: ['Personalized customer experiences', 'Inventory management', 'Customer support automation'],
    agents: [
      { name: 'Personalization Agent', desc: 'Builds real-time customer profiles and delivers tailored product recommendations across channels.', icon: '01', color: 'cyan' },
      { name: 'Inventory Agent', desc: 'Forecasts demand, manages stock levels, and triggers automated reordering workflows.', icon: '02', color: 'teal' },
      { name: 'Support Agent', desc: 'Handles customer inquiries, processes returns, and escalates complex issues to human agents.', icon: '03', color: 'emerald' },
    ],
    lifecycle: {
      context: 'Customer behavior + product catalog',
      build: 'Multi-channel agents, recommendation engine',
      secure: 'PII protection, consent management',
      assure: 'Conversion lift, response accuracy, satisfaction scores',
    },
    complexity: 'Moderate',
  },
  other: {
    challenges: ['Process automation', 'Customer support', 'Data analysis & insights'],
    agents: [
      { name: 'Orchestrator Agent', desc: 'Coordinates workflows across departments, routes tasks, and manages handoffs between specialized agents.', icon: '01', color: 'cyan' },
      { name: 'Processing Agent', desc: 'Executes domain-specific tasks — data extraction, document analysis, or decision support.', icon: '02', color: 'teal' },
      { name: 'Integration Agent', desc: 'Connects to external systems via APIs and MCP tools, syncs data, and handles error recovery.', icon: '03', color: 'emerald' },
    ],
    lifecycle: {
      context: 'Domain data + system integrations',
      build: 'Modular agent graph, tool-use patterns',
      secure: 'Role-based access, input validation',
      assure: 'Task completion rate, error recovery, latency SLAs',
    },
    complexity: 'Simple',
  },
};
