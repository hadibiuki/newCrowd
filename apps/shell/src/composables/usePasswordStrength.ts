export function usePasswordStrength() {
  const passwordStrength = ref<string>('ضعیف');
  const checks = ref({
    length: {
      message: 'حداقل طول 8 کاراکتر',
      validate: false,
    },
    lowercase: {
      message: 'حداقل یک حرف کوچک انگلیسی',
      validate: false,
    },
    number: {
      message: 'حداقل یک عدد',
      validate: false,
    },
    specialChar: {
      message: 'حداقل یک کاراکتر خاص (!@#$*)',
      validate: false,
    },
    uppercase: {
      message: 'حداقل یک حرف بزرگ انگلیسی',
      validate: false,
    },
  });

  function checkPasswordStrength(password: string): void {
    // بررسی شرایط
    checks.value.length.validate = password.length >= 8;
    checks.value.uppercase.validate = /[A-Z]/.test(password);
    checks.value.lowercase.validate = /[a-z]/.test(password);
    checks.value.number.validate = /\d/.test(password);
    checks.value.specialChar.validate = /[@$!%*?&#]/.test(password);

    // تعیین قدرت رمز عبور
    const strengthScore = Object.values(checks.value).filter(item => item.validate).length;
    switch (strengthScore) {
      case 1:
        passwordStrength.value = ' خیلی ضعیف';
        break;
      case 2:
        passwordStrength.value = 'ضعیف';
        break;
      case 3:
        passwordStrength.value = 'متوسط';
        break;
      case 4:
        passwordStrength.value = 'قوی';
        break;
      case 5:
        passwordStrength.value = 'خیلی قوی';
        break;
      default:
        passwordStrength.value = 'خیلی ضعیف';
    }
  }

  return {
    checkPasswordStrength,
    checks,
    passwordStrength,
  };
}
