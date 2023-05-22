import axiosClient from "../axiosClient";

const orderAPI = {
  addOrder: (order) => {
    const url = `order/user`;
    return axiosClient.post(url, order);
  },

  getOrder: () => {
    const url = `order/user`;
    return axiosClient.get(url);
  },

  getOrderPending: () => {
    const url = `order/user/pending`;
    return axiosClient.get(url);
  },

  updateOrderPending: (order) => {
    const url = `order/user`;
    return axiosClient.put(url, order);
  },
};

export default orderAPI;
