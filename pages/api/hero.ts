import type { NextApiRequest, NextApiResponse } from "next";

const data = [
  {
    id: 1199773,
    year: 2022,
    rating: "6.8",
    title: "Чёрная Пантера: Ваканда навеки",
    genre: "Триллеры",
    image: "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/yYrvN5WFeGYjJnRzhY0QXuo4Isw.jpg",
    trailer: "https://youtu.be/c8bvibtwADE",
  },
  {
    id: 1115098,
    year: 2022,
    rating: "5.7",
    title: "Мир Юрского периода: Господство",
    genre: "Триллеры",
    image: "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/jauI01vUIkPA0xVsamGj0Gs1nNL.jpg",
    trailer: "https://youtu.be/c8bvibtwADE",
  },
  {
    id: 1009017,
    year: 2022,
    rating: "6.4",
    title: "Чёрный Адам",
    genre: "Боевик",
    image: "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg",
    trailer: "https://youtu.be/c8bvibtwADE",
  },
  {
    id: 1161308,
    year: 2022,
    rating: "5.4",
    title: "Пиноккио",
    genre: "Мюзикл",
    image: "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/nnUQqlVZeEGuCRx8SaoCU4XVHJN.jpg",
    trailer: "https://youtu.be/c8bvibtwADE",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(data);
}
