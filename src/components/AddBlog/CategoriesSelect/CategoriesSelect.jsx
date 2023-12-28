import { useEffect, useState } from 'react';
import { Select } from 'antd';

import styles from './styles.module.scss';

const CategoriesSelect = ({ handleChange }) => {
  const [blogsData, setBlogsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.blog.redberryinternship.ge/api/categories',
          {
            headers: {
              Authorization:
                'Bearer 2900fbe4a255805225cd115cf0734090b28b05477bc9b63eeae88e32ca19b7f6',
            },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setBlogsData(data?.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = [];
  for (let i = 0; i < blogsData.length; i++) {
    options.push({
      value: blogsData[i].id,
      label: blogsData[i].title,
    });
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <Select
      style={{ maxWidth: 288 }}
      className={styles['select']}
      mode='multiple'
      placeholder='Tags Mode'
      onChange={handleChange}
      options={options}
    />
  );
};

export default CategoriesSelect;
