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
import ProjectDetailsCard from "../cards/ProjectDetailsCard";
import { fetchMilestonesByProject } from "@/store/slice/milestoneSlice";
import ProjectMilestoneCard from "../cards/ProjectMilestoneCard";

const CertainProject = () => {
    const dispatch = useDispatch()
    const { project, projectDevelopers, loading, message } = useSelector((state: IRootState) => state.projects);
    const { milestones } = useSelector((state: IRootState) => state.milestone);

    const [developerList, setDeveloperList] = useState<IDeveloper[]>([])
    
    useEffect(() => {
        if(project?.id){
            dispatch(fetchProjectDevelopers(project.id) as any)
            dispatch(fetchProjectDetailById(project.id) as any)
            dispatch(fetchMilestonesByProject(project.id) as any)
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
            <div className="flex gap-4 mb-5">
                <ProjectMilestoneCard/>
            </div>
            <div className="flex gap-4">
                <ProjectDetailsCard/>
            </div>
        </div>
    )
}

export default CertainProject;