import axiosInstance from "./axiosInstance";

/* ---------------- Auth API ------------------------------- */
export const loginDistribution = (loginParam: string) => {
  return axiosInstance.post("login", loginParam);
};

export const getAuthUser = () => {
  return axiosInstance.get("get-auth-user");
};
/* ================ Auth API Ends ========================== */

/* ---------------- Principals API ------------- */
export const getPrincipals = (params: any) => {
  const queryString = new URLSearchParams(params).toString();
  return axiosInstance.get(`distributions/principals?${queryString}`);
};
/* ================ Principals API Ends ======== */

/* ---------------- Products API ------------- */
export const getProducts = (
  principalId: string,
  params: any
) => {
  const queryString = new URLSearchParams(params).toString();
  return axiosInstance.get(
    `distributions/principals/${principalId}/products?${queryString}`
  );
};
/* ================ Products API Ends ======== */
/* ---------------- Stocks API ------------- */

export const downloadStock = (principalId: string) => {
  return axiosInstance.get(
    `distributions/principals/${principalId}/stock-registers/download`,
  )
}
export const updateStockProducts = (stocks: any[]) => {
  return axiosInstance.post(
    `distributions/stock-registers/add`,
    { stocks: stocks }
  )
}
/* ================ Stocks API Ends ======== */

/* ---------------- RetailersOrders API ------------- */
export const retailersOrders = (params: any) => {
  const queryString = new URLSearchParams(params).toString();
  return axiosInstance.get(`distributions/orders?${queryString}`);
}
export const accepetRejectOrders = (orderId: number, accept: Boolean) => {
  return axiosInstance.post(`distributions/orders/${orderId}/accept-reject`,
    { accept: accept }
  )
}
export const editItem = (orderId: number, items: any) => {
  return axiosInstance.patch(`distributions/orders/${orderId}`,
  items,
)}

/* ================ RetailersOrders API Ends ======== */
