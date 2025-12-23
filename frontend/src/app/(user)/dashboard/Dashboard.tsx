"use client";

import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconHeart,
  IconLayoutDashboard,
  IconPackage,
  IconUser,
} from "@tabler/icons-react";
import { Bell } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { logout } from "@/store/feature/user/userSlice";
import { useDispatch } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CustomerDashboardContent from "@/components/CustomerDashboardContent/customerDashboardContent";
import PurchasedProducts from "@/components/CustomerOrders/customerOrders";
import SavedProducts from "@/components/CustomerSavedProducts/customerSavedProducts";
import CustomerProfile from "@/components/CustomerProfile/customerProfile";
import NotificationCenter from "@/components/UserNotifications/userNotification";

const DashboardPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("overview");

  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Sync URL tab -> state
  useEffect(() => {
    const link = searchParams.get("tab");
    if (link) {
      setActiveLink(link);
    }
  }, [searchParams]);

  const links = [
    {
      label: "Overview",
      href: "#",
      icon: <IconLayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      value: "overview",
    },
    {
      label: "Notifications",
      href: "#",
      icon: <Bell className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      value: "notifications",
    },
    {
      label: "Orders",
      href: "#",
      icon: <IconPackage className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      value: "orders",
    },
    {
      label: "Saved",
      href: "#",
      icon: <IconHeart className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      value: "saved",
    },
    {
      label: "Profile",
      href: "#",
      icon: <IconUser className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      value: "profile",
    },
  ];

  // Update URL search params & UI state
  const setTabParam = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleLinkClick = (linkValue: string, event?: React.MouseEvent) => {
    if (event) event.preventDefault(); // prevent unwanted navigation

    if (linkValue === "logout") {
      handleLogout();
      return;
    }

    setActiveLink(linkValue);
    setTabParam(linkValue); // <— UPDATE SEARCH PARAMS
  };

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/signin");
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row w-full h-[99.5vh] overflow-hidden",
        "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-950"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-8 p-4">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-neutral-800 dark:text-neutral-200"
            >
              E-Commerce
            </Link>

            <div className="mt-6 flex flex-col gap-1.5">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  isActive={activeLink === link.value}
                  onClick={(e) => handleLinkClick(link.value, e)}
                />
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-200/60 dark:border-neutral-700/50">
            <SidebarLink
              link={{
                label: "Logout",
                href: "#",
                icon: (
                  <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                ),
              }}
              onClick={(e) => handleLinkClick("logout", e)}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      <div
        className="flex flex-1 bg-white dark:bg-neutral-900 
          border-l border-neutral-200 dark:border-neutral-800 
          shadow-inner rounded-l-2xl overflow-y-auto"
      >
        {activeLink === "overview" && <CustomerDashboardContent />}
        {activeLink === "orders" && <PurchasedProducts />}
        {activeLink === "saved" && <SavedProducts />}
        {activeLink === "profile" && <CustomerProfile />}
        {activeLink === "notifications" && <NotificationCenter />}

      </div>
    </div>
  );
};

export default DashboardPage;
