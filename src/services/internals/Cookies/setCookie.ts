export function setCookie(name: string, value: string, options: Record<string, string | boolean | number | Date> = {}) {
  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  for (const optionKey in options) {
    updatedCookie += `; ${optionKey}`;
    const optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += `=${optionValue}`;
    }
  }
  // updatedCookie += '; SameSite=None';
  // updatedCookie += '; Secure';   
  updatedCookie += '; SameSite=Lax';  
  document.cookie = updatedCookie;
}
