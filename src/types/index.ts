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
  status?: number;
}
export interface CreateClass {
  id?: number;
  name?: string;
  heldDate?: Date;
  duration?: number;
  courseDetail?: TypeCourse;
}
export interface SemianarType {
  category?: string;
  class?: string;
  classId?: number;
  courseId?: number;
  courseSubject?: string;
  divisionId?: number;
  heldDate?: string;
  id?: number;
  isActive?: boolean;
  isBelongHRMS?: boolean;
  isPublishNow?: boolean;
  isRightToICU?: boolean;
  order?: number;

  publishEnd?: string;
  publishStart?: string;
  remark?: string;
  score?: number;
  seminarDescription?: string;
  seminarName?: string;
  status?: number;
  thumbnailId?: number;
  totalDuration?: number;
  videos: any;
}
