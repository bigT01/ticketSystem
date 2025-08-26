'use client';
import { IRootState } from '@/store';
import ReactApexChart from 'react-apexcharts';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const ProjectUsageCard = () => {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const { usage } = useSelector((state: IRootState) => state.projectUsage);

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Преобразуем usage в данные для графика
    const categories = usage.map(u => dayjs(u.day).format('DD/MM'));
    const seriesData = usage.map(u => Number(u.requests));

    // lineChartOptions
    const lineChart: any = {
        series: [
            {
                name: 'Requests',
                data: seriesData,
            },
        ],
        options: {
            chart: {
                height: 300,
                type: 'line',
                toolbar: false,
            },
            colors: ['#4361EE'],
            tooltip: {
                marker: false,
                y: {
                    formatter(number: number) {
                        return number;
                    },
                },
            },
            stroke: {
                width: 2,
                curve: 'smooth',
            },
            xaxis: {
                categories: categories,
                axisBorder: {
                    color: isDark ? '#191e3a' : '#e0e6ed',
                },
            },
            yaxis: {
                opposite: isRtl ? true : false,
                labels: {
                    offsetX: isRtl ? -20 : 0,
                },
            },
            grid: {
                borderColor: isDark ? '#191e3a' : '#e0e6ed',
            },
        },
    };

    return (
        <div className="panel w-full mb-5">
            <div className="mb-5">
                <h5 className="text-lg font-semibold dark:text-white-light">Project Usage</h5>
            </div>
            {isMounted && (
                <ReactApexChart
                    series={lineChart.series}
                    options={lineChart.options}
                    className="rounded-lg bg-white dark:bg-black"
                    type="line"
                    height={300}
                    width={'100%'}
                />
            )}
        </div>
    );
};

export default ProjectUsageCard;
