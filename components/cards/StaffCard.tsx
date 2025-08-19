"use client";
import Link from "next/link";
import IconMultipleForwardRight from "../icon/icon-multiple-forward-right";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchStaff } from "@/store/slice/staffSlice";
import { IRootState } from "@/store";
import { useSelector } from "react-redux";
import Image from "next/image";

const StaffCard = () => {
    const dispatch = useDispatch();
    const { staff, loading, message } = useSelector((state: IRootState) => state.staff);

    useEffect(() => {
        dispatch(fetchStaff() as any)
    }, [dispatch])
    return(
        <div className="grid w-full">
            <div className="panel h-[285px] overflow-y-scroll w-full">
                <div className="mb-5 flex items-center justify-between">
                    <h5 className="text-lg font-semibold dark:text-white-light">Short Staff Informations</h5>
                </div>
                <div className="table-responsive pb-5">
                    <table className="h-full">
                        <thead>
                            <tr>
                                <th className="ltr:rounded-l-md rtl:rounded-r-md">Staff</th>
                                <th>Projects count</th>
                                <th>Paid</th>
                                <th className="ltr:rounded-r-md rtl:rounded-l-md">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staff[0] && staff.map(staffItem => (
                                <tr key={staffItem.id} className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                    <td className="min-w-[150px] text-black dark:text-white">
                                        <div className="flex items-center">
                                            <Image width={32} height={32} className="h-8 w-8 rounded-full object-cover ltr:mr-3 rtl:ml-3" src={`http://localhost:3000/photos/file?path=${staffItem.image}`} alt="avatar" />
                                            <span className="whitespace-nowrap">{staffItem.name}</span>
                                        </div>
                                    </td>
                                    <td className="text-primary">{staffItem.projectsCount}</td>
                                    <td>{staffItem.paid}</td>
                                    <td>
                                        <span className={`badge ${staffItem.isActive ? 'bg-success' : 'bg-secondary'} shadow-md dark:group-hover:bg-transparent`}>{staffItem.isActive? 'Active' : 'Rest'}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default StaffCard;