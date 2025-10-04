import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
const token = () =>
  // `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5ZTk5ZjhlZi1hZmVmLTQ2M2QtODZkYy1lZTQ2ZGU1YWFlM2EiLCJqdGkiOiJhMDc1ZWQ5YmQ3MmY0ZTFiYTllZTA1MjFjZjA3MzZjZTczZjViMTc0ZWEzOTcxODhjMGIwYTQ0MjhkY2U4M2M4NTc2MjBhMTczNTE4YmQxNyIsImlhdCI6MTc1OTE0MTM2Ni4zNDgxNzcsIm5iZiI6MTc1OTE0MTM2Ni4zNDgxODUsImV4cCI6MTc5MDY3NzM2Ni4yNzA0OTUsInN1YiI6IjEwMDUzIiwic2NvcGVzIjpbIioiXX0.NqGqEi6OMVpCuhXch5mVEFzi6U5rds_TVhCr4WrQqTgn73xLf-5pwBKpXtCgIho8gdmvIe1_YB6GShWkh02-iCVF28SbbTkw6mNPj0FU5Z0EI3umnzM8VFRuZf14LRUEisAMcaLlMNOe5aMOltLioa46ZZVX40tu5CThl-EcAIQ8IXiPf-9FdO-gxOQzuaKsqS8H27DIHt1J2ET-JEyGTDeb9FFRB0NU5j7FMpU8Y4QDPL89hcw_oxG5zmzFuFppDhCQPwNbWmwz1ZCQMZdWk6IanDrLfXUVtDKh1IuF2-SMGlsA54xivItk7i51pCHqiYakpFpLz8AI6oViklTzqPJVV-WEZns1gKorjl2nZWwhRZCx0C4r1p2H_s-gFwKBEtpw3ijnEW5GeeKqQ7mKLuFKaFYMkJj-B2ERH5viE94M4IU-L2dHvYDLv5ymZyDPNeurv6g8VKue4kYyvFyRpnRoJfl4rmLVRvifloI3GUu1r-U9lEMqDjTbX4c2RGPW9Qd8XQorxdp7muGJLzf6QVCvsQJJgRPOOxAbkNQTgiMA1cYMCarrYpDXRqYqetQFfrmIWqGXnf4eWhDw4nfSR7COslzZ7lBY6AnrREoGv33nmQeRVIhPmQFNakq1BqCoYfDMfLD37WC1FivKEJSPM0ecb7zNxPIhvhT53WKZ7Rg`;
  `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5ZTk5ZjhlZi1hZmVmLTQ2M2QtODZkYy1lZTQ2ZGU1YWFlM2EiLCJqdGkiOiJlNzE3N2UxZGI4N2M5NWRmZjRhOWNlOTFlY2ExYTE1ZTg5YjA4N2NkMDM1YzFmZTlhNDJiYjRjOTNjZmU1MDdjNjQ1MzAyZGVjNTI3MjFkNiIsImlhdCI6MTc0ODQ0MDA3NS45MzU1MzQsIm5iZiI6MTc0ODQ0MDA3NS45MzU1MzcsImV4cCI6MTc3OTk3NjA3NS44OTYyNjMsInN1YiI6Ijk3MyIsInNjb3BlcyI6WyIqIl19.FVpR6dA8Q_Myu_6H955k6k_v6UKFAJDSSDgs9-uvfNJlPluxhHObRePF_IiqiacdF8kaU0iTQ8x1w4oS2NueWXRYJ1n2IZTNvQzvri1IaVvSqsMfMImLzWsN3dTPoy25sKb4Q7Do4CebHf0c6C-XO9navfYUapDCiVWPSxinAU_2dAiJK5-SHlgVkD-v3uwaQyQJhHF8veLsMyYgHUg8WasUr0QlP7gT1V8WIuQiP935GwLSiagk74AIxtI8VNbFUOmogFAcQTt7qcon3piOmdtNBsFaxkl7W7d6FSPCgTssdg5wAvNYHKUHqslBvzl4OARJ0JSUNh4Z6sarGbi6R4-blsGBamLN2SoknQLgCKhoWH5Fz-S45vkgJ_u7wiFeZaDAvrXAd1LfNtk_H5H6k9OTqDMP5lLE2hI_zbdvn6lGpJhuD26pmyK0RTT7HBgvHj0rnofjPFncJ7B0rjd_4pp2UKW9q9bfUdulV-ghksFfY3T93phQyFxCT4Gdn_loXwj0yiyTQld2YSN8uk82wHFAaImDUesqGPIyevawJqqWpn3lscaTOSqMvu6mXmRkNhT0O8EqQYh0GJ1ms--nm7Vk_rCY7tUO1CnrwmI3zFc1n5WzU2ETGrtzMiuayXoZ8w37Da3YOuxtTl3tb87QYoIn_DcyNddC-BrsaxS1xUM`
  // `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5ZTk5ZjhlZi1hZmVmLTQ2M2QtODZkYy1lZTQ2ZGU1YWFlM2EiLCJqdGkiOiIzYTBkNzFjYWU3ZDljMDEyZTY3ZWEwNTUwNTg2NTQwODU4YTkzYmZiZmNhYjBiOTBiNjc0YjA1NjJjNGIzMDI0OTNhNTNmODQzMWM1YTNlMyIsImlhdCI6MTc1OTEyOTA0Mi43MDQ3MzMsIm5iZiI6MTc1OTEyOTA0Mi43MDQ3NDMsImV4cCI6MTc5MDY2NTA0Mi42NzQ3MTcsInN1YiI6IjEwMDE2Iiwic2NvcGVzIjpbIioiXX0.HR9fd_zDs0Stm40j7TH7evTFc_HJ1c8L6xwasUyFxH1-LQq7Hpy88PF3HKaE7yh-tJVWUgp8W4CaQsr1FlfaMCmNIToPJGcm5SA_mqFv0TCgDf1redyk6xGF4kLb6MlcDht_bKxglcYkTeD3Lov-1BaqWXk83vKPiLEmPbmIcNqo75Zpc6Ye34U1O1yvmD6MWKXvWJhB48oBUHiRVDVO1plfaKE5i7z7w5DJ5aw63ZVZ2qh_Yjo8rQCy9bcH0GLHC8hE6d7RBTfcx8sdWwXF4cExhHVKZ-fL8brXEZYOBKO_YN1uaVpnuxwjZdd0erJs7XIvDjN64cWdMfcfBrHgGQWhExhvbayLXeYQBwZGqdbvNq49fgXqTBytzKjQ8qHRD5qsUXhz4D-hI3Fd6LdpHYTMRNDux0p3NNY1UUalUFaI8G4IQsllwpn-SvaH0GnW4DbfZiGM5N3qx_k1710OsD9iqbRuM6J17Lh7zaFxo45KWxjpcadVEwsZVAEwBcenfWRcyPIjC3XI2dl1JtjNR38BmksKXayBIIrM51w9JpjWCZ_RWZVGQKgzOotMQ1VDU3H7e90fv_EJHyU4zpSn_M1W3wg27YqgGcxXRxsIDZwelTFaE7YIoWR-UG6HP-7AkLoV9vazerxmPqrs2lWnSvd-zVCX3LOhWSjo6Z6JKYM`;
  // Factory function to create axios instance
