import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { Route } from "antd/lib/breadcrumb/Breadcrumb";

const CustomBreadcrumb = ({ routes }: any) => {
  function itemRender(
    route: Route,
    params: any,
    routes: Route[],
    paths: string[]
  ) {
    return route.path === "" ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link className="ant-breadcrumb-link" to={route.path}>
        {route.breadcrumbName}
      </Link>
    );
  }

  return (
    <div
      className="ant-page-header"
      style={{ marginBottom: 0, paddingBottom: 0 }}
    >
      <Breadcrumb itemRender={itemRender} routes={routes} />
    </div>
  );
};

export default CustomBreadcrumb;
