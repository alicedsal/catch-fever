// accepts unc.edu and any subdomain (live.unc.edu, email.unc.edu, ...)
const UNC_EMAIL = /^[^\s@]+@([a-z0-9-]+\.)*unc\.edu$/;

export function isUncEmail(email: string) {
  return UNC_EMAIL.test(email.trim().toLowerCase());
}