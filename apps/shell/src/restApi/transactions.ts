import { toQueryString } from '~/composables/useAxios';

const axios = useAxios();
// const ADMIN_PATH = "api/admin/v1/"
const USER_PATH = 'api/v1/';

export async function getAllTransacionsApi(filter: object) {
  const query = toQueryString(filter);

  return await axios.get(USER_PATH + `Payments/UserPaymentsPaginated${query}`);
}

export async function getAllPlatformsApi() {
  return await axios.get(USER_PATH + `Platforms`);
}
