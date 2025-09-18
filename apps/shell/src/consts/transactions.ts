export enum TransactionStateEnum {
  ALL = 0,
  FAILED_TO_SETTLEMEMNT = 7,
  IN_SETTLEMENT_PROGRESS = 5,
  PENDING = 3,
  SUCCESS = 1,
  UNSUCCESS = 2,
}

export enum TransactionTypeEnum {
  ALL = 0,
  DEPOSIT_WHIT_RECEIPT = 5, //"واریز از طریق فیش"
  INTRODUCTION = 9, //"معرفی"
  INVESTMENT = 1, //"سرمایه گذاری"
  INVESTMENT_PROFIT = 10, //"سود سرمایه گذاری"
  INVESTMENT_RETURN = 6, //"بازگشت اصل سرمایه"
  INVESTMENT_RETURN_FUNDS = 7, //"استرداد وجه سرمایه گذاری"
  MODIFICATION = 8, //"اصلاح سند"
  WALLET_CHARGE = 2, //"شارژ داریی"
  WALLET_SETTLMENT = 3, //"تسویه حساب داریی"
}
