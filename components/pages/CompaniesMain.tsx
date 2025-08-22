"use client"
import IconPlus from "../icon/icon-plus"
import { useEffect, useState } from "react"
import { sanitizeText } from "@/utils/sanitizeText"
import DefaultModal from "../modal/DefaultModal"
import { ICompany } from "@/constants/interfaces"
import { useDispatch } from "react-redux"
import { createCompany, fetchCompanies } from "@/store/slice/companiesSlice"
import { useSelector } from "react-redux"
import { IRootState } from "@/store"
import IconBox from "../icon/icon-box"
import IconArrowLeft from "../icon/icon-arrow-left"

const defaultParams: ICompany = {
        id: '',
        name: '',
        customer: '',
        projectsCount: 0,
        isLocal: true
    };

const CompaniesMain = () => {
    const dispatch = useDispatch()
    const { companies, loading, message } = useSelector((state: IRootState) => state.companies);


    const [params, setParams] = useState<ICompany>(defaultParams);
    const [companiesList, setCompaniesList] = useState<ICompany[]>([])
    const [addCompany, setAddCompany] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchCompanies() as any )
    }, [dispatch])

    useEffect(() => {
        setCompaniesList(companies || [])
    }, [companies])

    const changeValue = (e: any) => {
        const { value, id } = e.target;

        let newValue = value;

        if (id === 'id') {  // например, только для username
            newValue = sanitizeText(value);
        }


        setParams({ ...params, [id]: newValue });
    };

    const saveCompany = () => {
        let company = {
            id: params.id,
            name: params.name,
            customer: params.customer,
        };  
        dispatch(createCompany(company) as any)
        setAddCompany(false)
    };

    const createCompanyHandler = () => {
        setAddCompany(true)
        setParams(defaultParams)
    }
    return (
        <div className="pt-5">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Companies</h1>
                <button onClick={() => createCompanyHandler()} type="button" className="btn btn-success">
                    <IconPlus className="h-5 w-5 shrink-0 ltr:mr-1.5 rtl:ml-1.5" />
                    Add Company
                </button>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-5">
                {companiesList && companiesList.map(company => (
                    <div key={company.id} className="mb-5 flex w-full flex-wrap justify-center">
                        <div className="rounded-md w-full border border-gray-500/20 p-6 shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)]">
                            <div className="mb-5 text-primary">
                                <IconBox className="h-12 w-12" />
                            </div>
                            <h5 className="mb-3.5 text-lg font-semibold dark:text-white-light">{company.name}</h5>
                            <p className="mb-3.5 text-[15px]  text-white-dark">{company.projectsCount ? `There ${company.projectsCount > 1? 'were': 'was'} ${company.projectsCount} order${company.projectsCount > 1? 's': ''} from this Company` : "There was not any kind of orders"}</p>
                            <button type="button" className="group font-semibold text-primary hover:underline">
                                Discover{' '}
                                <IconArrowLeft className="relative inline-block transition-all duration-300 group-hover:translate-x-2 ltr:ml-1 rtl:mr-1 rtl:rotate-180 rtl:group-hover:-translate-x-2" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <DefaultModal isOpen={addCompany} close={(isClose) => setAddCompany(isClose)}>
                <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5 dark:bg-[#121c2c]">
                    Create Company
                </div>
                <div className="p-5">
                    <form>
                        <div className="mb-5">
                            <label htmlFor="if">Id</label>
                            <input id="id" disabled={!params?.isLocal} type="text" placeholder="Enter Title" className={`form-input ${params?.isLocal ? 'cursor-auto': 'cursor-not-allowed'}`} value={params.id} onChange={(e) => changeValue(e)} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" placeholder="Enter Name Of The Company" className="form-input" value={params.name} onChange={(e) => changeValue(e)} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="customer">Customer</label>
                            <input id="customer" type="text" placeholder="Enter Customer name" className="form-input" value={params.customer} onChange={(e) => changeValue(e)} />
                        </div>
                        <div className="mt-8 flex items-center justify-end">
                            <button type="button" className="btn btn-outline-danger gap-2" onClick={() => setAddCompany(false)}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveCompany}>
                                Create Company
                            </button>
                        </div>
                    </form>
                </div>
            </DefaultModal>
        </div>
    )
}

export default CompaniesMain