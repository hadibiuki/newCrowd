import { toQueryString } from '~/composables/useAxios';
const axios = useAxios();
// const ADMIN_PATH = "api/admin/v1/"
const USER_PATH = 'api/v1/';

export async function getAllnotificationsApi(filter: object) {
  const query = toQueryString(filter);

  return await axios.get(USER_PATH + `Notifications${query}`);
}

// export async function notificationsByIdRead(isRead, pageNumber, pageSize) {
//     // return await getData(USER_PATH + `Notifications?PageNumber=${pageNumber}&PageSize= ${pageSize}${isRead !== undefined ? '&IsRead=' + isRead : null}`)
//     return await getData(USER_PATH + `Notifications?PageNumber=${pageNumber}&PageSize= ${pageSize}`)

// }

export async function notificationMarkAsReadApi(id: string) {
  return await axios.patch(USER_PATH + `Notifications/MarkAsRead/${id}`);
}

export async function notificationMarkAllAsReadApi() {
  return await axios.patch(USER_PATH + `Notifications/MarkAllAsRead`);
}
