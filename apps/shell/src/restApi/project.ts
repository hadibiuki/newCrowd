import { toQueryString } from '~/composables/useAxios';
const axios = useAxios();
const USER_PATH = 'api/v1/';

export async function getAllProjects(filter: object) {
  const query = toQueryString(filter);

  return await axios.get(USER_PATH + `Projects/AllPaginated${query}`);
}
