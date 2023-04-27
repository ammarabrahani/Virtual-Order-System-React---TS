import { Upload, message, Button } from "antd";
type ExcelUploadType = {
  name: string;
  callbackSetExcelFile: Function;
};
const ExcelUpload = ({ name, callbackSetExcelFile }: ExcelUploadType) => {
  const beforeUpload = (file: File) => {
    const isExcel =
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/vnd.ms-excel";
    if (!isExcel) {
      message.error("You can only upload excel file!");
    } else {
      message.success("Product file uploaded");
    }
  };
  return (
    <div>
      <Upload
        name={name}
        className="upload-demo-start"
        showUploadList={false}
        beforeUpload={beforeUpload}
        customRequest={(data) => {
          callbackSetExcelFile(data.file);
        }}
      >
        <Button>Select File</Button>
      </Upload>
    </div>
  );
};

export default ExcelUpload;
