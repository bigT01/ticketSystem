import Link from "next/link";
import IconPencilPaper from "../icon/icon-pencil-paper";
import IconCoffee from "../icon/icon-coffee";
import IconCalendar from "../icon/icon-calendar";
import IconMapPin from "../icon/icon-map-pin";
import IconMail from "../icon/icon-mail";
import IconPhone from "../icon/icon-phone";
import IconTwitter from "../icon/icon-twitter";
import IconDribbble from "../icon/icon-dribbble";
import IconGithub from "../icon/icon-github";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import IconUsersGroup from "../icon/icon-users-group";
import IconUser from "../icon/icon-user";
import { useEffect, useState } from "react";
import { IProject } from "@/constants/interfaces";
import { formatDate } from "@/utils/formatDate";
import DefaultProjectsTable from "../tables/defaultProjectsTable";
import Image from "next/image";
import { formatNumber } from "@/utils/formatNumber";

const CertainCompany = () => {
    const { company, loading, message } = useSelector((state: IRootState) => state.companies);

    const [projectList, setProjectList] = useState<IProject[]>([])

    useEffect(() => {
        if(company && company.projects){
            setProjectList(company.projects)
        }
    }, [company])

    const columns = [
        {
            header: 'Project Name',
            accessor: 'name',
            cellRenderer: (row:IProject) => (
                <Link href={`/projects/${row.id}`} className="whitespace-nowrap hover:text-primary hover:underline">{row.name}</Link>
            )
        },
        {
            header: 'Price',
            accessor: 'price',
            cellRenderer: (row:IProject) => (
                <span>{formatNumber(row?.price)} тг</span>
            )
        },
        {
            header: 'Created At',
            accessor: 'created_at',
            cellRenderer: (row:IProject) => formatDate(row.created_at)
        },
    ];
    return(
        <div className="pt-5">
            <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3 xl:grid-cols-4">
                    <div className="panel">
                        <div className="mb-5 flex items-center justify-between">
                            <h5 className="text-lg font-semibold dark:text-white-light">Profile</h5>
                            <Link href="/users/user-account-settings" className="btn btn-primary rounded-full p-2 ltr:ml-auto rtl:mr-auto">
                                <IconPencilPaper />
                            </Link>
                        </div>
                        <div className="mb-5">
                            <div className="flex flex-col items-center justify-center">
                                {!company?.image_path ? <IconUsersGroup className="h-24 w-24 mb-2" /> : <Image width={32} height={32} className="h-24 w-24 mb-2 rounded-full object-cover ltr:mr-3 rtl:ml-3" src={`http://localhost:3000/photos/file?path=${company?.image_path}`} alt="companyImage" />}
                                <p className="text-xl font-semibold text-primary">{company?.name}</p>
                            </div>
                            <ul className="m-auto mt-5 flex max-w-[160px] flex-col space-y-4 font-semibold text-white-dark">
                                <li className="flex items-center gap-2">
                                    <IconUser className="shrink-0" /> <Link href={'#'} className="hover:text-primary hover:underline">{company?.customer}</Link>
                                </li>
                                <li className="flex items-center gap-2">
                                    <IconCalendar className="shrink-0" />
                                    created Date
                                </li>
                                <li className="flex items-center gap-2">
                                    <IconMapPin className="shrink-0" />
                                    Location
                                </li>
                                <li>
                                    <button className="flex items-center gap-2">
                                        <IconMail className="h-5 w-5 shrink-0" />
                                        <span className="truncate text-primary">coorparation email</span>
                                    </button>
                                </li>
                                <li className="flex items-center gap-2">
                                    <IconPhone />
                                    <span className="whitespace-nowrap" dir="ltr">
                                        +1 (530) 555-12121
                                    </span>
                                </li>
                            </ul>
                            <ul className="mt-7 flex items-center justify-center gap-2">
                                <li>
                                    <button className="btn btn-info flex h-10 w-10 items-center justify-center rounded-full p-0">
                                        <IconTwitter className="h-5 w-5" />
                                    </button>
                                </li>
                                <li>
                                    <button className="btn btn-danger flex h-10 w-10 items-center justify-center rounded-full p-0">
                                        <IconDribbble />
                                    </button>
                                </li>
                                <li>
                                    <button className="btn btn-dark flex h-10 w-10 items-center justify-center rounded-full p-0">
                                        <IconGithub />
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="panel lg:col-span-2 xl:col-span-3">
                        <div className="mb-5">
                            <h5 className="text-lg font-semibold dark:text-white-light">Projects from {company?.name}</h5>
                        </div>
                        <DefaultProjectsTable data={projectList} columns={columns} />
                    </div>
                </div>
        </div>
    )
}

export default CertainCompany;