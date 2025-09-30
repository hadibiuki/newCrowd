// import { toQueryString } from '~/composables/useAxios';
const axios = useAxios();
const USER_PATH = 'api/v1/';

export async function getUserProfileInformationApi() {
  return await axios.get(USER_PATH + `Users/GetUserProfileInformation`);
}

export async function showNickNameToOtherUsersApi(legual = true) {
  return await axios.patch(USER_PATH + `Users/ChangeNickNameVisibility`, null, { legual });
}

export async function UpdateUserDataApi(body: object) {
  return await axios.patch(USER_PATH + 'Users/UpdateData', body);
}
