export type YearMonth = `${number}-${number}`;
export type TimelineDate = YearMonth | 'present';

interface CareerEntry {
    id: string;
    location: string;
    date: string;
    description: string;
    link: string;
    logo: string;
}

export interface Experience extends CareerEntry {
    title: string;
    company: string;
}

export interface Education extends CareerEntry {
    degree: string;
    institution: string;
    honors?: string;
}

export interface Project {
    title: string;
    tech: string;
    description: string;
    summary: string;
    category: string;
    link?: string;
    image: string;
    imageId: string;
    imageWidth: number;
    imageHeight: number;
    imageAlt: string;
    imageWebp?: string;
    imageWebpSrcset?: string;
    imageCredit?: { text: string; url: string };
}

export interface Award {
    title: string;
    year: string;
    location: string;
    description: string;
    icon: string;
    image?: string;
    link: string | null;
}

export interface PortfolioData {
    experience: Experience[];
    education: Education[];
    projects: Project[];
    skills: Record<string, string[]>;
    awards: Award[];
}

export interface TimelineEvent {
    type: 'academic' | 'professional' | 'exchange';
    ref: string;
    title: string;
    institution: string;
    start: YearMonth;
    end: TimelineDate;
    logo: string;
}
