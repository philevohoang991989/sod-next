import { type LucideIcon } from "lucide-react";

export interface NavItem {
    title: string;
    href: string;
    icon: LucideIcon;
    color?: string;
    isChidren?: boolean;
    children?: NavItem[];
}

export interface TypeCourse {
    id?: number;
    name?: string;
    curriculum?: string;
    category?: string;
    modelOfTraining?: string;
    subject?: string;
    targetParticipant?: string;
    isLocal?: boolean;
    courseCode?: string;
    referenceClass?: string;
    heldDate?: Date;
    classId?: number;
  }