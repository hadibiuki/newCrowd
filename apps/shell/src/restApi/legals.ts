const axios = useAxios();
const USER_PATH = 'api/v1/';

export async function sendFinancialInstitutionApi(body: object){
  return await axios.post(USER_PATH + `Legals/Sejam/Otp/Send`, body);
}

export async function VerifyFinancialInstitutionApi(body: object){
  return await axios.post(USER_PATH + `Legals/Sejam/Otp/Validate`, body);
}
