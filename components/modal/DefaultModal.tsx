import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import IconX from "../icon/icon-x";

type DefaultModalProps = {
    isOpen: boolean,
    close: (value: boolean) => void,
    children: ReactNode,
}

const DefaultModal = ({isOpen, close, children}:DefaultModalProps) => {
    return(
        <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" open={isOpen} onClose={() => close(false)} className="relative z-50">
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-[black]/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => close(false)}
                                        className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600"
                                    >
                                        <IconX />
                                    </button>
                                    {children}
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
    )
}

export default DefaultModal;