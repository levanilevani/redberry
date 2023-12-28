import { Flex, Form, Upload, Button } from "antd";

import { Label } from "../Label/Label";

import FolderAdd from "../../../assets/svg/folder-add.svg?react";
import DeleteIcon from "../../../assets/svg/delete.svg?react";

import styles from "./styles.module.scss";

export const ImageUploader = ({
  fieldName,
  fileName,
  imageUrl: { binary, fileInfo },
  setImageUrl,
}) => {
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = async (info) => {
    const binaryData = await new Promise((resolve) => {
      getBase64(info.file.originFileObj, (data) => resolve(data));
    });
    setImageUrl((prev) => ({
      ...prev,
      binary: binaryData,
      fileInfo: info.file.name,
    }));
  };

  return (
    <div className={styles["container"]}>
      <Label noStyle>ატვირთეთ ფოტო</Label>
      {binary ? (
        <div className={styles["image__placeholder"]}>
          <Flex gap={12} align="center">
            <img src={binary} alt="image" width={24} height={24} />
            <p className={styles["image__placeholder--text"]}>{fileInfo}</p>
          </Flex>
          <Button
            icon={<DeleteIcon />}
            type="text"
            size="small"
            onClick={() =>
              setImageUrl({
                binary: "",
                fileInfo: "",
              })
            }
          />
        </div>
      ) : (
        <Form.Item required name={fieldName} initialValue={binary} noStyle>
          <Upload.Dragger
            className={styles["container--file"]}
            name={fileName}
            onChange={handleChange}
            fileList={null}
            maxCount={1}
            listType="picture"
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          >
            <div className={styles["container__fileContainer"]}>
              <FolderAdd className={styles["container__fileContainer--svg"]} />
              <p className={styles["container__folderAdd"]}>
                ჩააგდეთ ფაილი აქ ან
                <span className={styles["container__folderAdd--text"]}>
                  აირჩიეთ ფაილი
                </span>
              </p>
            </div>
          </Upload.Dragger>
        </Form.Item>
      )}
    </div>
  );
};
