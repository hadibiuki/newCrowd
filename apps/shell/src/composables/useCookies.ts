export function useCookies() {
  const setCookie = (name: string, value: object | string, days = 7): void => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    const encodedValue = encodeURIComponent(
      typeof value === 'string' ? value : JSON.stringify(value)
    );
    document.cookie = `${encodeURIComponent(name)}=${encodedValue}; expires=${expires}; path=/`;
  };
  const getCookie = (name: string): string | undefined => {
    const cookies = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${encodeURIComponent(name)}=`));

    return cookies?.split('=')[1];
  };
  const deleteCookie = (name: string): void => {
    document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  };

  return {
    deleteCookie,
    getCookie,
    setCookie,
  };
}
