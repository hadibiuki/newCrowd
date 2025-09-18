export function useShaparakError() {
  const rejectionErrorMap: Record<string, string> = {
    SiamErrorCode: '_shaparak_error.siam',
    TaxPayerCode: '_shaparak_error.tax_payer_code',
    default: '_shaparak_error.default',
    'iban:': '_shaparak_error.iban',
    'shaparak.code.72': '_shaparak_error.shaparak_code_72',
    'shaparak.code.73': '_shaparak_error.shaparak_code_73',
    'shaparak.code.74': '_shaparak_error.shaparak_code_74',
    'shaparak.code.81': '_shaparak_error.siah',
    'shaparak.code.83': '_shaparak_error.siah',
    'shaparak.code.84': '_shaparak_error.siah',
    taxProfileIbanDoesNotExist: '_shaparak_error.tax_profile',
  };
  const getRejectionError = (
    errorCode: string
  ): { key: string; params?: Record<string, string> } => {
    const iban = errorCode?.match(/IR\d{24}/)?.[0];
    const key = Object.keys(rejectionErrorMap).find(
      k => errorCode?.toLowerCase().includes(k.toLowerCase())
    );
    if (key) {
      return {
        key: rejectionErrorMap[key],
        params: iban ? { iban } : undefined,
      };
    }

    return { key: rejectionErrorMap['default'] };
  };

  return {
    getRejectionError,
  };
}
