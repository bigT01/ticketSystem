"use client";

import { useEffect, useState } from "react";
import IconDollarSign from "../icon/icon-dollar-sign";
import ReactApexChart from "react-apexcharts";

const dailySales: any = {
        series: [
            {
                name: 'Paid Part',
                data: [200000, 100000],
            },
            {
                name: 'Remaining Part',
                data: [100000, 350000], // Full Amount - Paid Part
            },
        ],
        options: {
            chart: {
                height: 160,
                type: 'bar',
                fontFamily: 'Nunito, sans-serif',
                toolbar: {
                    show: false,
                },
                stacked: true,
                stackType: '100%',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 1,
            },
            colors: ['#e2a03f', '#e0e6ed'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0,
                        },
                    },
                },
            ],
            xaxis: {
                labels: {
                    show: false,
                },
                categories: ['JB works', 'Svoy'],
            },
            yaxis: {
                show: false,
            },
            fill: {
                opacity: 1,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '25%',
                },
            },
            legend: {
                show: false,
            },
            grid: {
                show: false,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: 10,
                    right: -20,
                    bottom: -20,
                    left: -20,
                },
            },
        },
    };

const ProjectsStepCard = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false);
        useEffect(() => {
            setIsMounted(true);
        }, []);
    return(
        <div className="mb-6">
            <div className="panel h-[285px] sm:col-span-2 xl:col-span-1">
                <div className="mb-5 flex items-center">
                    <h5 className="text-lg font-semibold dark:text-white-light">
                        Stages of sale
                        <span className="block text-sm font-normal text-white-dark">Go to columns for details.</span>
                    </h5>
                    <div className="relative ltr:ml-auto rtl:mr-auto">
                        <div className="grid h-11 w-11 place-content-center rounded-full bg-[#ffeccb] text-warning dark:bg-warning dark:text-[#ffeccb]">
                            <IconDollarSign />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="rounded-lg bg-white dark:bg-black">
                        {isMounted ? (
                            <ReactApexChart series={dailySales.series} options={dailySales.options} type="bar" height={160} width={'100%'} />
                        ) : (
                            <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectsStepCard;