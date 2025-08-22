"use client"
import { useEffect, useState } from "react";
import IconPlus from "../icon/icon-plus";
import { IProject } from "@/constants/interfaces";
import DefaultModal from "../modal/DefaultModal";
import { useDispatch } from "react-redux";
import { createProject, deleteProject, fetchProjects } from "@/store/slice/projectsSlice";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import { fetchCompanies } from "@/store/slice/companiesSlice";
import Tippy from "@tippyjs/react";
import IconTrashLines from "../icon/icon-trash-lines";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import DefaultProjectsTable from "../tables/defaultProjectsTable";

const defaultParams: IProject = {
        id: '',
        name: '',
        company_id: '',
        created_at: '',
        price: 0,
        isLocal: true
    };

const ProjectsMain = () => {
    const dispatch = useDispatch()
    const { companies } = useSelector((state: IRootState) => state.companies);
    const { projects } = useSelector((state: IRootState) => state.projects);

    const [params, setParams] = useState<IProject>(defaultParams);
    const [projectList, setProjectList] = useState<IProject[]>([])
    const [addProject, setAddProject] = useState<boolean>(false);
    const [deleteProjectModal, setDeleteProjectModal] = useState<boolean>(false)

    useEffect(() => {
        dispatch(fetchProjects() as any )
        dispatch(fetchCompanies() as any )
    }, [dispatch])

    useEffect(() => {
        setProjectList(projects || [])
    }, [projects])

    const changeValue = (e: any) => {
        const { value, id } = e.target;

        setParams({ ...params, [id]: value });
    };
    
    const saveCompany = () => {
        let company = {
            name: params.name,
            company_id: params.company_id,
            price: params.price
        };  
        dispatch(createProject(company) as any)
        setAddProject(false)
    };

    const createProjectHandler = () => {
        setAddProject(true)
        setParams(defaultParams)
    }

    const deleteProjectHandler = (project:IProject) => {
        setParams(project)
        setDeleteProjectModal(true)
    }

    const deleteProjectAllowed = (projectId:string) => {
        dispatch(deleteProject(projectId) as any)
        setDeleteProjectModal(false)
    }

    const columns = [
        {
            header: 'Project Name',
            accessor: 'name',
            cellRenderer: (row:IProject) => (
                <Link href={`/projects/${row?.id}`} className="whitespace-nowrap hover:text-primary hover:underline">{row.name}</Link>
            )
        },
        {
            header: 'Company',
            accessor: 'company.name',
            cellRenderer: (row:IProject) => (
                <Link href={`/orders/${row?.company?.id}`} className="whitespace-nowrap hover:text-primary hover:underline">
                    {row?.company?.name}
                </Link>
            )
        },
        {
            header: 'Price',
            accessor: 'price'
        },
        {
            header: 'Created At',
            accessor: 'created_at',
            cellRenderer: (row:IProject) => formatDate(row.created_at)
        },
        {
            header: 'Actions',
            cellRenderer: (row:IProject) => (
                <div className="text-center">
                    <Tippy content="Delete">
                        <button type="button" onClick={() => deleteProjectHandler(row)}>
                            <IconTrashLines className="m-auto" />
                        </button>
                    </Tippy>
                </div>
            )
        }
    ];

    return(
        <div className="pt-5">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Projects</h1>
                <button onClick={() => createProjectHandler()} type="button" className="btn btn-success">
                    <IconPlus className="h-5 w-5 shrink-0 ltr:mr-1.5 rtl:ml-1.5" />
                    Add Project
                </button>
            </div>
            <div className="pt-5">
                <DefaultProjectsTable data={projectList} columns={columns} />
            </div>
            <DefaultModal isOpen={addProject} close={(isClose) => setAddProject(isClose)}>
                <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5 dark:bg-[#121c2c]">
                    Create Project
                </div>
                <div className="p-5">
                    {companies && <form>
                        <div className="mb-5">
                            <label htmlFor="name">Name</label>
                            <input id="name" disabled={!params?.isLocal} type="text" placeholder="Enter Project Name" className={`form-input ${params?.isLocal ? 'cursor-auto': 'cursor-not-allowed'}`} value={params.name} onChange={(e) => changeValue(e)} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="company_id">Company</label>
                            <select id="company_id" className="form-select" value={params.company_id} onChange={(e) => changeValue(e)}>
                                <option value="">Select Company</option>
                                {companies.map(company => (
                                    <option key={company.id} value={company.id}>{company.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="price">Price</label>
                            <input id="price" type="text" placeholder="Enter Total Price Amount" className="form-input" value={params.price} onChange={(e) => changeValue(e)} />
                        </div>
                        <div className="mt-8 flex items-center justify-end">
                            <button type="button" className="btn btn-outline-danger gap-2" onClick={() => setAddProject(false)}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveCompany}>
                                Create Project
                            </button>
                        </div>
                    </form>}
                </div>
            </DefaultModal>

            <DefaultModal isOpen={deleteProjectModal} close={(isClose) => setDeleteProjectModal(isClose)}>
                <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5 dark:bg-[#121c2c]">
                    Delete Project
                </div>
                <div className="p-5">
                    {companies && <form>
                        <div className="mb-5">
                            <p>Do you want to delete {params.name} project for company {params?.company?.name}</p>
                        </div>
                        <div className="mt-8 flex items-center justify-end">
                            <button type="button" className="btn btn-outline-danger gap-2" onClick={() => setAddProject(false)}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => deleteProjectAllowed(params.id)}>
                                Delete Project
                            </button>
                        </div>
                    </form>}
                </div>
            </DefaultModal>
        </div>
    )
}

export default ProjectsMain;