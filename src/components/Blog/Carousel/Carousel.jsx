import {useRef, useState, useEffect} from "react";

import {Button, ConfigProvider, Carousel as AntdCarousel} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

import {LoadingSpinner, ErrorText, BlogCard} from "../../common";

import styles from "./styles.module.scss";

export const Carousel = ({categories, itemId}) => {
  const carouselRef = useRef();
  const [suggestedData, setSuggestedData] = useState([]);
  const [filteredSuggestedData, setFilteredSuggestedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
            "https://api.blog.redberryinternship.ge/api/blogs",
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
        setSuggestedData(data?.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNext = () => {
    carouselRef.current.next();
  };

  const handlePrev = () => {
    carouselRef.current.prev();
  };

  const filteredData = suggestedData?.filter((data) => {
    const existingCategories = data.categories.map(
        // cutout current item and getting title
        (category) => data.id !== itemId ? category.title : ''
    );
    // Check if there is any intersection between existingCategories and provided categories
    return categories.some((category) =>
        existingCategories.includes(category.title)
    );
  });

  return (
      <div className={styles["container"]}>
        {error ? (
            <ErrorText>{error.message}</ErrorText>
        ) : loading ? (
            <LoadingSpinner/>
        ) : (
            <>
              <div className={styles["container__header"]}>
                <h1 className={styles["container__header--title"]}>
                  მსგავსი სტატიები
                </h1>
                {filteredData?.length >= 3 && <div className={styles["container__header--buttons"]}>
                  <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: "#5D37F3",
                        },
                      }}
                  >
                    <Button
                        shape="circle"
                        type="primary"
                        size="large"
                        icon={<LeftOutlined/>}
                        onClick={handlePrev}
                    />
                    <Button
                        shape="circle"
                        type="primary"
                        size="large"
                        icon={<RightOutlined/>}
                        onClick={handleNext}
                    />
                  </ConfigProvider>
                </div>}
              </div>
              <AntdCarousel
                  draggable
                  dots={false}
                  ref={carouselRef}
                  slidesToScroll={1}
                  slidesToShow={filteredData?.length >= 3 ? 3 : filteredData?.length}
                  waitForAnimate={false}
                  centerMode
              >
                {filteredData?.map((data) =>
                    <BlogCard
                        key={data.id}
                        imgSrc={data.image}
                        {...data}
                    />
                )}
              </AntdCarousel>
            </>
        )}
      </div>
  );
};
