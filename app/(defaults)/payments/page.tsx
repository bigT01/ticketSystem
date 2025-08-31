import PaymentsMain from "@/components/pages/PaymentsMain"
import Link from "next/link"

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
                    <span>Payments</span>
                </li>
            </ul>
            <PaymentsMain/>
        </div>
    )
}

export default Page;