export type YearMonth = `${number}-${number}`;
export type TimelineDate = YearMonth | 'present';

/** A headline figure shown under a card's text, e.g. { value: '96.7%', label: 'success' }. */
export interface Metric {
    value: string;
    label: string;
}

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
    metrics?: Metric[];
}

export interface Education extends CareerEntry {
    degree: string;
    institution: string;
    honors?: string;
}

export interface ProjectVideo {
    src: string;
    poster: string;
    width: number;
    height: number;
    label: string;
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
    /** Looping clips shown instead of the image, stacked and kept in sync with the first. */
    videos?: ProjectVideo[];
    metrics?: Metric[];
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
    /** Short label shown on the timeline node. */
    label: string;
    title?: string;
    institution?: string;
    start: YearMonth;
    end: TimelineDate;
}

/** A timeline event with its details resolved from the referenced entry. */
export interface ResolvedTimelineEvent extends TimelineEvent {
    title: string;
    institution: string;
    logo: string;
}
