import { FC, useState } from 'react';
import { css } from '@emotion/css';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadChangeParam, UploadProps } from 'antd/lib/upload';

const uploadProps: UploadProps = {
  action: '/api/files/upload-image',
  headers: {},
  accept: '.png, .jpg, .jpeg',
  listType: 'picture-card',
  showUploadList: false,
};

interface ImageUploadProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const ImageUpload: FC<ImageUploadProps> = ({ value: enteredValue, onChange }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 格式的文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片文件不能超过 2MB!');
    }
    return isJpgOrPng && isLt2M;
    // if (isJpgOrPng && isLt2M) {
    //   convertFileToBase64(file).then((imgBase64) => {
    //     onChange && onChange(imgBase64);
    //   });
    // }
    // return false;
  };

  const handleChange = ({ file }: UploadChangeParam) => {
    if (file.status === 'uploading') {
      setLoading(true);
    } else {
      setLoading(false);
    }
    if (file.status === 'done') {
      setImageUrl(file.response.url);
      onChange?.(file.response.url);
    }
  };

  const imageSrc = imageUrl || enteredValue;

  return (
    <Upload
      {...uploadProps}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      className={css`
        div.ant-upload {
          width: 332px !important;
          height: 224px !important;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      `}
    >
      {imageSrc ? <img src={`${imageSrc}`} alt="cover image" /> : uploadButton}
    </Upload>
  );
};
