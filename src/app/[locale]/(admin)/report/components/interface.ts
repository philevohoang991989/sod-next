export type reportColumn = {
  id: string;
  index?: number;
  gradeName?: string;
  staffName?: string;
  postTitle?: string;
  browsingRateSec?: any;
};
export type reportHitRateByGrade = {
  seminarId: string;
  index?: number;
  seminarName?: string;
  viewGroupByGrade?: string;
  totalViewDuration?: string;
  totalStaffCount?: string;
};
export type itemAccumulatedViewDuration = {
  staffWatchedCount?: number;
  totalViewDuration?: number;
  watchTime?: string;
};
export type reportHitRateByAccumulatedDuration = {
  index?: number;
  seminarId?: number;
  seminarName?: string;
  accumulatedViewDuration?: itemAccumulatedViewDuration[];
};
export type reportVideoStatistic = {
  index?: number;
  staffId?: number;
  rank?: string;
  post?: string;
  staffName?: string;
  classId?: number;
  classDuration?: number;
  sodcId?: number;
  sodcDesc?: string;
  sodsId?: number;
  sodsDesc?: string;
  sodsLength?: string;
};
export type reportColumnSODUser = {
  index?: number;
  seminarId?: number;
  seminarName?: string;
  status?: number;
  divisions?: string;
  heldDate?: string;
  totalDuration?: number;
  videoSize?: number;
  TargetParticipant?: string;
};
export type reportScoringReport = {
  index?: number;
  seminarId?: number;
  seminarName?: string;
  totalScoredCount?: number;
  score1Count?: number;
  score2Count?: number;
  score3Count?: number;
  score4Count?: number;
  score5Count?: number;
  score6Count?: number;
  score7Count?: number;
  score8Count?: number;
  score9Count?: number;
  score10Count?: number;
  averageScore?: number;
};
export type reportRecommendedList = {
  index?: number;
  seminarId?: number;
  seminarName?: string;
  addedDate?: string;
  removedDate?: string;
};

export type reportSODAdmin = {
  index?: number;
  seminarId?: number;
  seminarName?: string;
  status?: any;
  courseCurriculum?: string;
  courseSubject?: string;
  division?: string;
  publishedDate?: string;
  heldDate?: string;
  totalDuration?: number;
  totalVideoSize?: number;
  totalPart?: number;
};
