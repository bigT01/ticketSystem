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
import ReactApexChart from "react-apexcharts";

const CertainProject = () => {
    const dispatch = useDispatch()
    const { project, projectDevelopers, loading, message } = useSelector((state: IRootState) => state.projects);

    const [developerList, setDeveloperList] = useState<IDeveloper[]>([])
    const [pieChartSeries, setPieChartSeries] = useState<[number, number]>([0, 0])
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if(project?.id){
            dispatch(fetchProjectDevelopers(project.id) as any)
        }
    }, [project, dispatch])

    useEffect(() => {
        if(project && projectDevelopers){
            setDeveloperList(projectDevelopers.developers)
            setPieChartSeries([projectDevelopers.developers.reduce((sum, dev) => sum + dev.compensation, 0), project.price -  projectDevelopers.developers.reduce((sum, dev) => sum + dev.compensation, 0)])
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


    const PieChartInfo: any = {
        series: [985, 737, 270],
        options: {
            chart: {
                type: 'donut',
                height: 460,
                fontFamily: 'Nunito, sans-serif',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 25,
                colors: '#fff',
            },
            colors: ['#e2a03f', '#5c1ac3', '#e7515a'],
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                height: 100,
                offsetY: -75,
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '65%',
                        background: 'transparent',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '29px',
                                offsetY: -10,
                            },
                            value: {
                                show: true,
                                fontSize: '26px',
                                color: undefined,
                                offsetY: 16,
                                formatter: (val: any) => {
                                    return val;
                                },
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                color: '#888ea8',
                                fontSize: '29px',
                                formatter: (w: any) => {
                                    return w.globals.seriesTotals.reduce(function (a: any, b: any) {
                                        return a + b;
                                    }, 0);
                                },
                            },
                        },
                    },
                },
            },
            labels: ['Developers', 'Free'],
            states: {
                hover: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
                active: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
            },
        },
    };
    return(
        <div className="pt-5">
            <div className="flex justify-between items-center mb-5">
                <div>
                    <h1 className="text-3xl font-bold mb-2">{project?.name}</h1>
                    <h4 className="text-md font-bold">For <Link className="hover:text-primary hover:underline" href={`/orders/${project?.company_id}`}>{project?.company?.name}</Link></h4>
                </div>
                <span className="text-white-dark font-bold">{project?.created_at ? formatDate(project?.created_at) : 'null'}</span>
            </div>
            

            <div className="flex gap-4">
                <div className="panel w-8/12">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Developers</h5>
                    </div>
                    <DefaultProjectsTable data={developerList} columns={columns} />
                </div>
                <div className="w-4/12 relative">
                    <div className="panel h-full">
                        <div className="mb-5 flex items-center">
                            <h5 className="text-lg font-semibold dark:text-white-light">Total Fee</h5>
                        </div>
                        <div className="relative">
                            <div className="rounded-lg bg-white dark:bg-black">
                                {isMounted ? (
                                    <ReactApexChart series={pieChartSeries} options={PieChartInfo.options} type="donut" height={460} width={'100%'} />
                                ) : (
                                    <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                        <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CertainProject;