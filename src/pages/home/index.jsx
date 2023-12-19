import {BlogCard} from "../../components/common/BlogCard/BlogCard.jsx";

export const Home = () => {
  return (
    <BlogCard
      id={1} title={'Blog title'}
      description={'Blog description'}
      imgSrc={'https://via.placeholder.com/150'} publishDate={'2023-11-19 00:00:00'}
      categories={[
        {
          "id": 1,
          "name": "Category",
          "text_color": "#ffffff",
          "background_color": "#000000"
        },
        {
          "id": 2,
          "name": "Category",
          "text_color": "red",
          "background_color": "rgba(250, 87, 87, 0.08)"
        }

      ]}
      author={'გელა გელაშვილი'}
    />)
};
