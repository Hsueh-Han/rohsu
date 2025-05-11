import { ReactNode } from 'react';
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';

interface Props {
    closeHandler: () => void
    isOpen: boolean
    header?: ReactNode
    children?: ReactNode
    footer?: ReactNode
    isStatic?: boolean
};

function Modal({isOpen, closeHandler, header, footer, children, isStatic}: Props) {
  return (
    <>
        <Dialog
            className="relative z-50"
            open={isOpen}
            onClose={isStatic ? () => {} : closeHandler}
        >
            <DialogBackdrop
                className="fixed inset-0 bg-black/30 duration-300 ease-out data-[closed]:opacity-0"
                transition
            />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel
                    className="max-w-[90%] space-y-4 border bg-white p-6 rounded
                        duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
                    transition
                >
                    { header &&
                        <div className="font-bold text-lg">
                            {header}
                        </div>
                    }
                    { children &&
                        <div>
                            {children}
                        </div>
                    }
                    { footer &&
                        <div>
                            {footer}
                        </div>
                    }
                </DialogPanel>
            </div>
        </Dialog>
    </>
  )
}
export default Modal