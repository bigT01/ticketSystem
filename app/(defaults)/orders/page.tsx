import IconPlus from "@/components/icon/icon-plus";
import CompaniesMain from "@/components/pages/CompaniesMain";
import Link from "next/link";

const Page = () => {
    return(
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Companies</span>
                </li>
            </ul>
            <CompaniesMain/>
        </div>
    )
}

export default Page;