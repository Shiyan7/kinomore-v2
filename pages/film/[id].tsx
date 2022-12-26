import { ReactNode } from "react";
import { BaseLayout } from "widgets/layouts";
import { Movie, pageModel } from "pages/movie";
import { createGSSP } from "pages/shared";

const Page = () => <Movie />;

Page.getLayout = (page: ReactNode) => <BaseLayout>{page}</BaseLayout>;

export const getServerSideProps = createGSSP({
  pageEvent: pageModel.pageStarted,
});

export default Page;
