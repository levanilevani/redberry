import { useState } from "react";
import { Tag } from "../../components/common/Tag/Tag";
import styles from "./style.module.scss";

const tagsData = [
  { text: "მარკეტი", textColor: "#D6961C", tagColor: "#FFB82F14" },
  { text: "აპლიკაცია", textColor: "#15C972", tagColor: "#1CD67D14" },
  { text: "ხელოვნური ინტელექტი", textColor: "#B71FDD", tagColor: "#EEE1F7" },
  { text: "UI/UX", textColor: "#DC2828", tagColor: "#FA575714" },
  { text: "კვლევა", textColor: "#60BE16", tagColor: "#E9EFE9" },
  { text: "Figma", textColor: "#1AC7A8", tagColor: "#08D2AE14" },
];

export const Home = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [checked, setChecked] = useState({});

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
      </main>
    </div>
  );
};
