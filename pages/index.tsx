import { createGSP } from "pages/shared";
import { Home, pageModel } from "pages/home";

export const getStaticProps = createGSP({
  pageEvent: pageModel.pageStarted,
});

export default Home;
