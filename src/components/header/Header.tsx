"use client";
import { Fragment, useState } from "react";
import Button from "../ui/Button";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import LinkUI from "../ui/LinkUi";
import { handleLoginModalState } from "@/app/slices/modalLogin";
import { useAppDispatch, useAppSelector } from "@/app/provider";
import { handleCreateModalState } from "@/app/slices/modalCreate";
import Avatar from "../ui/Avatar";
import Drawer from "../ui/Drawer";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Sobre", href: "/sobre", current: false },
  { name: "Contato", href: "/contato", current: false },
  { name: "Serviços", href: "/serviços", current: false },
];
const userNavigation = [
  { name: "Seu Perfil", href: "/perfil" },
  { name: "Agendados", href: "/agendados" },
];

export default function Header() {
  const user = useAppSelector((state) => state.userState);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const dispatch = useAppDispatch();

  const handleLoginModal = () => {
    dispatch(handleLoginModalState(true));
  };

  const handleCreateModal = () => {
    dispatch(handleCreateModalState(true));
  };

  return (
    <nav className="bg-white shadow-md z-10 sticky top-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-2">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="-ml-2 mr-2 flex items-center md:hidden">
              <button
                onClick={() => setOpenMobileMenu(!openMobileMenu)}
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                {openMobileMenu ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-10">
              {navigation.map((item) => (
                <LinkUI
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  selected={item.current}
                >
                  {item.name}
                </LinkUI>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex-shrink-0">
                <Button
                  size="small"
                  type="button"
                  className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Agendar
                </Button>
              </div>
            ) : null}

            <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
              {/* Profile dropdown */}
              {user ? (
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>

                      <Avatar name={user.name} lastName={user.lastName} />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute flex flex-col p-4 gap-4 right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <LinkUI href={item.href} selected={active}>
                              {item.name}
                            </LinkUI>
                          )}
                        </Menu.Item>
                      ))}
                      <Menu.Item>
                        <Button
                          onClick={() => {
                            document.cookie =
                              "npmu-id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                            localStorage.removeItem("npmu-user");
                            window.location.reload();
                          }}
                          variant="secondary"
                          size="small"
                        >
                          Sair
                        </Button>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={handleCreateModal}
                  >
                    Cadastre-se
                  </Button>
                  <Button size="small" onClick={handleLoginModal}>
                    Entre
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Drawer open={openMobileMenu} onClose={() => setOpenMobileMenu(false)}>
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3 flex flex-col gap-4">
          {navigation.map((item) => (
            <LinkUI
              key={item.name}
              href={item.href}
              selected={item.current}
              aria-current={item.current ? "page" : undefined}
            >
              {item.name}
            </LinkUI>
          ))}
        </div>
        {user ? (
          <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="flex items-center px-5 sm:px-6">
              <div className="flex-shrink-0">
                <Avatar name={user.name} lastName={user.lastName} />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">
                  {user.name}
                </div>
                <div className="text-sm font-medium text-gray-400">
                  {user.email}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-4 px-2 sm:px-3">
              {userNavigation.map((item) => (
                <LinkUI
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  {item.name}
                </LinkUI>
              ))}
              <Button
                onClick={() => {
                  document.cookie =
                    "npmu-id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  localStorage.removeItem("npmu-user");
                  window.location.reload();
                }}
                variant="secondary"
                fluid
                size="small"
              >
                Sair
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 px-2">
            <Button
              onClick={handleCreateModal}
              variant="secondary"
              size="small"
            >
              Cadastre-se
            </Button>
            <Button onClick={handleLoginModal} size="small">
              Entre
            </Button>
          </div>
        )}
      </Drawer>
    </nav>
  );
}
