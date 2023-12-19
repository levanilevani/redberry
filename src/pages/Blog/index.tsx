import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {Flex} from "antd";

import {Tag} from '../../components/common'

import styles from './styles.module.scss'
import {hexToRgba} from '../../utils';

export const Blog = () => {
  const {id} = useParams()

  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.blog.redberryinternship.ge/api/blogs/${id}`,
          {
            headers: {
              Authorization:
                "Bearer 2900fbe4a255805225cd115cf0734090b28b05477bc9b63eeae88e32ca19b7f6",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setBlogData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const blogDescription = blogData?.description?.split('\n')?.map(line => line.trim()).join('<br/>');

  return (
    <div className={styles['blog']}>
      <div className={styles['blog__img']}>
        <img src={blogData?.image} alt='article'/>
      </div>

      <Flex vertical gap={24}>
        <Flex vertical gap={8}>
          <p className={styles['blog__author']}>{blogData?.author}</p>
          <Flex align={'center'}>
            <span className={styles['blog__publish-date']}>{blogData?.publish_date}</span>
            <span className={styles['blog__author-divider']} style={{
              width: 4,
              height: 4,
              background: "gray",
              borderRadius: '100%',
              margin: '0 6px'
            }}/>
            <span className={styles['blog__author-email']}>{blogData?.email}</span>
          </Flex>
        </Flex>

        <h1 className={styles['blog__title']}>{blogData?.title}</h1>

        <div className={styles['blog__categories']}>
          {blogData?.categories?.map(category =>
            <Tag
              key={category.id}
              tagColor={hexToRgba(category.background_color, 0.08)}
              textColor={hexToRgba(category.background_color, 1)}
              small
            >
              {category.title}
            </Tag>
          )}
        </div>
      </Flex>

      <p
        className={styles['blog__description']}
        dangerouslySetInnerHTML={{__html: blogDescription}}
      />

    </div>
  )
}