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
export interface Speaker {
  id: number;
  title: string;
  email: string;
  fullName: string;
}
export interface InfoTimeSpan {
  id?: number;
  videoId?: number;
  time?: number;
  description?: string
}
export interface InfoVideoUser{
  id?: number;
  duration?: number;
  title?: string;
  languageVideoId?: number;
  asTrailer?: boolean;
  videoName?: string;
  streamUrl?: string;
  tags?: string ;
  status?: number;
  size?: number;
  type?: string;
  metaData?: string;
  seminarId?: number;
  createDateTime?: string;
  speakers?: Speaker[] | null;
  viewed?: boolean;
  viewedAll?: boolean;
  timeSpanVideos?: InfoTimeSpan[];
  isTheLastViewed?: boolean;
  totalDuration?: number;
}

export interface ViewHistoryAddDto {
  userId?: number;
  seminarId?: number;
  videoId?: number;
  viewDuration?: number;
}