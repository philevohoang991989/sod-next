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
export type reportVideoStatistic={
    index?: number;
    staffId?: number;
    rank?:string;
    post?: string;
    staffName?:string;
    classId?: number;
    classDuration?: number;
    sodcId?: number;
    sodcDesc?: string;
    sodsId?: number;
    sodsDesc?: string;
    sodsLength?: string
}