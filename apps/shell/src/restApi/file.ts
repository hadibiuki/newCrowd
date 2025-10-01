const axios = useAxios();
const USER_PATH = 'api/v1/';

export const uploadFileApi = async (formData: object, legual = true) =>{
  console.log({ formData });
  await axios.post(USER_PATH + `Files`, formData, { legual });
};
