"use client";
import { CarouselMultiply } from "shared/ui/carousel-multiply";
import { HeroSlide } from "./slide";
import styles from "./styles.module.scss";

export const Hero = () => {
  /* ToDo: отдавать с бекенда */

  const data = [
    {
      id: 915196,
      year: 2016,
      rating: "8.4",
      title: "Очень странные дела",
      genre: "Ужасы",
      image: "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    },
    {
      id: 1199773,
      year: 2022,
      rating: "6.8",
      title: "Чёрная Пантера: Ваканда навеки",
      genre: "Триллеры",
      image: "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/yYrvN5WFeGYjJnRzhY0QXuo4Isw.jpg",
    },
    {
      id: 1115098,
      year: 2022,
      rating: "5.7",
      title: "Мир Юрского периода: Господство",
      genre: "Триллеры",
      image: "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/jauI01vUIkPA0xVsamGj0Gs1nNL.jpg",
    },
    {
      id: 1161308,
      year: 2022,
      rating: "5.4",
      title: "Пиноккио",
      genre: "Мюзикл",
      image: "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/nnUQqlVZeEGuCRx8SaoCU4XVHJN.jpg",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <CarouselMultiply
          options={{
            loop: true,
            slidesPerView: "auto",
          }}
          className={styles.slider}
          slideClassName={styles.slide}
          items={data}
          renderItem={(item) => <HeroSlide item={item} />}
        />
      </div>
    </section>
  );
};
