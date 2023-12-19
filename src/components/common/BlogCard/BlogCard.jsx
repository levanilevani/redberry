import {Flex} from "antd";
import {Link} from "react-router-dom";

import {Tag} from "../Tag/Tag.jsx";

import {hexToRgba} from '../../../utils'

import ArrowUp from "../../../assets/svg/arrow-up.svg?react";

import styles from "./styles.module.scss";

export const BlogCard =
  ({
     imgSrc,
     author,
     publishDate,
     title,
     categories,
     description,
     id,
   }) => {

    function truncateText(text) {
      const truncated = text.substring(0, 85) + "...";
      return truncated
    }

    return (
      <article className={styles["card"]}>
        <div className={styles["card__img"]}>
          <img src={imgSrc} alt={"article"}/>
        </div>

        <Flex vertical gap={16}>
          <Flex vertical gap={8}>
            <p className={styles["card__author"]}>{author}</p>
            <p className={styles["card__publish-date"]}>{publishDate}</p>
          </Flex>

          <h1 className={styles["card__title"]}>{truncateText(title)}</h1>

          <Flex gap={16}>
            {categories?.map((category) => (
              <Tag
                tagColor={hexToRgba(category.background_color, 0.08)}
                textColor={hexToRgba(category.background_color, 1)}
                key={category.text}
                small
              >
                {category.title}
              </Tag>
            ))}
          </Flex>

          <p className={styles["card__description"]}>{truncateText(description)}</p>

          <Link className={styles["card__path"]} to={`/blog/${id}`}>
            <span>სრულად ნახვა</span>
            <ArrowUp/>
          </Link>
        </Flex>
      </article>
    );
  };
