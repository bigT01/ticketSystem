import ProjectsMain from "@/components/pages/ProjectsMain";
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
                    <span>Projects</span>
                </li>
            </ul>
            <ProjectsMain/>
        </div>
    )
}

export default Page;