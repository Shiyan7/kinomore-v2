
import { ReactNode } from "react";
import { BaseLayout } from "shared/ui/layouts";


const Page = () => (<div>123</div>);

Page.getLayout = (page: ReactNode) => <BaseLayout>{page}</BaseLayout>;


export default Page;