const isLegualAccount = () => {
  const isLegual = localStorage.getItem('isLegual');
  if (isLegual) return isLegual;

  return false;
};

function createAxios(): AxiosInstance {
  const config: AxiosRequestConfig = {
    baseURL: 'https://zarincrowd-develop.c68.darkube.app/',
    headers: {
      Authorization: `Bearer ${token()}` || null,
    },
    timeout: 10000,
  };
  const instance = axios.create(config);

  // Request Interceptor
  instance.interceptors.request.use(
    config => {
      const token = useCookie('token').value; // JWT from cookies
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      if (Object.prototype.hasOwnProperty.call(config, 'legual') && config.legual === false) {
        // explicitly disabled → do nothing
      } else if (isLegualAccount()) {
        config.headers['Legal-ID'] = isLegualAccount();
      }
      // eslint-disable-next-line no-console
      return config;
    },
    error => Promise.reject(error)
  );

  // Response Interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    error => {
      // 🔹 Build a custom error object
      const customError = {
        details: error.response?.data || null,
        isNetworkError: !error.response,
        message:
          error.response?.data?.message ||
          error.response?.statusText ||
          error.response?.data?.meta?.errorMessage ||
          'Unexpected error occurred',
        status: error.response?.status || 500,
      };

      // Handle 401 specifically
      if (customError.status === 401) {
        navigateTo('/auth/login');
      }

      return Promise.reject(customError);
    }
  );

  return instance;
}

// ✅ Expose composable
export function useAxios() {
  const instance = createAxios();

  return instance;
}

export function toQueryString(params: Record<string, any>): string {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');

  return query ? `?${query}` : '';
}
