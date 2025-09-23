// import { toQueryString } from '~/composables/useAxios';
const axios = useAxios();
const USER_PATH = 'api/v1/';

export async function getUserBalanceApi() {
  return await axios.get(USER_PATH + `Balance`);
}

export async function sendWithdrawRequestApi(body: object) {
  return await axios.post(USER_PATH + 'Payments/Withdraw', body);
}
