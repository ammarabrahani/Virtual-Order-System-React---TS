import { Input, DatePicker, Button, Form, Pagination, message } from "antd";
import { useState, useEffect, useReducer } from "react";
import CustomBreadcrumb from "../../../../components/CustomBreadcrumb";
import "../../../../assets/scss/updatestock.scss";
import {
  queryParamsReducer,
  initialQueryParams,
  UPDATE_PARAM,
} from "../../../../utilities/queryParamsReducer";
import { getProducts } from "../../../../services/network";

import errorHandler from "../../../../utilities/errorHandler";
import { useParams } from "react-router-dom";
import Loader from "../../../../components/loader";
import moment from "moment";

import { updateStockProducts } from "../../../../services/network";

const UpdateStock = () => {
  const params = useParams();
  const principalId: any = params.principalId;
  const [productsList, setProductsList] = useState<any>([]);
  let today: any = moment();
  let todayDate = today.toDate();
  const [listDataQueryParams, dispatchQueryParams] = useReducer(
    queryParamsReducer,
    initialQueryParams
  );
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 1,
  });

  useEffect(() => {
    if (principalId) {
      setIsLoading(true);
      getProducts(principalId, listDataQueryParams)
        .then((res: any) => {
          if (res?.data?.success) {
            setProductsList(res.data.data.products);
            setPagination({
              current: res.data.data.pagination.current_page,
              pageSize: res.data.data.pagination.per_page,
              total: res.data.data.pagination.total,
            });
          } else {
            setProductsList([]);
            setPagination({
              current: 1,
              pageSize: 10,
              total: 1,
            });
          }
        }, errorHandler)
        .catch(errorHandler)
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [listDataQueryParams, principalId]);

  const handleTable = () => {
    dispatchQueryParams({
      type: UPDATE_PARAM,
      payload: {
        page: pagination.current,
        perPage: pagination.pageSize,
      },
    });
  };

  const breadcrumbRoutes = [
    {
      path: "/",
      breadcrumbName: "Dashboard",
    },
    {
      path: "/principals",
      breadcrumbName: "Principals",
    },
    {
      path: "",
      breadcrumbName: "stock",
    },
  ];
  const [updateStocklist, setUpdateStockList] = useState([]);
  const handleChanges = (key: any, event: any, index: number) => {
    // let data = [...initialState];
    // data[index]["id"] = id;
    // const findIndex = productsList.findIndex((val: any) => val.id === id);
    // console.log(findIndex, "findIndex");

    // initialState["id"] = id;
    // initialState[key] = event.target.value;

    // if (id) {
    //   initialState.id = id;
    // }
    // if (key === "batch_no") {
    //   initialState.batch_no = event.target.value;
    // }
    // if (key === "mfg_date") {
    //   initialState.mfg_date = event.target.value;
    // }
    // if (key === "expiry_date") {
    //   initialState.expiry_date = event.target.value;
    // }

    let stockList: any = [...productsList];

    if (key === "expiry_date") {
      const expiryDate = moment(event).format("DD-MM-YYYY");
      stockList[index]["expiry_date"] = expiryDate;
    } else if (key === "mfg_date") {
      const mfg_date = moment(event).format("DD-MM-YYYY");
      stockList[index]["mfg_date"] = mfg_date;
    } else {
      stockList[index][key] = event.target.value;
      // setProductsList([...productsList]);
    }
    setUpdateStockList(stockList);
  };

  const handleAPIResponse = (response: any) => {
    if (response.data.success === true) {
      // Success
      message.success("Product Stock Updated Successfully!");
    } else {
      // Error
      message.error(response.data.message);
    }
  };

  const postUpdateStockProduct = () => {
    const filteredStock = updateStocklist.filter((prod: any) => {
      if (
        prod.batch_no ||
        prod.mfg_date ||
        prod.expiry_date ||
        prod.expiry_date ||
        prod.trade_price ||
        prod.carton_qty
      ) {
        return {
          product_id: prod.id,
          batch_no: prod.batch_no,
          mfg_date: prod.mfg_date,
          expiry_date: prod.expiry_date,
          trade_price: prod.trade_price,
          carton_qty: prod.carton_qty,
        };
      }
    });
    const stocks: any = filteredStock.map((prod: any) => {
      if (
        prod.batch_no ||
        prod.mfg_date ||
        prod.expiry_date ||
        prod.expiry_date ||
        prod.trade_price ||
        prod.carton_qty
      ) {
        return {
          product_id: prod.id,
          batch_no: prod.batch_no ? prod.batch_no : "",
          mfg_date: prod.mfg_date ? prod.mfg_date : "",
          expiry_date: prod.expiry_date ? prod.expiry_date : "",
          trade_price: prod.trade_price ? prod.trade_price : "",
          carton_qty: prod.carton_qty ? prod.carton_qty : "",
        };
      }
    });
    if (stocks) {
      setIsLoading(true);
      updateStockProducts(stocks)
        .then((response) => handleAPIResponse(response), errorHandler)
        .catch(errorHandler)
        .finally(() => {
          // Set Loading False
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="prd_stock">
      <CustomBreadcrumb routes={breadcrumbRoutes} />
      <Button
        className="update_btns"
        key="submit"
        onClick={postUpdateStockProduct}
      >
        Update Stock
      </Button>
      <Form
        // form={stockForm}
        layout="vertical"
        name="update_stock_form"
        initialValues={{
          modifier: "public",
        }}
      >
        <div
          className="update_stocks_registers"
          style={{
            boxShadow: "0 0 20px rgba(0 0 0 / 20%)",
            borderRadius: "10px",
          }}
        >
          <div className="table_wrap">
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Active Ingredient</th>
                  <th>Strength</th>
                  <th>Pack Size</th>
                  <th>Carton Size</th>
                  <th>Batch No</th>
                  <th>Manufacturing Date</th>
                  <th>Expiry Date</th>
                  <th>Trade Price</th>
                  <th>Carton Quantity</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    {productsList.map((product: any, i: any) => {
                      return (
                        <tr key={i}>
                          <td>
                            <b>{product.name}</b>
                          </td>
                          <td>
                            <span>{product.active_ingredient}</span>
                          </td>
                          <td>
                            <span>{product.strength}</span>
                          </td>
                          <td>
                            <span>{product.pack_size}</span>
                          </td>
                          <td>
                            <span>{product.carton_size}</span>
                          </td>
                          <td>
                            <Input
                              type="number"
                              name="batch_no"
                              min={1}
                              onChange={(event: any) =>
                                handleChanges("batch_no", event, i)
                              }
                            />
                          </td>
                          <td>
                            <DatePicker
                              name="mfg_date"
                              format="DD-MM-YYYY"
                              style={{ width: "100%" }}
                              disabledDate={(current) => {
                                return current && current > moment(todayDate);
                              }}
                              onChange={(event) =>
                                handleChanges("mfg_date", event, i)
                              }
                            />
                          </td>
                          <td>
                            <DatePicker
                              name="expiry_date"
                              format="DD-MM-YYYY"
                              style={{ width: "100%" }}
                              disabledDate={(current) => {
                                return current && current < moment();
                              }}
                              onChange={(event) =>
                                handleChanges("expiry_date", event, i)
                              }
                            />
                          </td>
                          <td>
                            <Input
                              name="trade_price"
                              type="number"
                              min={1}
                              onChange={(event) =>
                                handleChanges("trade_price", event, i)
                              }
                            />
                          </td>
                          <td>
                            <Input
                              type="number"
                              min={1}
                              name="carton_qty"
                              onChange={(event) =>
                                handleChanges("carton_qty", event, i)
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "15px",
            }}
            onChange={handleTable}
            defaultCurrent={pagination.current}
            total={pagination.pageSize}
          />
        </div>
        {/* <input className="btn btn-success" type="submit" /> */}
      </Form>
    </div>
  );
};

export default UpdateStock;
