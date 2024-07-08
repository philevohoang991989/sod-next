export enum ENDPOINT {
    BASE_URL = '',
    LIST_COURSE_HRMS= 'Course/Export/DropDown',
    CREATE_COURSE= 'Course',
    LIST_SIBLING='Seminar/:id/sibling',
    DIVISION_ALL= 'Division/Export',
    SEMINAR_DETAIL='Seminar/:id',
    CREATE_CLASS = 'Class',
    CREATE_SEMINAR ='Seminar',
    GET_THUMBNAIL='File/:id/thumbnail',
    GET_LIST_COURSE='Course',
    GET_ALL_DIVISION ='Division/Export',
    GET_LIST_LANGUAGE_VIDEO='languageVideos',
    GET_LIST_VIDEO='Video',
    ORDER_SEMINAR='Course/:id/ReorderSeminar',
    GET_DETAIL_VIDEO = 'Video/:id',
    LIST_VIDEO_NONE_SEMINAR = 'Video/Export',
    UPLOAD_VIDEO='File/Upload'
}
