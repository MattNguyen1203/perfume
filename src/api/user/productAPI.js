import axiosClient from "../axiosClient";

const productAPI = {
  getAll: () => {
    const url = "products";
    return axiosClient.get(url);
  },
  get: (id) => {
    const url = `products/${id}`;
    return axiosClient.get(url);
  },
  filter: (params) => {
    const url = `products`;
    return axiosClient.get(url, { params });
  },
  login: (account) => {
    const url = `auth/login`;
    return axiosClient.post(url, account);
  },
  getDataSidebar: (params) => {
    const url = `products/distinct/${params[0]}-${params[1]}-${params[2]}`;
    return axiosClient.get(url);
  },
};

export default productAPI;
