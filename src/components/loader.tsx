import { Spin } from "antd";

const Loader = () => (
  <div
    className="example"
    style={{
      justifyContent: "center",
      display: "flex",
    }}
  >
    <Spin />
  </div>
);

export default Loader;
