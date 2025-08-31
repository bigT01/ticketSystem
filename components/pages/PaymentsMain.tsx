"use client";
import Link from "next/link";
import IconPlus from "../icon/icon-plus";
import { IPayment } from "@/constants/interfaces";
import { formatNumber } from "@/utils/formatNumber";
import { formatDate } from "@/utils/formatDate";
import IconEdit from "../icon/icon-edit";
import Tippy from "@tippyjs/react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import { useEffect, useState } from "react";
import { fetchPayments } from "@/store/slice/paymentSlice";
import DefaultProjectsTable from "../tables/defaultProjectsTable";
import Image from "next/image";
import DefaultModal from "../modal/DefaultModal";
import Flatpickr from 'react-flatpickr';
import { fetchStaff } from "@/store/slice/staffSlice";

const defaultParams: any = {
        id: '',
        name: '',
        company_id: '',
        created_at: '',
        price: 0,
        isLocal: true
    };

const PaymentsMain = () => {
    const dispatch = useDispatch()
    const { payments } = useSelector((state: IRootState) => state.payment);
    const { staff } = useSelector((state: IRootState) => state.staff);

    const [params, setParams] = useState<any>(defaultParams);
    const [paymentList, setPaymentList] = useState<IPayment[]>([])
    const [addPayment, setAddPayment] = useState<boolean>(false)
    const [date1, setDate1] = useState<any>('22-08-2025');

    const changeValue = (e: any) => {
        const { value, id } = e.target;

        setParams({ ...params, [id]: value });
    };
    
    useEffect(() => {
        dispatch(fetchPayments() as any )
        dispatch(fetchStaff() as any )
        const now = new Date()
        setDate1(now)
    }, [dispatch])
    
    useEffect(() => {
        setPaymentList(payments || [])
    }, [payments])

    const columns = [
        {
            header: 'Id',
            accessor: 'id',
            cellRenderer: (row:IPayment) => (
                <Link href={`/payments/${row?.id}`} className="whitespace-nowrap hover:text-primary hover:underline">{row.id}</Link>
            )
        },
        {
            header: 'Type',
            accessor: 'projectStatConnection',
            cellRenderer: (row:IPayment) => (
                <span >{row?.type}</span>
            )
        },
        {
            header: 'Staff',
            accessor: 'staff',
            cellRenderer: (row:IPayment) => (
                <Link href={"#"}>
                    <div className="flex items-center">
                        {row?.staff?.image ? <Image width={32} height={32} className="h-8 w-8 rounded-full object-cover ltr:mr-3 rtl:ml-3" src={`http://localhost:3000/photos/file?path=${row.staff.image}`} alt="avatar" />: null}
                        <span className="whitespace-nowrap">{row?.staff ? row.staff.name : null}</span>
                    </div>
                </Link>
            )
        },
        {
            header: 'Project',
            accessor: 'project.name',
            cellRenderer: (row:IPayment) => (
                <Link href={`/projects/${row?.project_id}`} className="whitespace-nowrap hover:text-primary hover:underline">
                    {row?.project?.name}
                </Link>
            )
        },
        {
            header: 'Price',
            accessor: 'price',
            cellRenderer: (row:IPayment) => (
                <span>{formatNumber(row?.amount)} тг</span>
            )
        },
        {
            header: 'Created At',
            accessor: 'date',
            cellRenderer: (row:IPayment) => formatDate(row.date)
        },
        {
            header: 'Method',
            accessor: 'method',
            cellRenderer: (row:IPayment) => (
                <div>
                    <span className={`whitespace-nowrap ${row?.image_path ? 'hover:text-primary hover:underline' : null} `}>{row.method}</span>
                </div>
            )
        },
        {
            header: 'Actions',
            cellRenderer: (row:IPayment) => (
                <div className="text-center">
                    <Tippy content="Edit">
                        <button type="button" onClick={() => console.log(row)}>
                            <IconEdit className="m-auto" />
                        </button>
                    </Tippy>
                </div>
            )
        }
    ];
    return (
        <div className="pt-5">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Payments</h1>
                <button onClick={() => setAddPayment(true)} type="button" className="btn btn-success">
                    <IconPlus className="h-5 w-5 shrink-0 ltr:mr-1.5 rtl:ml-1.5" />
                    Add Payment
                </button>
            </div>
            <div className="pt-5">
                <div className="overflow-hidden w-[1000px]">
                    <DefaultProjectsTable data={paymentList} columns={columns} />
                </div>
            </div>
            <DefaultModal isOpen={addPayment} close={(isClose) => setAddPayment(isClose)}>
                <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5 dark:bg-[#121c2c]">
                    Create Payment
                </div>
                <div className="p-5">
                    <form>
                        <div className="mb-5">
                            <label htmlFor="type">Type</label>
                            <select id="type" className="form-select" value={params.type} onChange={(e) => changeValue(e)}>
                                <option value="">Select Type</option>
                                <option value="project">Project</option>
                                <option value="salary">Salary</option>
                            </select>
                        </div>
                        
                        <div className="mb-5">
                            <label htmlFor="staff_id">Staff</label>
                            <select id="staff_id" className="form-select" value={params.staff_id} onChange={(e) => changeValue(e)}>
                                <option value="">Select Staff</option>
                                {staff.map(staffItem => (
                                    <option key={staffItem.id} value={staffItem.id}>{staffItem.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="amount">Amount</label>
                            <input id="price" type="text" placeholder="Enter Amount" className="form-input" value={params.amount} onChange={(e) => changeValue(e)} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="amount">Transaction Date</label>
                            <Flatpickr value={date1} options={{ dateFormat: 'd-m-Y', position: 'auto right' }} className="form-input" onChange={(date) => setDate1(date)} />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="amount">Confirmation Document</label>
                            <input type="file" id="file" className="hidden custom-file-container__custom-file__custom-file-input" accept="image/*" />
                            <label className=" form-input" htmlFor="file">Choose File...</label>
                        </div>
                        <div className="mt-8 flex items-center justify-end">
                            <button type="button" className="btn btn-outline-danger gap-2" onClick={() => setAddPayment(false)}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => console.log(true)}>
                                Create Project
                            </button>
                        </div>
                    </form>
                </div>
            </DefaultModal>
        </div>
    )
}

export default PaymentsMain;