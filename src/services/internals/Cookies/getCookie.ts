export function getCookie(name: string): string  {
    const matches = document.cookie.match(new RegExp(
      `(?:^|; )${encodeURIComponent(name)}=([^;]*)`
    ));
    return matches ? decodeURIComponent(matches[1]):'';
  }
