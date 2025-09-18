import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
const token = () =>
  `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5ZTk5ZjhlZi1hZmVmLTQ2M2QtODZkYy1lZTQ2ZGU1YWFlM2EiLCJqdGkiOiI1ZjJlZGY0ODEwOWI4MGE3Y2M4NTdkMDU3N2ZmNTM4NmQ4MzIxZDczMzcxODgwOGE2YTU1OGQxZjZhNmU2ZDAzOWU1NWEwMTlkMjVhMjkzMyIsImlhdCI6MTc1NjM3Mjk1Ni44MDMwNDgsIm5iZiI6MTc1NjM3Mjk1Ni44MDMwNTUsImV4cCI6MTc4NzkwODk1Ni43NzgyODgsInN1YiI6IjYzNTUiLCJzY29wZXMiOlsiKiJdfQ.ihdowZlm82fhFEn1IHMvXykvY-6lwxByL26MFtLDxgGdWM1CfiRjtv6vgFEY1cl-16Nngd27RosAqzJiprDZy-Ff8vt3b1jWBoUMl9X6G7upDNZOPqBDP-jiiFZ5VnrZoRyDM2VBvOA7FFx_ojZweJYaAXvSqQqiRfNc1k-EdYvhthL-i5qOCAOkVyR5vaQtOW8gfKkd-n4AFk0PvMLoxQV8wmt3bcI0t1YLxIXRECuQ1Vyey5DOz7CU0Y19x-KhQPsput8zFejZvGJqgktZK5gFMmCUNhy5S70fU8acCdLZ8hOm1EkubJYQX-S2_aGbADkD-Gb-y9vfAsrY2JOd32c6e-r70I5bMm4ajOCCDoX6t-3ToHm66Kw3i81BXRPl9LXxubHkmBBIOc2ES08Le46i4e7KUGHrrdbM-kgJ7VM8D8D86_Q98C8_JHJpA4wAdo8H5pW0t0XHLdTIzLxigmVcGJcOaKxTqCvrIMCd1LV4RVNCBUdjjBQ0FrcahADNp9X1PqJ_6ltxsQqFZfDNa1eb7JRPvGznB_5xqxTqLruuRhFnPf8TLJjEdR_b9XL5byPLo0e-O3gzGZNgURGyHhf-Tm8aWAtIEv392eP3idatNBfKqt4ZsEBpqJiX5y1-4LbYrIT2ayXDKSoQuA0BU_E9_T3cyRZ6RLlhYhGXep4`;
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
