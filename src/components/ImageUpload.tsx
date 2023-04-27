import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";

type ImageUploadType = {
  name: string;
  image: string;
  callbackSetImageFile: Function;
};

const ImageUpload = ({
  name,
  image,
  callbackSetImageFile,
}: ImageUploadType) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (typeof image === "string") {
      setImageUrl(image);
    } else if (typeof image === "boolean" && image === false) {
      setImageUrl("");
    }
  }, [image]);

  const getBase64 = (img: Blob, callback: Function) => {
    if (typeof img === "object") {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    }
    return false;
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj as Blob, (imageUrl: string) => {
      setImageUrl(imageUrl);
      setLoading(false);
    });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      name={name}
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      customRequest={(data) => {
        callbackSetImageFile(data.file);
      }}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={name} style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default ImageUpload;
