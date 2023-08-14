// export const BASE_URL = 'http://194.233.77.183:3001';
// export const BASE_URL = 'https://my-shamchiroq.uz';

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://my-shamchiroq.uz"
    : "http://localhost:3002";

export const BASE_URL_API = `${BASE_URL}/api`;
