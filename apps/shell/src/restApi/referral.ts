import { toQueryString } from '~/composables/useAxios';
const axios = useAxios();
const USER_PATH = 'api/v1/';

export async function getUserInviteUsersReportReferralsApi() {
  return await axios.get(USER_PATH + `Referrals/InvitedUsersReport`);
}

export async function getUserReferralCodeApi() {
  return await axios.get(USER_PATH + `Referrals/Code`);
}

export async function getUserReferralStatisticsApi(filterDate: string | null = null) {
  return await axios.get(
    USER_PATH + `Referrals/Statistics${filterDate ? `?filterDate=${filterDate}` : ''}`
  );
}

export async function getUserInvitedUsersReportDetailPaginatedApi(filter: object) {
  const query = toQueryString(filter);

  return await axios.get(USER_PATH + `Referrals/InvitedUsersPaginated${query}`);
}
