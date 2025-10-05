// import { toQueryString } from '~/composables/useAxios';
const axios = useAxios();
const USER_PATH = 'api/v1/';

export async function signUpSendPhonNumberApi(body: object) {
  return await axios.post(USER_PATH + 'Accounts/StartAuthentication', body);
}

export async function getOtpForSignupApi(body: object) {
  return await axios.post(USER_PATH + 'Accounts/SendOtp', body);
}

export async function sendOtpForVerifiedApi(body: object) {
  return await axios.post(USER_PATH + 'Accounts/OtpLogin', body);
}

export async function loginWhitPasswordHandlerApi(body: object) {
  return await axios.post(USER_PATH + 'Accounts/PasswordLogin', body);
}

export async function validateOtpApi(body: object) {
  return await axios.post(USER_PATH + 'Accounts/ValidateOtp', body);
}

export async function sendNationalCodeApi(body: object) {
  return await axios.post(USER_PATH + 'Accounts/SaveNationalCode', body);
}

export async function getSejamOtpApi(body: object) {
  return await axios.post(USER_PATH + 'Accounts/SendSejamOtp', body);
}

export async function validateSejamOtpApi(body: object) {
  return await axios.post(USER_PATH + 'Accounts/ValidateSejamOtp', body);
}

export async function completeUserRegistrationApi(body: object, hasSejam: boolean) {
  if (hasSejam) return await axios.post(USER_PATH + 'Accounts/CompleteSejamUserRegistration', body);

  return await axios.post(USER_PATH + 'Accounts/CompleteNoSejamUserRegistration', body);
}
