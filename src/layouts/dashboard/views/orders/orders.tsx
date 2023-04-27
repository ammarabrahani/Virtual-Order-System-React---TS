import { useState, useReducer, useEffect } from "react";
import { ColumnsType } from "antd/lib/table";
import "../../../../assets/scss/orders.scss";
import { Table, PageHeader, Tooltip } from "antd";
import type { RadioChangeEvent } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Radio } from "antd";
import {
  queryParamsReducer,
  initialQueryParams,
  UPDATE_PARAM,
} from "../../../../utilities/queryParamsReducer";
import { retailersOrders } from "../../../../services/network";
import { AiOutlineEye } from "react-icons/ai";
import CustomBreadcrumb from "../../../../components/CustomBreadcrumb";
import errorHandler from "../../../../utilities/errorHandler";
import OrderDetailsDrawer from "../orders/orderDetails";
import { formatAmount } from "../../../../utilities/functions";

const Orders = () => {
  const [listDataQueryParams, dispatchQueryParams] = useReducer(
    queryParamsReducer,
    initialQueryParams
  );
  const [orders, setOrdersList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<any>("");
  const [visible, setVisible] = useState(false);
  const [editOrder, setEditOrder] = useState<Object>({});
  const [viewItem, setViewItem] = useState(false);
  const [count, setCount] = useState(0);

  const closeOrderModal = (success = false) => {
    setVisible(false);
    setEditOrder(false);
    setViewItem(false);
  };

  // const navigate = useNavigate();
  // const { Option } = Select;

  /*const handleOrder = (sort: any) => {
    // setOrderBy(sort.value);
    dispatchQueryParams({
      type: UPDATE_PARAM,
      payload: {
        orderBy: sort.value,
      },
    });
  };

  const handleColumn = (column: any) => {
    // setOrderByColumn(column.value);
    dispatchQueryParams({
      type: UPDATE_PARAM,
      payload: { orderByColumn: column.value },
    });
  };*/
  //  let icon = document.querySelector()

  // const onSearch = (searchOrders: string) => {};
  const onRadioChange = (e: RadioChangeEvent) => {
    setStatus(e.target.value);
  };
  useEffect(() => {
    if (status) {
      listDataQueryParams.status = status;
    } else {
      delete listDataQueryParams.status;
    }
    setIsLoading(true);
    retailersOrders(listDataQueryParams)
      .then((res: any) => {
        if (res?.data?.success) {
          setOrdersList(res.data.data.orders);
          setPagination({
            current: res.data.data.pagination.current_page,
            pageSize: res.data.data.pagination.per_page,
            total: res.data.data.pagination.total,
          });
        } else {
          setOrdersList([]);
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
  }, [listDataQueryParams, status, count]);

  const handleOrderEdit = (type: any, order: any) => {
    if (type === "viewOrder") {
      setViewItem(order);
    } else if (type === "editOrder") {
      setEditOrder(order);
    }
    setVisible(true);
  };

  const columns: ColumnsType<any> = [
    {
      title: "Retailer",
      dataIndex: "retailer",
      key: "first_name",
      fixed: "left",
      render: (retailer: any) => {
        return (
          <div className="retailer_details">
            <span style={{ color: "#000" }}>
              <b>Name:</b>{" "}
              <b>
                {" "}
                {retailer.first_name || retailer.last_name
                  ? retailer?.first_name + " " + retailer?.last_name
                  : ""}
              </b>
            </span>
            <span className="retailer_details">
              <b>Email:</b> {retailer?.email ? retailer.email : ""}
            </span>
            <span>
              <b>Phone:</b> {retailer?.phone ? retailer.phone : ""}
            </span>
            <span>
              <b>Legail Business Name:</b>{" "}
              {retailer?.legal_business_name
                ? retailer.legal_business_name
                : ""}
            </span>
            <span>
              <b>Business Address:</b>{" "}
              {retailer?.business_addr ? retailer.business_addr : ""}
            </span>
          </div>
        );
      },
    },
    // {
    //   title: "Email",
    //   dataIndex: "retailer",
    //   render: (retailer: any) => {
    //     return <span>{retailer?.email ? retailer.email : ""}</span>;
    //   },
    // },
    // {
    //   title: "Product Name",
    //   dataIndex: "items",
    //   key: "product_name",
    //   render: (items: any) => {
    //     return (
    //       <>
    //         {items.map((product: any, i: number) => {
    //           return (
    //             <span className="multiples" key={i}>
    //               {product.product_name}
    //             </span>
    //           );
    //         })}
    //       </>
    //     );
    //   },
    // },
    // {
    //   title: "Product Active Ingredient",
    //   dataIndex: "items",
    //   render: (items: any) => {
    //     return (
    //       <>
    //         {items.map((ingredient: any, i: number) => {
    //           return (
    //             <span className="multiples" key={i}>
    //               {ingredient.product_active_ingredient}
    //             </span>
    //           );
    //         })}
    //       </>
    //     );
    //   },
    // },
    // {
    //   title: "Product Strength",
    //   dataIndex: "items",
    //   render: (items: any) => {
    //     return (
    //       <>
    //         {items.map((productStrength: any, i: number) => {
    //           return (
    //             <span className="multiples" key={i}>
    //               {productStrength.product_strength}
    //             </span>
    //           );
    //         })}
    //       </>
    //     );
    //   },
    // },
    {
      title: "Total Amount",
      dataIndex: "total_amount",
      render: (total: any) => {
        return (
          <>
            <b className="multiples">{formatAmount(total)}</b>
          </>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: any) => {
        return (
          <span
            className={`order_status ${
              status === "Accepted"
                ? "accepted_tag"
                : status === "Pending"
                ? "pending_tag"
                : status === "Canceled By Distribution"
                ? "canceled_by_distribution_tag"
                : status === "Canceled By Retailer"
                ? "canceled_by_retailer_tag"
                : status === "Reviewed"
                ? "reviewed_tag"
                : ""
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      title: "Action",
      fixed: "right",
      render: (orders: any) => {
        return (
          <div className="wide-dropdwon all_icons">
            <a href="#javascript" className="icons_link">
              <EditOutlined
                onClick={() => {
                  handleOrderEdit("editOrder", orders);
                }}
              />
            </a>
            <a href="#javascript" className="icons_links">
              <Tooltip placement="topRight" title={<span>Details</span>}>
                <AiOutlineEye
                  style={{
                    fontSize: "17px",
                    color: "#000",
                    marginLeft: "6px",
                  }}
                  onClick={() => {
                    handleOrderEdit("viewOrder", orders);
                  }}
                />
              </Tooltip>
            </a>
          </div>
        );
      },
    },
  ];

  const handleTable = (pagination: any): any => {
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
      path: "/orders",
      breadcrumbName: "Orders",
    },
  ];

  return (
    <div>
      <CustomBreadcrumb routes={breadcrumbRoutes} />
      <PageHeader
        className="site-page-header"
        title="Orders"
        ghost={false}
        extra={
          [
            // <div className="filters">
            //   <Space>
            //     <label>Sort By</label>
            //     <Select
            //       labelInValue
            //       defaultValue={{ value: "created_at" }}
            //       style={{ width: 120 }}
            //       onChange={handleColumn}
            //     >
            //       <Option value="created_at">Created At</Option>
            //       <Option value="updated_at">Updated At</Option>
            //     </Select>
            //     <label>In</label>
            //     <Select
            //       labelInValue
            //       defaultValue={{ value: "asc" }}
            //       style={{ width: 120 }}
            //       onChange={handleOrder}
            //     >
            //       <Option value="asc">Ascending</Option>
            //       <Option value="desc">Descending</Option>
            //     </Select>
            //   </Space>
            // </div>,
            // <Search
            //   placeholder="Search Orders"
            //   enterButton={<IoIosSearch />}
            //   size="large"
            //   onSearch={onSearch}
            //   allowClear
            // />,
          ]
        }
      />
      <div className="radio_check">
        <Radio.Group onChange={onRadioChange} defaultValue="a">
          <Radio.Button value="accepted">Accepted</Radio.Button>
          <Radio.Button value="canceled_by_distribution">
            Canceled By Distribution
          </Radio.Button>
          {/* <Radio.Button value="canceled_by_retailer">
            Canceled By Retailer
          </Radio.Button> */}
          <Radio.Button value="reviewed">Reviewed</Radio.Button>
          <Radio.Button value="pending">Pending</Radio.Button>
        </Radio.Group>
      </div>
      <div
        style={{
          boxShadow: "0 0 20px rgba(0 0 0 / 20%)",
          borderRadius: "6px",
        }}
      >
        <OrderDetailsDrawer
          visible={visible}
          closeModal={closeOrderModal}
          viewItem={viewItem}
          editOrder={editOrder}
          setVisible={setVisible}
          setEditOrder={setEditOrder}
          setViewItem={setViewItem}
          setCount={setCount}
        />
        <Table
          columns={columns}
          loading={isLoading}
          dataSource={orders}
          pagination={pagination}
          onChange={handleTable}
          scroll={{ x: "max-content" }}
          rowKey="id"
        />
      </div>
    </div>
  );
};

export default Orders;
