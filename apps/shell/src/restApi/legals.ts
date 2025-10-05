const axios = useAxios();
const USER_PATH = 'api/v1/';

export async function sendFinancialInstitutionApi(body: object) {
  return await axios.post(USER_PATH + `Legals/Sejam/Otp/Send`, body);
}

export async function VerifyFinancialInstitutionApi(body: object) {
  return await axios.post(USER_PATH + `Legals/Sejam/Otp/Validate`, body);
}

export async function getOperatorListsApi() {
  return await axios.get(USER_PATH + `Legals/Operators`);
}

export async function sendInviteForOperatorApi(body: object) {
  return await axios.post(USER_PATH + 'Legals/Operators/invite', body);
}

export async function getAllInvitationApi() {
  return await axios.get(USER_PATH + `Users/Me/Invitations`);
}

export async function AcceptInvitationsOperatorsApi(invitation_code: string, is_accepted: boolean) {
  return await axios.post(USER_PATH + `Users/Me/Invitations/${invitation_code}`, { is_accepted });
}

export async function deletOperatorApi(id: string) {
  return await axios.delete(USER_PATH + `Legals/Operators/${id}`);
}

export async function InvitationsOperatorsApi(invitation_code: string) {
  return await axios.get(USER_PATH + `Users/Me/Invitations/${invitation_code}`);
}
