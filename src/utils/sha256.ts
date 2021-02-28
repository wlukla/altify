const sha256 = (plain: string): Promise<ArrayBuffer> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);

  return window.crypto.subtle.digest('SHA-256', data);
};

export default sha256;
