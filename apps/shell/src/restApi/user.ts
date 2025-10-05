// import { toQueryString } from '~/composables/useAxios';

const axios = useAxios();
const USER_PATH = 'api/v1/';

export async function getSearchUserByPhoneApi(phoneNumber: string) {
  return await axios.get(USER_PATH + `Users?phoneNumber=${phoneNumber}`);
}
