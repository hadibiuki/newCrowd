import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
const token = () =>
  // `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5ZTk5ZjhlZi1hZmVmLTQ2M2QtODZkYy1lZTQ2ZGU1YWFlM2EiLCJqdGkiOiI3MDJjNjM1MGQwZmI1YjBiMDA0YTA0NTM4OTFjZTljNTEwNWYyMTM3YmFkNGUwZDA2ZTU1ZWIxMjdhMTAxNTMwMjhlZjdmMjljZWIyMjVlZiIsImlhdCI6MTc1ODM0OTI3Ny4wMTQxMDEsIm5iZiI6MTc1ODM0OTI3Ny4wMTQxMDksImV4cCI6MTc4OTg4NTI3Ni45OTA3MTgsInN1YiI6IjYzNTUiLCJzY29wZXMiOlsiKiJdfQ.qkEAekZfzsymoMzpa8tUrYobCcDoLEH02YaSzX3pz27fG3AWuUr86mT05AKSvK_XCcg8OTp-90O7CyrlHH9qep78ssyPxvlvjfFwZclUDRZPowLVFAZ8GeaNCIp978WQc5sXVqwOtFY-QjUFDZEpXt0ibYJRyiX9MDirmlVcbWTZG_04MfnLx8LqxKocP1omJsrJWLFamHV4vPnsCrRc1AOr57aLZwl8BoeOkum_oWrXPAuxNoTh3m4DBrT0fkYZoZZeVdYwRkc9dJx4TVXlW7Cey74M-fW78Vg6npRjHA38A8iB0Wrx9vfbvKJjIYqPRFRiQOV-ISTI5_XhyC1U0qGnsmLvH9WmW_cJs5bxBAiAExcMhncVK9JmDCTCA_fOwTKGsqiFgBFtUlX6L_bIjnnv6MR4x97WSI0qW52eblSH1Ku6kR0DuuQbvDb2m8bPLwtClSKBv8I5dtXusgee-tJVtj_rMfmR2k7CRUuMGOuYiHPJyRCyh-c6TaqMWygaZqb_TzsVvUD8JO-VZXqeJdAmYHF7SH8hoJy-x9M2NYyw95inPkucZe2nsurW18tzNod2l2mrZbMmz5JthAnXw14a9WUvMqEMIhAGXHZgPfPNk6tG_g5YZqq6esuRJ_DUQXNGZhtLyYZM3V0ccbo1Nl9snsivTwsbYarzch_U9us`;
  `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5ZTk5ZjhlZi1hZmVmLTQ2M2QtODZkYy1lZTQ2ZGU1YWFlM2EiLCJqdGkiOiJlNzE3N2UxZGI4N2M5NWRmZjRhOWNlOTFlY2ExYTE1ZTg5YjA4N2NkMDM1YzFmZTlhNDJiYjRjOTNjZmU1MDdjNjQ1MzAyZGVjNTI3MjFkNiIsImlhdCI6MTc0ODQ0MDA3NS45MzU1MzQsIm5iZiI6MTc0ODQ0MDA3NS45MzU1MzcsImV4cCI6MTc3OTk3NjA3NS44OTYyNjMsInN1YiI6Ijk3MyIsInNjb3BlcyI6WyIqIl19.FVpR6dA8Q_Myu_6H955k6k_v6UKFAJDSSDgs9-uvfNJlPluxhHObRePF_IiqiacdF8kaU0iTQ8x1w4oS2NueWXRYJ1n2IZTNvQzvri1IaVvSqsMfMImLzWsN3dTPoy25sKb4Q7Do4CebHf0c6C-XO9navfYUapDCiVWPSxinAU_2dAiJK5-SHlgVkD-v3uwaQyQJhHF8veLsMyYgHUg8WasUr0QlP7gT1V8WIuQiP935GwLSiagk74AIxtI8VNbFUOmogFAcQTt7qcon3piOmdtNBsFaxkl7W7d6FSPCgTssdg5wAvNYHKUHqslBvzl4OARJ0JSUNh4Z6sarGbi6R4-blsGBamLN2SoknQLgCKhoWH5Fz-S45vkgJ_u7wiFeZaDAvrXAd1LfNtk_H5H6k9OTqDMP5lLE2hI_zbdvn6lGpJhuD26pmyK0RTT7HBgvHj0rnofjPFncJ7B0rjd_4pp2UKW9q9bfUdulV-ghksFfY3T93phQyFxCT4Gdn_loXwj0yiyTQld2YSN8uk82wHFAaImDUesqGPIyevawJqqWpn3lscaTOSqMvu6mXmRkNhT0O8EqQYh0GJ1ms--nm7Vk_rCY7tUO1CnrwmI3zFc1n5WzU2ETGrtzMiuayXoZ8w37Da3YOuxtTl3tb87QYoIn_DcyNddC-BrsaxS1xUM`  
// Factory function to create axios instance
function createAxios(): AxiosInstance {
  const config: AxiosRequestConfig = {
    baseURL: 'https://zarincrowd-develop.c68.darkube.app/',
    headers: {
      Authorization: `Bearer ${token()}` || null,
      'Content-Type': 'application/json',
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
