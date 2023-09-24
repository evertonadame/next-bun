import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "./Button";
import { XMarkIcon } from "@heroicons/react/24/outline";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Drawer = ({ open, onClose, children }: DrawerProps) => {
  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog as="div" data-cid="drawer" onClose={onClose}>
        <div className="fixed inset-0 overflow-hidden bg-white z-10">
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={React.Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="w-full h-full">
                <Button
                  onClick={onClose}
                  iconOnly
                  className="absolute right-3 top-3"
                  aria-label="drawer close button"
                >
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                </Button>
                <div className="pt-16 h-full w-full">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Drawer;
