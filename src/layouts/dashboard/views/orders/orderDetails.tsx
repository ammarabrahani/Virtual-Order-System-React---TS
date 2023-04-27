import { useEffect, useState } from "react";
import { Button, Drawer, message } from "antd";
import type { DrawerProps } from "antd";
import "../../../../assets/scss/orderDetails.scss";
import "../../../../assets/scss/updatestock.scss";
import { accepetRejectOrders, editItem } from "../../../../services/network";
import errorHandler from "../../../../utilities/errorHandler";
import { FiPlus, FiMinus } from "react-icons/fi";
import { formatAmount } from "../../../../utilities/functions";
const OrderDetailsDrawer = ({
  visible,
  closeModal,
  viewItem,
  setVisible,
  editOrder,
  setEditOrder,
  setViewItem,
  setCount,
}: any) => {
  const [placement] = useState<DrawerProps["placement"]>("left");
  const [orderItemList, setorderItemList] = useState<any>("");
  const ORDER_ACCPETED: Boolean | any = true;
  const ORDER_DECLINED: Boolean | any = false;
  const UPDATE_ORDER: string = "UPDATE ORDER";
  const EDIT_ORDERS: string = "EDIT_ORDERS";
  const INCREMENT: string = "increment";
  const DECREMENT: string = "decrement";
  const handleAPIResponse = (response: any, type: Boolean | string) => {
    if (response.data.success === true) {
      // Success
      if (type === EDIT_ORDERS) {
        message.success("Order Updated Successfully!");
      } else if (type === ORDER_ACCPETED) {
        message.success("Order Accepted Successfully!");
      } else if (type === ORDER_DECLINED) {
        message.success("Order Declined Successfully!");
      }
      setCount((count: number) => count + 1);
    } else {
      // Error
      message.error(response.data.message);
    }
  };

  useEffect(() => {
    setorderItemList(editOrder || viewItem);
  }, [editOrder, viewItem]);

  var groupBy = function (xs: any) {
    return xs.items?.reduce((rv: any, x: any) => {
      (rv[x.principal.name] = rv[x.principal.name] || []).push(x);
      return rv;
    }, {});
  };

  let temp: any = groupBy(orderItemList);

  const manageQuantity = (
    id: string,
    key: string,
    index: number,
    type: any
  ) => {
    const itemQuantity: any = temp;
    if (type === INCREMENT) {
      if (itemQuantity[key][index].qty > -1) {
        itemQuantity[key][index].qty += 1;
      }
    } else if (type === DECREMENT) {
      if (itemQuantity[key][index].qty) {
        itemQuantity[key][index].qty--;
      }
    }

    setorderItemList({ ...viewItem, ...editOrder, itemQuantity });
  };

  const manageOrderItems = (event: any, orderId: number, type: Boolean) => {
    setVisible(false);
    if (editOrder && event.target.innerHTML === UPDATE_ORDER) {
      setEditOrder("");
      const obj: any = {};
      const items = orderItemList?.items.map((item: any, i: number) => {
        if (item.qty || item.qty === 0) {
          return {
            order_item_id: item.id,
            qty: item.qty,
          };
        }
      });
      obj.items = items;
      editItem(orderId, obj)
        .then((response) => handleAPIResponse(response, type), errorHandler)
        .catch(errorHandler)
        .finally(() => {
          // Set Loading False
        });
    } else if (viewItem) {
      setViewItem("");
      accepetRejectOrders(orderId, type)
        .then((response) => handleAPIResponse(response, type), errorHandler)
        .catch(errorHandler)
        .finally(() => {
          // Set Loading False
        });
    }
  };
  return (
    <>
      <Drawer
        title={editOrder ? "Edit Order" : "Order Details"}
        placement={placement}
        closable={false}
        onClose={closeModal}
        visible={visible}
        width={"90%"}
        key={placement}
        footer={[
          <Button
            // key="cancel"
            key="submit"
            onClick={(event) => {
              manageOrderItems(
                event,
                viewItem.id || editOrder.id,
                ORDER_DECLINED
              );
            }}
          >
            {viewItem ? "DECLINE" : "CANCEL"}
          </Button>,
          <Button
            // key="submit"
            type="primary"
            onClick={(event) => {
              manageOrderItems(
                event,
                editOrder.id || viewItem.id,
                viewItem ? ORDER_ACCPETED : EDIT_ORDERS
              );
            }}
          >
            {viewItem ? "ACCEPT" : "UPDATE ORDER"}
          </Button>,
        ]}
      >
        <div className="modal">
          <div
            style={{
              padding: "0 0px",
              boxShadow: "0 0 20px rgba(0 0 0 / 20%)",
              borderRadius: "6px",
            }}
          >
            <ul className="order_details_list">
              <li>
                <b>Retailer's Name</b>
                <span>Tester</span>
              </li>
              <li>
                <b>Retailer's Address</b>
                <span>Tester</span>
              </li>
              <li>
                <b>Date</b>
                <span>7-2-2022</span>
              </li>
              <li>
                <b>Last ELB Claim</b>
                <span>7-2-2022</span>
              </li>
              <li>
                <b>Last Purchase</b>
                <span>7-2-2022</span>
              </li>
              <li>
                <b>Month to Date Purchase</b>
                <span>7-2-2022</span>
              </li>
              <li>
                <b>Year to Date Purchase</b>
                <span>7-2-2022</span>
              </li>
              <li>
                <b>Year to Date ELB</b>
                <span>7-2-2022</span>
              </li>
            </ul>
          </div>
          <div>
            {temp &&
              Object.keys(temp).map((key, index: number) => {
                return (
                  <>
                    <div className="order_table">
                      <h2 className="title" key={index}>
                        {key}
                      </h2>
                      <div className="update_stocks_registers">
                        <table>
                          <thead>
                            <tr>
                              <th>S.No</th>
                              <th>Product</th>
                              <th>QTY</th>
                              <th>T.P</th>
                              <th>Rs</th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div className="update_stocks_registers">
                        <div className="table_wrap">
                          <table>
                            <tbody>
                              {temp[key].map((orderItems: any, i: number) => {
                                const itemPrice =
                                  orderItems.item_price.toFixed(2);
                                const itemQty = orderItems.qty;
                                const totalPrice = itemPrice * itemQty;
                                return (
                                  <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{orderItems.product_name}</td>
                                    <td>
                                      {editOrder ? (
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                          }}
                                        >
                                          <a
                                            href="#javascript"
                                            className="quantity"
                                            onClick={() =>
                                              manageQuantity(
                                                orderItems.id,
                                                key,
                                                i,
                                                INCREMENT
                                              )
                                            }
                                          >
                                            <FiPlus />
                                          </a>
                                          <span
                                            style={{
                                              padding: "0 10px",
                                            }}
                                          >
                                            {orderItems.qty}
                                          </span>
                                          <a
                                            href="#javascript"
                                            className="quantity"
                                            onClick={() =>
                                              manageQuantity(
                                                orderItems.id,
                                                key,
                                                i,
                                                DECREMENT
                                              )
                                            }
                                          >
                                            <FiMinus />
                                          </a>
                                        </div>
                                      ) : (
                                        <span
                                          style={{
                                            padding: "0 10px",
                                          }}
                                        >
                                          {orderItems.qty}
                                        </span>
                                      )}
                                    </td>
                                    <td>
                                      <b>
                                        {formatAmount(orderItems.item_price)}
                                      </b>
                                    </td>
                                    <td>
                                      {/* <b>{totalPrice.toFixed(2)}</b> */}
                                      <b>{formatAmount(totalPrice)}</b>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default OrderDetailsDrawer;
