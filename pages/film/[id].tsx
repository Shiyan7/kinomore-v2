import { ReactNode } from "react";
import { Movie, pageModel } from "pages/movie";
import { createGSSP } from "pages/shared";
import { BaseLayout } from "widgets/layouts";

const Page = (props: any) => <Movie {...props} />;

Page.getLayout = (page: ReactNode) => <BaseLayout>{page}</BaseLayout>;

export const getServerSideProps = createGSSP({
  pageEvent: pageModel.pageStarted,
});

export default Page;
