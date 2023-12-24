import { useState, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

import {
  Tag,
  BlogCard,
  LoadingSpinner,
  ErrorText,
} from "../../components/common";

import styles from "./styles.module.scss";

const tagsData = [
  { text: "მარკეტი", textColor: "#D6961C", tagColor: "#FFB82F14" },
  { text: "აპლიკაცია", textColor: "#15C972", tagColor: "#1CD67D14" },
  { text: "ხელოვნური ინტელექტი", textColor: "#B71FDD", tagColor: "#EEE1F7" },
  { text: "UI/UX", textColor: "#DC2828", tagColor: "#FA575714" },
  { text: "კვლევა", textColor: "#60BE16", tagColor: "#E9EFE9" },
  { text: "Figma", textColor: "#1AC7A8", tagColor: "#08D2AE14" },
];

export const Home = () => {
  const [blogsData, setBlogsData] = useState([]);
  const [checked, setChecked] = useLocalStorage("checked", {});
  const [selectedTags, setSelectedTags] = useLocalStorage("selectedTags", []);
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
        setBlogsData(data?.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (tag) => {
    // Toggle the checked state for the clicked tag
    setChecked((prev) => ({ ...prev, [tag]: !prev[tag] }));

    // Update the selectedTags based on the checked state
    if (checked[tag]) {
      setSelectedTags((prev) => prev.filter((t) => t !== tag));
    } else {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  // Filter blogsData based on selectedTags
  const filteredBlogs = blogsData.filter((blog) => {
    // If no tags are selected, show all blogs
    if (selectedTags.length === 0) {
      return true;
    }
    // Check if the blog has at least one selected tag
    return blog.categories.some((category) =>
      selectedTags.includes(category.title)
    );
  });

  return (
    <div className={styles["container"]}>
      <header className={styles["container__header"]}>
        <h1 className={styles["container__header--title"]}>ბლოგი</h1>
        <img
          className={styles["container__header--img"]}
          src="/images/Blog.png"
          alt="Blog"
        />
      </header>
      <main className={styles["container__main"]}>
        <div className={styles["container__main--tags"]}>
          {tagsData.map(({ text, textColor, tagColor }) => (
            <Tag
              tagColor={tagColor}
              textColor={textColor}
              key={text}
              onClick={() => handleChange(text)}
              checked={checked[text]}
            >
              {text}
            </Tag>
          ))}
        </div>
        <div className={styles["container__main--blogs"]}>
          {error ? (
            <ErrorText>{error.message}</ErrorText>
          ) : loading ? (
            <LoadingSpinner />
          ) : (
            filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                author={blog.author}
                description={blog.description}
                publishDate={blog.publish_date}
                categories={blog.categories}
                imgSrc={blog.image}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};
