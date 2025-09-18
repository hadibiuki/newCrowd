// import { toQueryString } from '~/composables/useAxios';

const axios = useAxios();
// const ADMIN_PATH = "api/admin/v1/"
const USER_PATH = 'api/v1/';

export async function enumsByName(name: string) {
  return await axios.get(`${USER_PATH}Enums/ByName/${name}`);
}
