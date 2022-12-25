import { ReactNode } from "react";
import { createGSP } from "pages/shared";
import { Home, pageModel } from "pages/home";
import { BaseLayout } from "shared/ui/layouts";

const Page = (props: any) => <Home {...props} />;

Page.getLayout = (page: ReactNode) => <BaseLayout>{page}</BaseLayout>;

export const getStaticProps = createGSP({
  pageEvent: pageModel.pageStarted,
});

export default Page;

