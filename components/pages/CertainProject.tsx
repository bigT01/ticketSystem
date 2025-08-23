import { IDeveloper, IProjectDevelopers } from "@/constants/interfaces";
import { IRootState } from "@/store";
import { fetchProjectDevelopers } from "@/store/slice/projectsSlice";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import DefaultProjectsTable from "../tables/defaultProjectsTable";
import { formatNumber } from "@/utils/formatNumber";
import ProjectTotalFee from "../cards/ProjectTotalFee";
import { fetchProjectDetailById } from "@/store/slice/projectDetailsSlice";
import getProgressDateToday from "@/utils/getProgressDateToday";
import { getDaysLeft } from "@/utils/getDaysLeft";
import { diffDays } from "@/utils/diffDays";

const CertainProject = () => {
    const dispatch = useDispatch()
    const { project, projectDevelopers, loading, message } = useSelector((state: IRootState) => state.projects);
    const { projectDetail } = useSelector((state: IRootState) => state.projectDetails);

    const [developerList, setDeveloperList] = useState<IDeveloper[]>([])
    
    useEffect(() => {
        if(project?.id){
            dispatch(fetchProjectDevelopers(project.id) as any)
            dispatch(fetchProjectDetailById(project.id) as any)
        }
    }, [project, dispatch])

    useEffect(() => {
        if(project && projectDevelopers){
            setDeveloperList(projectDevelopers.developers)
        }
    }, [projectDevelopers, project])

    const columns = [
        {
            header: 'Developer',
            accessor: 'staff',
            cellRenderer: (row:IDeveloper) => (
                <Link href={"#"}>
                    <div className="flex items-center">
                        <Image width={32} height={32} className="h-8 w-8 rounded-full object-cover ltr:mr-3 rtl:ml-3" src={`http://localhost:3000/photos/file?path=${row.staff.image}`} alt="avatar" />
                        <span className="whitespace-nowrap">{row.staff.name}</span>
                    </div>
                </Link>
            )
        },
        {
            header: 'Compensation',
            accessor: 'compensation',
            cellRenderer: (row:IDeveloper) => (
                <span>{formatNumber(row?.compensation)} тг</span>
            )
        },
    ];


    
    return(
        <div className="pt-5">
            <div className="flex justify-between items-center mb-5">
                <div>
                    <h1 className="text-3xl font-bold mb-2">{project?.name}</h1>
                    <h4 className="text-md font-bold">For <Link className="hover:text-primary hover:underline" href={`/orders/${project?.company_id}`}>{project?.company?.name}</Link></h4>
                </div>
                <span className="text-white-dark font-bold">{project?.created_at ? formatDate(project?.created_at) : 'null'}</span>
            </div>
            

            <div className="flex gap-4 mb-5">
                <div className="panel w-8/12">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Developers</h5>
                    </div>
                    <DefaultProjectsTable data={developerList} columns={columns} />
                </div>
                <div className="w-4/12 relative">
                    <ProjectTotalFee/>
                </div>
            </div>
            <div className="flex gap-4">
                <div className="panel w-full">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Project Details</h5>
                    </div>
                    <div className="space-y-2 ">
                        <h3 className="text-base">{projectDetail?.estimate_end_date ? getDaysLeft(projectDetail?.estimate_end_date) ? `${getDaysLeft(projectDetail?.estimate_end_date)} days left` : projectDetail?.end_date ? projectDetail.estimate_end_date < projectDetail.end_date ? `The project was overdue by: ${diffDays(projectDetail.estimate_end_date, projectDetail.end_date)}` : "Project was finished" : `${diffDays(projectDetail.estimate_end_date, new Date().toISOString())}` : null}</h3>
                        <div className="flex justify-between">
                            <span className="text-white-dark font-bold">{projectDetail?.start_date ? formatDate(projectDetail .start_date) : null}</span>
                            <span className="text-white-dark font-bold">{projectDetail?.estimate_end_date ? formatDate(projectDetail?.estimate_end_date): null}</span>
                        </div>
                        <div className="flex h-2 w-full rounded-full bg-[#ebedf2] dark:bg-dark/40">
                            <div
                                className="animated-progress h-2 w-2/12 bg-info text-center text-xs text-white ltr:rounded-l-full rtl:rounded-r-full ltr:rounded-r-full rtl:rounded-l-full"
                                style={{
                                    width: `${projectDetail?.start_date && projectDetail?.estimate_end_date ? getProgressDateToday(projectDetail.start_date ,projectDetail.estimate_end_date) : 0}%`,
                                    backgroundImage:
                                        'linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)',
                                    backgroundSize: '1rem 1rem',
                                }}
                            ></div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CertainProject;