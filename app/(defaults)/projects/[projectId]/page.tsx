"use client"
import CertainProject from "@/components/pages/CertainProject"
import { fetchProjectById } from "@/store/slice/projectsSlice"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const Page = () => {
    const dispatch = useDispatch()
    const {projectId} = useParams<{ projectId: string }>()

    useEffect(() => {
        if(projectId){
            dispatch(fetchProjectById(projectId) as any)
        }
    }, [projectId, dispatch])
    return(
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/projects" className="text-primary before:content-['/'] ltr:before:mr-2 rtl:before:ml-2 ">
                        <span className="hover:underline">Projects</span>
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{projectId}</span>
                </li>
            </ul>
            <CertainProject/>
        </div>
    )
}

export default Page;