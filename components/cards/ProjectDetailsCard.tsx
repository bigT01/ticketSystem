"use client"
import { IRootState } from "@/store";
import { diffDays } from "@/utils/diffDays";
import { formatDate } from "@/utils/formatDate";
import { getDaysLeft } from "@/utils/getDaysLeft";
import getProgressDateToday from "@/utils/getProgressDateToday";
import { useSelector } from "react-redux";


const ProjectDetailsCard = () => {
    const { projectDetail } = useSelector((state: IRootState) => state.projectDetails);

    return(
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
    )
}

export default ProjectDetailsCard;