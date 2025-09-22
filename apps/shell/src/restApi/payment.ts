// import { toQueryString } from '~/composables/useAxios';
const axios = useAxios();
const USER_PATH = 'api/v1/';

export async function getUserPaymentsSummeryApi() {
  return await axios.get(USER_PATH + `Payments/UserActivitySummary`);
}
