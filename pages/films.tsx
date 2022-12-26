import { ReactNode } from "react";
import { BaseLayout } from "widgets/layouts";

const Page = () => <div>123</div>;

Page.getLayout = (page: ReactNode) => <BaseLayout>{page}</BaseLayout>;

export default Page;
