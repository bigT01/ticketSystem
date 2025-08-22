"use client"
import CertainCompany from "@/components/pages/CertainCompany";
import { fetchCompanyById } from "@/store/slice/companiesSlice";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Page = () => {
    const dispatch = useDispatch()
    const {companyId} = useParams<{ companyId: string }>()

    useEffect(() => {
        if(companyId){
            dispatch(fetchCompanyById(companyId) as any)
        }
    }, [companyId, dispatch])
    return(
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/" className="text-primary before:content-['/'] ltr:before:mr-2 rtl:before:ml-2 ">
                        <span className="hover:underline">Companies</span>
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{companyId}</span>
                </li>
            </ul>
            <CertainCompany/>
        </div>
    )
}

export default Page;