const toBase64 = (arrayBuffer: ArrayBuffer): string => {
  const uint8Array = new Uint8Array(arrayBuffer);
  const numberArray = Array.from(uint8Array);

  return btoa(numberArray.map((num) => String.fromCharCode(num)).join(''))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

export default toBase64;
