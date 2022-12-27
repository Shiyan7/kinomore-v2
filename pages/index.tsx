import { ReactNode } from "react";
import { BaseLayout } from "widgets/layouts";
import { createGSP } from "pages/shared";
import { Home, pageModel } from "pages/home";

const Page = () => <Home />;

Page.getLayout = (page: ReactNode) => <BaseLayout>{page}</BaseLayout>;

export const getStaticProps = createGSP({
  pageEvent: pageModel.pageStarted,
});

export default Page;
