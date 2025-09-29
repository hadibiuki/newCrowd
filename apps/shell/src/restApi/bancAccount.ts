import { toQueryString } from '~/composables/useAxios';
const axios = useAxios();
const USER_PATH = 'api/v1/';

export async function getBankAccountsApi(
  filter: object = { PageNumber: 1, PageSize: 50 },
  legual = false
) {
  const query = toQueryString(filter);

  return await axios.get(USER_PATH + `BankAccounts${query}`, { legual:legual });
}

export async function addBankAccountApi(body: object, legual = false) {
  return await axios.post(USER_PATH + 'BankAccounts', body, { legual:legual });
}

// export async function deleteBankAccount(id) {
//     return await deleteData(USER_PATH + `BankAccounts/${id}`)
// }

export async function setCartAsLegualDefaultApi(bankId: string) {
  return await axios.patch(USER_PATH + `BankAccounts/${bankId}/setDefault`);
}

export async function getBankInfoByNameApi(bankPersianName: string) {
  return await axios.get(USER_PATH + `Banks/InfoByName?name=${bankPersianName}`);
}

export async function getBankLogoByNameApi(bankPersianName: string) {
  return await axios.get(USER_PATH + `Banks/LogoByName?name=${bankPersianName}`);
}