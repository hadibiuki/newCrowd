import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const useContractOtpSchema = () => {
  const schema = toTypedSchema(
    z.object({
      otp: z.string(),
    })
  );

  return {
    schema,
  };
};
