export const useGetExpireCountDown = (expirationTime: string) => {
  const expirationDate = new Date(expirationTime);
  const now = new Date();
  const diffInSeconds = Math.floor((expirationDate.getTime() - now.getTime()) / 1000);

  return diffInSeconds > 0 ? diffInSeconds : 0;
};
