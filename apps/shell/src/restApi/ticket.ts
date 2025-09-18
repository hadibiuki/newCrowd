import { toQueryString } from '~/composables/useAxios';
const axios = useAxios();
const USER_PATH = 'api/v1/';

export async function getAllTicketsApi(filter: object) {
  const query = toQueryString(filter);

  return await axios.get(USER_PATH + `Tickets${query}`);
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export async function updateTicketApi(id: string, body: object) {
  return await axios.put(USER_PATH + `Tickets/${id}`, body);
}

export async function getTicketsDetailesApi(id: string) {
  return await axios.get(USER_PATH + `Tickets/${id}`);
}

export async function createNewTicketApi(body: any, file: File) {
  const formData = new FormData();
  formData.append('title', body.title);
  formData.append('description', body.description);
  formData.append('category', body.category);
  if (file) formData.append('files[]', file);

  return await axios.post(USER_PATH + 'Tickets', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function replyTicketApi(id: string, content: string, file = null) {
  const formData = new FormData();
  formData.append('message', content);
  if (file) formData.append('files[]', file);

  return await axios.post(USER_PATH + `Tickets/${id}/reply`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
