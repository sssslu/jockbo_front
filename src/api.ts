import axios from 'axios';
const baseUrl = import.meta.env.VITE_BASE_URL;

// 전체 족보 정보 조회
export const totalJockBoFetchApi = async () => {
  const response = await axios({
    url: `${baseUrl}/all`,
    method: 'GET',
  });
  return response.data;
};

export const jockBoListFetchApi = async () => {
  const response = await axios({
    url: `${baseUrl}/list`,
    method: 'GET',
  });
  return response.data;
};

export const jockBoListFetchApiLimited = async () => {
  const response = await axios({
    url: `${baseUrl}/listlimited`,
    method: 'GET',
  });
  return response.data;
};

export const jockBoSearchFetchApi = async (query: string) => {
  const response = await axios({
    url: `${baseUrl}/search${query}`,
    method: 'GET',
  });
  return response.data;
};

export const jockBoDetailFetchApi = async (id: number) => {
  const response = await axios({
    url: `${baseUrl}/detail/${String(id)}`,
    method: 'GET',
  });
  return response.data;
};

export const jockBo5saeFetchApi = async (id: number) => {
  const response = await axios({
    url: `${baseUrl}/4Sae/${id}`,
    method: 'GET',
  });
  return response.data;
};

export const jockBo8saeFetchApi = async (id: number) => {
  const response = await axios({
    url: `${baseUrl}/8chon/${id}`,
    method: 'GET',
  });
  return response.data;
};

// 디테일 정보 바꾸기
export const changeDetailApi = async (id: number, changeData: string) => {
  const response = await axios({
    url: `${baseUrl}/update/${id}`,
    method: 'PATCH',
    data: { ect: changeData },
  });
  return response.data;
};

// etc 포함한 족보 트리 값 가져오기
// partition은 범위 값 : 1은 1~5, 2는 5~10, 3은 10~15 ...
export const jockBoEBookFetchApi = async (partition: number) => {
  const response = await axios({
    url: `${baseUrl}/whole/${partition}`,
    method: 'GET',
  });
  return response.data;
};
