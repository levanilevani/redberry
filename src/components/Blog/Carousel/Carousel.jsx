import { useRef, useState, useEffect } from "react";

import { Button, ConfigProvider, Carousel as AntdCarousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { LoadingSpinner, ErrorText } from "../../common";

import styles from "./styles.module.scss";

export const Carousel = ({ categories }) => {
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

  //   const filteredData = suggestedData?.filter((data) =>
  //     categories.includes(data.categories.title)
  //   );
  const filteredData = suggestedData?.filter((data) => {
    const existingCategory = data.categories.map((category) => category.title);
    const category = categories.map((category) => category.title);
    category.includes(existingCategory);
  });

  console.log(filteredData);

  return (
    <div className={styles["container"]}>
      {error ? (
        <ErrorText>{error.message}</ErrorText>
      ) : loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className={styles["container__header"]}>
            <h1 className={styles["container__header--title"]}>
              მსგავსი სტატიები
            </h1>
            <div className={styles["container__header--buttons"]}>
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
                  icon={<LeftOutlined />}
                  onClick={handlePrev}
                />
                <Button
                  shape="circle"
                  type="primary"
                  size="large"
                  icon={<RightOutlined />}
                  onClick={handleNext}
                />
              </ConfigProvider>
            </div>
          </div>
          <AntdCarousel dots={false} draggable ref={carouselRef}>
            <div className={styles["d1"]} />
            <div className={styles["d2"]} />
            <div className={styles["d3"]} />
            <div className={styles["d4"]} />
            <div className={styles["d5"]} />
          </AntdCarousel>
        </>
      )}
    </div>
  );
};
