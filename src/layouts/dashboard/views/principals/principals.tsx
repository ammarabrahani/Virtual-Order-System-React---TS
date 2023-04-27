/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useReducer, useEffect } from "react";
import { ColumnsType } from "antd/lib/table";
import "../../../../assets/scss/principals.scss";
import { Table, Tag, PageHeader, Tooltip, Input } from "antd";
import { GrUpdate } from "react-icons/gr";
import { AppstoreOutlined } from "@ant-design/icons";
import { IoIosSearch } from "react-icons/io";
import {
  queryParamsReducer,
  initialQueryParams,
  UPDATE_PARAM,
} from "../../../../utilities/queryParamsReducer";
import { getPrincipals } from "../../../../services/network";
import CustomBreadcrumb from "../../../../components/CustomBreadcrumb";
import errorHandler from "../../../../utilities/errorHandler";
import { useNavigate } from "react-router-dom";

const Principals = () => {
  const navigate = useNavigate();
  const [listDataQueryParams, dispatchQueryParams] = useReducer(
    queryParamsReducer,
    initialQueryParams
  );
  const { Search } = Input;
  const [principals, setPrincipalsList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState<any>("");

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

  const onSearch = (searchPrincipal: string) => {
    setName(searchPrincipal);
  };
  useEffect(() => {
    if (name) {
      listDataQueryParams.name = name;
    } else {
      delete listDataQueryParams.name;
    }
    setIsLoading(true);
    getPrincipals(listDataQueryParams)
      .then((res: any) => {
        if (res?.data?.success) {
          setPrincipalsList(res.data.data.principals);
          setPagination({
            current: res.data.data.pagination.current_page,
            pageSize: res.data.data.pagination.per_page,
            total: res.data.data.pagination.total,
          });
        } else {
          setPrincipalsList([]);
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
  }, [listDataQueryParams, name]);

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
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Email2",
      dataIndex: "email_2",
    },
    {
      title: "Business Address",
      dataIndex: "business_addr",
    },
    {
      title: "Business Address2",
      dataIndex: "business_addr_2",
    },
    {
      title: "City",
      dataIndex: "city",
    },
    {
      title: "Zip Code",
      dataIndex: "zip_code",
      key: "zip_code",
    },
    {
      title: "Province",
      dataIndex: "province",
    },
    {
      title: "Cell Number",
      dataIndex: "cell_num",
    },
    {
      title: "Landline Number",
      dataIndex: "landline_num",
    },
    {
      title: "Landline Number2",
      dataIndex: "landline_num_2",
    },
    {
      title: "Landline Number3",
      dataIndex: "landline_num_3",
    },
    {
      title: "Fax",
      dataIndex: "fax",
    },
    {
      title: "Segments",
      dataIndex: "segments",
      render: (segments) => (
        <>
          {segments?.map((segments: any, i: number) => {
            return (
              <Tag color="#7f8c8d" key={i}>
                {segments}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Social Business Url",
      dataIndex: "social_business_page_url",
    },
    {
      title: "Business Account Title",
      dataIndex: "business_bank_account_title",
    },
    {
      title: "Bank Account Number",
      dataIndex: "business_bank_account_num",
    },
    {
      title: "Bank Name",
      dataIndex: "bank_name",
    },
    {
      title: "Bank Branch Name",
      dataIndex: "bank_branch_name",
    },
    {
      title: "Bank Branch Address",
      dataIndex: "bank_branch_addr",
    },
    {
      title: "Bank Branch Code",
      dataIndex: "bank_branch_code",
    },
    {
      title: "Iban",
      dataIndex: "iban",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
    },
    {
      title: "Action",
      fixed: "right",
      render: (principals: any) => {
        return (
          <div className="wide-dropdwon all_icons">
            <a href="#" className="icons_link">
              <Tooltip placement="topRight" title={<span>Current Stock</span>}>
                <AppstoreOutlined
                  onClick={() => {
                    navigate(`/principals/${principals.id}/products`);
                  }}
                />
              </Tooltip>
            </a>
            <a href="#" className="icons_links">
              <Tooltip placement="topRight" title={<span>Update Stock</span>}>
                <GrUpdate
                  style={{
                    fontSize: "12px",
                  }}
                  onClick={() => {
                    navigate(`/principals/${principals.id}/updatestock`);
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
      path: "/principals",
      breadcrumbName: "Principals",
    },
  ];

  return (
    <div>
      <CustomBreadcrumb routes={breadcrumbRoutes} />
      <PageHeader
        className="site-page-header"
        title="Principals"
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
            placeholder="Search Principal"
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
          dataSource={principals}
          pagination={pagination}
          onChange={handleTable}
          scroll={{ x: "max-content" }}
          rowKey="id"
        />
      </div>
    </div>
  );
};

export default Principals;
