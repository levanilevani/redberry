import { Flex } from "antd";
import { Link } from "react-router-dom";

import ArrowUp from "../../../assets/svg/arrow-up.svg?react";

import styles from "./styles.module.scss";
import { Tag } from "../Tag/Tag.jsx";

export const BlogCard = ({
  imgSrc,
  author,
  publishDate,
  title,
  categories,
  description,
  id,
}) => {
  return (
    <article className={styles["card"]}>
      <div className={styles["card__img"]}>
        <img src={imgSrc} alt={"article"} />
      </div>

      <Flex vertical gap={16}>
        <Flex vertical gap={8}>
          <p className={styles["card__author"]}>{author}</p>

          <p className={styles["card__publish-date"]}>{publishDate}</p>
        </Flex>

        <h1 className={styles["card__title"]}>{title}</h1>

        <Flex gap={16}>
          {categories?.map((category) => (
            <Tag
              key={category.id}
              tagColor={category.background_color}
              textColor={category.text_color}
            >
              {category.name}
            </Tag>
          ))}
        </Flex>

        <p className={styles["card__description"]}>{description}</p>

        <Link className={styles["card__path"]} to={`/article/${id}`}>
          <span>სრულად ნახვა</span>
          <ArrowUp />
        </Link>
      </Flex>
    </article>
  );
};
