export enum TicketStatusEnum {
  ALL = 'ALL',
  CLOSED = 6, //"بسته"
  INPROGRESS = 2, // "در حال بررسی"
  NEW = 1, // "جدید"
  SUPPORTRESPONSE = 3, // "پاسخ پشتیبان"
  USERRESPONSE = 4, //"پاسخ کاربر"
}

export enum TicketCategoryEnum {
  FINANCIAL = 4, // 'مالی'
  FUNDRAISING = 3, // 'جذب سرمایه'
  INVESTMENT = 2, // 'سرمایه‌گذاری'
  OTHER = 5, // 'سایر'
  TECHNICAL = 1, //'فنی'
}
