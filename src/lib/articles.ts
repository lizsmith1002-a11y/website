export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  content: string;
};

export const articles: Article[] = [
  {
    slug: "understanding-board-chair-role",
    title: "Understanding the Board Chair Role",
    excerpt: "The Board Chair is the leader of the board and plays a crucial role in governance. Learn about their responsibilities and how to excel in this position.",
    date: "2025-12-15",
    category: "Leadership",
    content: `
The Board Chair is one of the most important leadership positions in any organization. As the presiding officer, the Chair is responsible for ensuring effective governance and guiding the board toward achieving its mission.

## Key Responsibilities

1. **Leading Board Meetings**: The Chair sets the agenda, facilitates discussions, and ensures productive meetings.
2. **Liaison with Management**: Acts as the primary connection between the board and the CEO.
3. **Board Development**: Oversees recruitment, orientation, and evaluation of board members.
4. **Strategic Oversight**: Ensures the board focuses on strategic priorities.

## Skills for Success

Effective Board Chairs demonstrate strong facilitation skills, emotional intelligence, and the ability to build consensus among diverse perspectives.
    `,
  },
  {
    slug: "treasurer-financial-oversight",
    title: "The Treasurer: Financial Oversight and Stewardship",
    excerpt: "Discover the essential duties of a board treasurer and how they ensure financial health and accountability in organizations.",
    date: "2025-12-10",
    category: "Finance",
    content: `
The Treasurer plays a vital role in ensuring an organization's financial health and sustainability. This position requires both financial acumen and governance expertise.

## Primary Duties

1. **Financial Reporting**: Present clear financial reports to the board.
2. **Budget Oversight**: Lead the budget development and monitoring process.
3. **Audit Coordination**: Work with auditors to ensure compliance.
4. **Investment Management**: Oversee investment policies and performance.

## Best Practices

Successful treasurers communicate complex financial information in accessible ways and ensure all board members understand the organization's financial position.
    `,
  },
  {
    slug: "secretary-governance-records",
    title: "Board Secretary: Guardian of Governance Records",
    excerpt: "Learn about the Secretary's role in maintaining accurate records, managing communications, and ensuring compliance.",
    date: "2025-12-05",
    category: "Governance",
    content: `
The Board Secretary ensures that the organization maintains accurate records and follows proper governance procedures. This often-underappreciated role is essential for legal compliance.

## Core Responsibilities

1. **Meeting Minutes**: Record accurate and comprehensive meeting minutes.
2. **Document Management**: Maintain official records and corporate documents.
3. **Notice and Communications**: Handle official board communications.
4. **Compliance**: Ensure adherence to bylaws and legal requirements.

## Tips for Excellence

Stay organized, understand legal requirements, and maintain confidentiality while ensuring transparency in governance.
    `,
  },
  {
    slug: "audit-committee-member",
    title: "Serving on the Audit Committee",
    excerpt: "An in-depth look at audit committee responsibilities, qualifications, and best practices for effective oversight.",
    date: "2025-11-28",
    category: "Committees",
    content: `
The Audit Committee provides critical oversight of financial reporting, internal controls, and risk management. Members must bring both independence and expertise.

## Key Functions

1. **Financial Statement Review**: Ensure accuracy of financial reporting.
2. **Internal Controls**: Evaluate and monitor control systems.
3. **External Auditor Relations**: Select and oversee independent auditors.
4. **Risk Assessment**: Identify and monitor organizational risks.

## Qualifications

Audit committee members should have financial literacy, with at least one member qualifying as a financial expert.
    `,
  },
  {
    slug: "new-board-member-guide",
    title: "First-Time Board Member Guide",
    excerpt: "Essential guidance for those new to board service, covering expectations, responsibilities, and how to make an impact.",
    date: "2025-11-20",
    category: "Getting Started",
    content: `
Joining a board for the first time can be both exciting and overwhelming. This guide helps new members understand their role and prepare for effective service.

## Understanding Your Role

1. **Fiduciary Duty**: Act in the organization's best interest.
2. **Duty of Care**: Make informed decisions through active participation.
3. **Duty of Loyalty**: Put the organization first, avoiding conflicts of interest.

## Getting Started

- Review governing documents and recent board materials
- Meet with the Chair and CEO
- Understand the organization's mission, strategy, and finances
- Ask questions and engage actively from day one

## Making an Impact

Bring your unique perspective, prepare for meetings, and don't be afraid to ask clarifying questions.
    `,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter((article) => article.category === category);
}
