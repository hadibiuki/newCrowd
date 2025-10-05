import { toQueryString } from '~/composables/useAxios';
const axios = useAxios();
const USER_PATH = 'api/v1/';

export async function getAllInvestmentsApi(filter: object) {
  const query = toQueryString(filter);

  return await axios.get(USER_PATH + `Investments/History${query}`);
}

export async function getInvestmentsDetailApi(projectId: number) {
  return await axios.get(`${USER_PATH}Investments/Details/${projectId}`);
}
