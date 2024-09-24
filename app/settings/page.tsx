"use client";

import { Field, Label, Switch } from "@headlessui/react";
import {
  BellIcon,
  CreditCardIcon,
  CubeIcon,
  FingerPrintIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useOnboarding } from "~/app/use-onboarding";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const JoyRideNoSSR = dynamic(() => import("react-joyride"), { ssr: false });

const secondaryNavigation = [
  { name: "General", href: "#", icon: UserCircleIcon, current: true },
  { name: "Security", href: "#", icon: FingerPrintIcon, current: false },
  { name: "Notifications", href: "#", icon: BellIcon, current: false },
  { name: "Plan", href: "#", icon: CubeIcon, current: false },
  { name: "Billing", href: "#", icon: CreditCardIcon, current: false },
  { name: "Team members", href: "#", icon: UsersIcon, current: false },
];

export default function SettingsPage() {
  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] =
    useState(true);
  const { defaultProps, resetCompletedSteps } = useOnboarding([
    {
      target: ".settings-sidebar",
      content:
        "This is the sidebar. It contains important links and shortcuts to navigate through the application efficiently.",
    },
  ]);

  return (
    <>
      <JoyRideNoSSR {...defaultProps} />

      <div className="mx-auto max-w-7xl pt-16 lg:flex lg:items-start lg:gap-x-16 lg:px-8">
        <h1 className="sr-only">General Settings</h1>

        <aside className="settings-sidebar inline-flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:mt-20">
          <nav className="flex-none px-4 sm:px-6 lg:px-0">
            <ul
              role="list"
              className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col"
            >
              {secondaryNavigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={cn(
                      item.current
                        ? "bg-gray-50 text-violet-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-violet-600",
                      "group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6"
                    )}
                  >
                    <item.icon
                      aria-hidden="true"
                      className={cn(
                        item.current
                          ? "text-violet-600"
                          : "text-gray-400 group-hover:text-violet-600",
                        "h-6 w-6 shrink-0"
                      )}
                    />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
          <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                    Full name
                  </dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">Tom Cook</div>
                    <Button variant="ghost" size="sm">
                      Update
                    </Button>
                  </dd>
                </div>
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                    Email address
                  </dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">tom.cook@example.com</div>
                    <Button variant="ghost" size="sm">
                      Update
                    </Button>
                  </dd>
                </div>
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                    Title
                  </dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">Human Resources Manager</div>
                    <Button variant="ghost" size="sm">
                      Update
                    </Button>
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Bank accounts
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Connect bank accounts to your account.
              </p>

              <ul
                role="list"
                className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6"
              >
                <li className="flex justify-between gap-x-6 py-6">
                  <div className="font-medium text-gray-900">
                    TD Canada Trust
                  </div>
                  <Button variant="ghost" size="sm">
                    Update
                  </Button>
                </li>
                <li className="flex justify-between gap-x-6 py-6">
                  <div className="font-medium text-gray-900">
                    Royal Bank of Canada
                  </div>
                  <Button variant="ghost" size="sm">
                    Update
                  </Button>
                </li>
              </ul>

              <div className="flex border-t border-gray-100 pt-6">
                <Button variant="link" size="sm">
                  <span aria-hidden="true">+</span> Add another bank
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Integrations
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Connect applications to your account.
              </p>

              <ul
                role="list"
                className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6"
              >
                <li className="flex justify-between gap-x-6 py-6">
                  <div className="font-medium text-gray-900">QuickBooks</div>
                  <Button variant="ghost" size="sm">
                    Update
                  </Button>
                </li>
              </ul>

              <div className="flex border-t border-gray-100 pt-6">
                <Button variant="link" size="sm">
                  <span aria-hidden="true">+</span> Add another application
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Language and dates
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Choose what language and date format to use throughout your
                account.
              </p>

              <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                    Language
                  </dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">English</div>
                    <Button variant="ghost" size="sm">
                      Update
                    </Button>
                  </dd>
                </div>
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                    Date format
                  </dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">DD-MM-YYYY</div>
                    <Button variant="ghost" size="sm">
                      Update
                    </Button>
                  </dd>
                </div>
                <Field className="flex pt-6">
                  <Label
                    as="dt"
                    passive
                    className="flex-none pr-6 font-medium text-gray-900 sm:w-64"
                  >
                    Automatic timezone
                  </Label>
                  <dd className="flex flex-auto items-center justify-end">
                    <Switch
                      checked={automaticTimezoneEnabled}
                      onChange={setAutomaticTimezoneEnabled}
                      className="group flex w-8 cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 data-[checked]:bg-violet-600"
                    >
                      <span
                        aria-hidden="true"
                        className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                      />
                    </Switch>
                  </dd>
                </Field>
              </dl>
            </div>

            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Onboarding
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Manage your onboarding experience.
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-6">
                <span className="text-sm font-medium text-gray-900">
                  Reset onboarding tour
                </span>
                <Button onClick={resetCompletedSteps}>Reset</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
