import Link from "next/link";
import IconMultipleForwardRight from "../icon/icon-multiple-forward-right";

const StaffCard = () => {
    return(
        <div className="grid w-full">
            <div className="panel h-[285px] overflow-hidden w-full">
                <div className="mb-5 flex items-center justify-between">
                    <h5 className="text-lg font-semibold dark:text-white-light">Recent Orders</h5>
                </div>
                <div className="table-responsive pb-8">
                    <table className="">
                        <thead>
                            <tr>
                                <th className="ltr:rounded-l-md rtl:rounded-r-md">Customer</th>
                                <th>Project</th>
                                <th>Paid</th>
                                <th className="ltr:rounded-r-md rtl:rounded-l-md">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                <td className="min-w-[150px] text-black dark:text-white">
                                    <div className="flex items-center">
                                        <img className="h-8 w-8 rounded-md object-cover ltr:mr-3 rtl:ml-3" src="/assets/images/profile-6.jpeg" alt="avatar" />
                                        <span className="whitespace-nowrap">Luke Ivory</span>
                                    </div>
                                </td>
                                <td className="text-primary">Headphone</td>
                                <td>$56.07</td>
                                <td>
                                    <span className="badge bg-success shadow-md dark:group-hover:bg-transparent">Active</span>
                                </td>
                            </tr>
                            <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                <td className="text-black dark:text-white">
                                    <div className="flex items-center">
                                        <img className="h-8 w-8 rounded-md object-cover ltr:mr-3 rtl:ml-3" src="/assets/images/profile-7.jpeg" alt="avatar" />
                                        <span className="whitespace-nowrap">Andy King</span>
                                    </div>
                                </td>
                                <td className="text-info">Nike Sport</td>
                                
                                <td>$126.04</td>
                                <td>
                                    <span className="badge bg-secondary shadow-md dark:group-hover:bg-transparent">Rest</span>
                                </td>
                            </tr>
                            <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                <td className="text-black dark:text-white">
                                    <div className="flex items-center">
                                        <img className="h-8 w-8 rounded-md object-cover ltr:mr-3 rtl:ml-3" src="/assets/images/profile-8.jpeg" alt="avatar" />
                                        <span className="whitespace-nowrap">Laurie Fox</span>
                                    </div>
                                </td>
                                <td className="text-warning">Sunglasses</td>
                                
                                <td>$56.07</td>
                                <td>
                                    <span className="badge bg-success shadow-md dark:group-hover:bg-transparent">Active</span>
                                </td>
                            </tr>
                            <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                <td className="text-black dark:text-white">
                                    <div className="flex items-center">
                                        <img className="h-8 w-8 rounded-md object-cover ltr:mr-3 rtl:ml-3" src="/assets/images/profile-9.jpeg" alt="avatar" />
                                        <span className="whitespace-nowrap">Ryan Collins</span>
                                    </div>
                                </td>
                                <td className="text-danger">Sport</td>
                                
                                <td>$110.00</td>
                                <td>
                                    <span className="badge bg-secondary shadow-md dark:group-hover:bg-transparent">Rest</span>
                                </td>
                            </tr>
                            <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                <td className="text-black dark:text-white">
                                    <div className="flex items-center">
                                        <img className="h-8 w-8 rounded-md object-cover ltr:mr-3 rtl:ml-3" src="/assets/images/profile-10.jpeg" alt="avatar" />
                                        <span className="whitespace-nowrap">Irene Collins</span>
                                    </div>
                                </td>
                                <td className="text-secondary">Speakers</td>
                                
                                <td>$56.07</td>
                                <td>
                                    <span className="badge bg-success shadow-md dark:group-hover:bg-transparent">Active</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default StaffCard;