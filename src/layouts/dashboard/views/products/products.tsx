/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useReducer, useEffect } from "react";
import { ColumnsType } from "antd/lib/table";
import { Table, Tag, PageHeader, Input } from "antd";
import { useParams } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import {
  queryParamsReducer,
  initialQueryParams,
  UPDATE_PARAM,
} from "../../../../utilities/queryParamsReducer";
import { getProducts } from "../../../../services/network";
import CustomBreadcrumb from "../../../../components/CustomBreadcrumb";
import errorHandler from "../../../../utilities/errorHandler";

const Products = () => {
  const params = useParams();
  const principalId: any = params.principalId;
  const [listDataQueryParams, dispatchQueryParams] = useReducer(
    queryParamsReducer,
    initialQueryParams
  );
  const { Search } = Input;
  const [productsList, setProductsList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const onSearch = (searchProduct: string) => {
    setName(searchProduct);
  };
  useEffect(() => {
    if (principalId) {
      if (name) {
        listDataQueryParams.name = name;
      } else {
        delete listDataQueryParams.name;
      }
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
  }, [listDataQueryParams, principalId, name]);

  const columns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      render: (name: string) => {
        return (
          <a>
            <b style={{ color: "#000" }}>{name}</b>
          </a>
        );
      },
    },
    {
      title: "Active Ingredient",
      dataIndex: "active_ingredient",
    },
    {
      title: "Strength",
      dataIndex: "strength",
    },
    {
      title: "Package Size",
      dataIndex: "pack_size",
    },
    {
      title: "Carton Size",
      dataIndex: "carton_size",
    },
    {
      title: "Units Per Pack",
      dataIndex: "units_per_pack",
    },
    {
      title: "Segment",
      dataIndex: "segment",
      render: (segment) => <Tag color="#7f8c8d">{segment}</Tag>,
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
      path: "/principals",
      breadcrumbName: "Principals",
    },
    {
      path: "",
      breadcrumbName: "Products",
    },
  ];

  return (
    <>
      <CustomBreadcrumb routes={breadcrumbRoutes} />
      <PageHeader
        className="site-page-header"
        title={"Products"}
        ghost={false}
        extra={[
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
          <Search
            placeholder="Search Product"
            enterButton={<IoIosSearch />}
            size="large"
            onSearch={onSearch}
            allowClear
          />,
        ]}
      />

      <div
        style={{
          boxShadow: "0 0 20px rgba(0 0 0 / 20%)",
          borderRadius: "6px",
        }}
      >
        <Table
          columns={columns}
          loading={isLoading}
          dataSource={productsList}
          pagination={pagination}
          onChange={handleTable}
          scroll={{ x: "max-content" }}
          rowKey="id"
        />
      </div>
    </>
  );
};

export default Products;
