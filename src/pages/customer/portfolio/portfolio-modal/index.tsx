import {  Button, Form, Input, Modal, Select, Tag, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getAtWorksByCreator } from "../../../../services/atworrk.services";
import { uploadToCloudinary } from "../../../../consts/function";

export interface PortfolioData {
  title: string;
  description: string;
  coverImageUrl: string;
  userId: string;
  skills: string;
  experience: string;
  contactUrl: string;
  artworkImageIds: string[];
}

interface AtworksByCreatorProps {
  id: string,
  fileUrl: string;
}

const PortfolioModal = ({
  open,
  onClose,
  onSubmit,
  userId,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: PortfolioData) => void;
  userId: string
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [atworks, setAtworks] = useState<AtworksByCreatorProps[]>([]);
  const [fileList, setFileList] = useState<string | null>(null); // Change to string | null for single file
  const initialValues: PortfolioData = {
    title: "",
    description: "",
    coverImageUrl: "",
    userId: userId,
    skills: "",
    experience: "",
    contactUrl: "",
    artworkImageIds: [],
  };

  useEffect(() => {
    getAtworksByCreatorFromClient();
  }, [userId]);

  const getAtworksByCreatorFromClient = async () => {
    const response = await getAtWorksByCreator(userId);
    console.log("getAtworksByCreatorFromClient: ", response);
    if (response) {
      setAtworks(response);
    }
  };

  const handleUpload = async ({ file, onSuccess, onError }: any) => {
    try {
      message.loading({ content: "Uploading...", key: "upload" });
      const url = await uploadToCloudinary(file);
      if (url) {
        setFileList(url); // Set single file URL
        message.success({ content: "Upload thành công!", key: "upload" });
        onSuccess("ok");
      } else {
        message.error({ content: "Upload thất bại!", key: "upload" });
        onError(new Error("Upload failed"));
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi upload!");
      onError(error);
    }
  };

  const handleFinish = async (values: any) => {
    console.log("values: ", values);
    setLoading(true);
    try {
      const coverImageUrl = fileList; // Use single file URL
      const formattedData: PortfolioData = {
        ...values,
        coverImageUrl,
      };
      console.log("formattedData: ", formattedData);
      onSubmit(formattedData);
      form.resetFields();
      setFileList(null)
      onClose();
    } catch (error) {
      message.error("Đã có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setFileList(null); // Reset to null when removing the file
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Tạo Portfolio Mới"
      footer={null}
    >
      <Form initialValues={initialValues} form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="title" label="Tiêu đề" rules={[{ required: true }]}>
          <Input placeholder="Nhập tiêu đề" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true }]}
        >
          <Input.TextArea placeholder="Nhập mô tả" />
        </Form.Item>

        {/* Upload Ảnh Bìa */}
        <Form.Item
          name="coverImageUrl"
          label="Ảnh bìa"
          rules={[{ required: true }]}
        >
          <Upload
            listType="picture-card"
            customRequest={handleUpload}
            fileList={fileList ? [{ uid: fileList, url: fileList }] : []} // Adjust for single file
            onPreview={(file) => window.open(file.url, "_blank")}
            showUploadList={{ showRemoveIcon: true }}
            onRemove={handleRemove}
          >
            {!fileList && ( // Show upload button only if no file is uploaded
              <div className="flex flex-col items-center">
                <PlusOutlined className="text-xl" />
                <div style={{ marginTop: 8 }}>Thêm ảnh</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item hidden name="userId" label="User  ID" rules={[{ required: true }]}>
          <Input defaultValue={userId} placeholder="Nhập User ID" />
        </Form.Item>

        <Form.Item name="skills" label="Kỹ năng" rules={[{ required: true }]}>
          <Input placeholder="Nhập kỹ năng" />
        </Form.Item>

        <Form.Item
          name="experience"
          label="Kinh nghiệm"
          rules={[{ required: true }]}
        >
          <Input placeholder="Nhập kinh nghiệm" />
        </Form.Item>

        <Form.Item name="contactUrl" label="Liên hệ" rules={[{ required: true }]}>
          <Input placeholder="Nhập link liên hệ" />
        </Form.Item>

        <Form.Item name="artworkImageIds" label="Chọn artwork" rules={[{ required: true }]}>
          <Select
            mode="multiple"
            className="h-[230px]"
            style={{ width: "100%" }}
            placeholder="Chọn ảnh"
            tagRender={(props) => {
              const { label, closable, onClose } = props;

              return (
                <Tag
                  closable={closable}
                  onClose={onClose}
                  className="flex items-center gap-2 p-1"
                >
                  <span>{label}</span>
                </Tag>
              );
            }}
            options={
              atworks.map((item) => ({
                label: <div className="h-[100px]"><img className="w-[100px] h-[100px]" src={item.fileUrl} alt="" /></div>,
                value: item.id,
                data: item,
              }))
            }
          />
        </Form.Item>

        <div className="flex justify-end mt-4">
          <Button onClick={onClose} className="mr-2">
            Hủy
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Tạo mới
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default PortfolioModal;