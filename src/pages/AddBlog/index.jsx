import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/globalContext';

import { ConfigProvider, Flex, Form, Upload, DatePicker } from 'antd';

import FolderAdd from '../../assets/svg/folder-add.svg?react';

import { Button } from '../../components/common';
import { Label, Input, TextArea } from '../../components';

import {
  isWordsValid,
  authorFieldValidator,
  titleFieldValidator,
  descriptionFieldValidator,
  emailFieldValidator,
  endsWithRedberryGeRegex,
} from './utils';

import ErrorCircle from '../../assets/svg/error-circle.svg?react';

import Theme from './theme.json';

import styles from './styles.module.scss';
import CategoriesSelect from '../../components/AddBlog/CategoriesSelect/CategoriesSelect';

export const AddBlog = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const [tags, setTags] = useState(undefined);
  const [imageUrl, setImageUrl] = useState({
    binary: '',
    fileInfo: null,
  });
  const { setOpenSuccessModal } = useContext(GlobalContext);
  const [validationStatus, setValidationStatus] = useState({
    author: 'base',
    authorWord: 'base',
    georgianAuthor: 'base',
    title: 'base',
    description: 'base',
    authorValid: false,
    authorWordValid: false,
    authorGeorgianValid: false,
    titleValid: false,
    descriptionValid: false,
    emailValid: false,
  });

  useEffect(() => {
    setClientReady(true);
  }, []);

  const handleTagChange = (value) => {
    setTags(value);
  };

  const onFinish = (values) => {
    console.log(values);

    // setOpenSuccessModal(true);
  };

  // checking each field's text and added some validation styles
  const checkForValid = (result) => (result ? 'valid' : 'inValid');

  const onValuesChange = (_, values) => {
    // Validation form email's Field
    if (values.email) {
      if (endsWithRedberryGeRegex.test(values.email)) {
        setValidationStatus((prev) => ({ ...prev, emailValid: true }));
      }
    }
    // Validation  for description's Text
    if (values.description) {
      const isDescriptionWordsValid = isWordsValid(values.description);
      setValidationStatus((prev) => ({
        ...prev,
        descriptionValid: true,
        description: checkForValid(isDescriptionWordsValid),
      }));
    }

    // Validation logic for Title's Text
    if (values.title) {
      const isTitleWordsValid = isWordsValid(values.title);
      setValidationStatus((prev) => ({
        ...prev,
        titleValid: true,
        title: checkForValid(isTitleWordsValid),
      }));
    }

    // Validation logic for Author's Text
    if (values.author) {
      const isAuthorValid = values.author.trim().length >= 4;
      setValidationStatus((prev) => ({
        ...prev,
        authorValid: true,
        author: checkForValid(isAuthorValid),
      }));

      const isAuthorWordsValid = isWordsValid(values.author);
      setValidationStatus((prev) => ({
        ...prev,
        authorWordValid: true,
        authorWord: checkForValid(isAuthorWordsValid),
      }));

      const isGeorgianValid = /^[ა-ჰ\s]+$/.test(values.author);
      setValidationStatus((prev) => ({
        ...prev,
        authorGeorgianValid: true,
        georgianAuthor: checkForValid(isGeorgianValid),
      }));
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
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
  console.log(tags);

  return (
    <ConfigProvider theme={Theme}>
      <Form
        form={form}
        layout='vertical'
        requiredMark={false}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        className={styles['form']}
        initialValues={{
          title: '',
          description: '',
          email: '',
          author: '',
        }}
      >
        {/* Image Field */}
        <div className={styles['container']}>
          <Label noStyle>ატვირთეთ ფოტო</Label>
          <Form.Item
            name='image'
            valuePropName='filelist'
            getValueFromEvent={normFile}
            noStyle
            required
          >
            <Upload.Dragger
              className={styles['container--file']}
              maxCount={1}
              listType='picture'
              onChange={handleChange}
              name='files'
              action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
            >
              <div className={styles['container__fileContainer']}>
                <FolderAdd
                  className={styles['container__fileContainer--svg']}
                />
                <p className={styles['container__folderAdd']}>
                  ჩააგდეთ ფაილი აქ ან
                  <span className={styles['container__folderAdd--text']}>
                    აირჩიეთ ფაილი
                  </span>
                </p>
              </div>
            </Upload.Dragger>
          </Form.Item>
        </div>

        <div className={styles['form--grid']}>
          {/* Author Field */}
          <Form.Item
            name='author'
            rules={[
              {
                required: true,
                min: 4,
                validator: authorFieldValidator,
                message: '',
              },
            ]}
          >
            <div className={styles['form__inputWrapper']}>
              <Label>ავტორი *</Label>
              <Input
                placeholder='შეიყვანეთ ავტორი'
                checkValidation={
                  validationStatus.authorValid &&
                  validationStatus.authorWordValid &&
                  validationStatus.authorGeorgianValid
                }
              />
              <ul className={styles['form__inputWrapper--ul']}>
                <li className={styles[validationStatus.author]}>
                  მინიმუმ 4 სიმბოლო
                </li>
                <li className={styles[validationStatus.authorWord]}>
                  მინიმუმ ორი სიტყვა
                </li>
                <li className={styles[validationStatus.georgianAuthor]}>
                  მხოლოდ ქართული სიმბოლოები
                </li>
              </ul>
            </div>
          </Form.Item>

          {/* Title Field */}
          <Form.Item
            name='title'
            rules={[
              {
                required: true,
                min: 2,
                validator: titleFieldValidator,
                message: '',
              },
            ]}
          >
            <div className={styles['form__inputWrapper']}>
              <Label>სათური *</Label>
              <Input
                placeholder='შეიყვანეთ სათაური'
                checkValidation={validationStatus.titleValid}
              />

              <p className={styles[validationStatus.title]}>
                მინიმუმ 2 სიმბოლო
              </p>
            </div>
          </Form.Item>
        </div>

        {/* Description Field */}
        <Form.Item
          name='description'
          rules={[
            {
              required: true,
              min: 2,
              validator: descriptionFieldValidator,
              message: '',
            },
          ]}
        >
          <div className={styles['form__inputWrapper']}>
            <Label>აღწერა *</Label>
            <TextArea
              placeholder='შეიყვანეთ აღწერა'
              allValid={validationStatus.descriptionValid}
            />
            <p className={styles[validationStatus.description]}>
              მინიმუმ 2 სიმბოლო
            </p>
          </div>
        </Form.Item>

        <Flex direction='row' justify='space-between' align='center'>
          <Form.Item required name={'date'}>
            <div className={styles['form__inputWrapper']}>
              <Label>გამოქვეყნების თარიღი *</Label>
              <DatePicker
                style={{
                  width: 288,
                  height: 44,
                  borderRadius: 8,
                }}
              />
            </div>
          </Form.Item>

          <Form.Item required name={'select'} style={{ minWidth: 288 }}>
            <div className={styles['form__inputWrapper']}>
              <Label>კატეგორია *</Label>
              <CategoriesSelect handleChange={handleTagChange} />
            </div>
          </Form.Item>
        </Flex>

        {/* Email Field */}
        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              validator: emailFieldValidator,
              message: (
                <Flex gap={8} align='center'>
                  <ErrorCircle />
                  <p className={styles['form__email--error']}>
                    მეილი უნდა მთავრდებოდეს @redberry.ge-ით
                  </p>
                </Flex>
              ),
            },
          ]}
        >
          <div
            className={`${styles['form__inputWrapper']} ${styles['form__email']}`}
          >
            <Label left>ელ-ფოსტა *</Label>
            <Input
              placeholder='Example@redberry.ge'
              checkValidation={validationStatus.emailValid}
            />
          </div>
        </Form.Item>

        <Form.Item shouldUpdate className={styles['form--button']}>
          {() => (
            <Button
              block
              type='primary'
              htmlType='submit'
              disabled={
                !clientReady ||
                !form.isFieldsTouched(true) ||
                form.getFieldValue('image')?.length === 0 ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              გამოქვეყნება
            </Button>
          )}
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};
