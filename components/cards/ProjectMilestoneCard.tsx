"use client"
import { IRootState } from "@/store";
import { useSelector } from "react-redux";

const ProjectMilestoneCard = () => {
    const { milestones } = useSelector((state: IRootState) => state.milestone);

    const colors = [['from-[#7579ff]', 'to-[#b224ef]'], ['from-[#3cba92]', 'to-[#0ba360]'], ['from-[#f09819]', ['to-[#ff5858]']]]
    return(
        <div className="panel w-full">
            <div className="mb-5">
                <h5 className="text-lg font-semibold dark:text-white-light">Milestone</h5>
            </div>
            <div className="space-y-9">
                {milestones.map((milestone, index) => (
                    <div key={milestone.id} className="flex items-center">
                        <div className="flex-1">
                            <div className="mb-2 flex font-semibold text-white-dark">
                                <h6>{milestone.name}</h6>
                                <p className="ltr:ml-auto rtl:mr-auto">{milestone.percentage_of_project}%</p>
                            </div>
                            <div className="h-2 rounded-full bg-dark-light shadow dark:bg-[#1b2e4b]">
                                <div className={`h-full w-11/12 rounded-full bg-gradient-to-r ${colors[index % 3].join(' ')}`} style={{width: `${milestone?.contribution_percentages ? milestone?.contribution_percentages.reduce((sum, dev) => sum + dev, 0) : 0}%`}}></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProjectMilestoneCard;