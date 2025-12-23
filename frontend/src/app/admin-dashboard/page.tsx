"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconArticle,
  IconBrandTabler,
  IconEdit,
  IconPalette,
  IconSettingsCog,
  IconShoppingBagPlus,
  IconUsers,
  IconPackage,
} from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { logout } from "@/store/feature/user/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import ProductManager from "@/components/ManageProducts/manageProdcuts";
import AddProduct from "@/components/AddProduct/addProduct";
import BlogManager from "@/components/ManageBlogs/manageBlogs";
import AddBlog from "@/components/AddBlog/addBlog";
import AdminAnalyticsDashboard from "@/components/AdminDashboardContent/adminDashboardContent";
import AddArtisanForm from "@/components/AddArtisan/addArtisan";
import ManageCustomers from "@/components/ManageCustomers/manageCustomers";
import ManageArtisans from "@/components/ManageArtisans/manageArtisans";
import ManageOrders from "@/components/ManageOrders/manageOrders";

const DashboardPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("dashboard");

  const dispatch = useDispatch();
  const router = useRouter();

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: <IconBrandTabler className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
      value: "dashboard",
    },
    {
      label: "Add Product",
      href: "#",
      icon: <IconShoppingBagPlus className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
      value: "add-product",
    },
    {
      label: "Add Blog",
      href: "#",
      icon: <IconArticle className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
      value: "add-blog",
    },
    {
      label: "Add Artisan",
      href: "#",
      icon: <IconPalette className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
      value: "add-artisan",
    },
    {
      label: "Manage Products",
      href: "#",
      icon: <IconSettingsCog className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
      value: "manage-products",
    },
    {
      label: "Manage Blogs",
      href: "#",
      icon: <IconEdit className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
      value: "manage-blogs",
    },
    {
      label: "Manage Orders",
      href: "#",
      icon: <IconPackage className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
      value: "manage-orders",
    },
    {
      label: "Manage Users",
      href: "#",
      icon: <IconUsers className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
      value: "manage-customers",
    },
    {
      label: "Manage Artisans",
      href: "#",
      icon: <IconUsers className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
      value: "manage-artisans",
    },
  ];

  const handleLinkClick = (value: string, event?: React.MouseEvent) => {
    if (value === "logout") {
      event?.preventDefault();
      handleLogout();
    } else {
      setActiveLink(value);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/signin");
  };

  return (
    <div
      className={cn(
        "flex h-[99.5vh] w-full overflow-hidden",
        "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-950"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-8 p-4">
          <div className="flex flex-1 flex-col overflow-y-auto">
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

          <div className="border-t border-neutral-200/60 pt-3 dark:border-neutral-700/50">
            <SidebarLink
              link={{
                label: "Logout",
                href: "#",
                icon: <IconArrowLeft className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
              }}
              onClick={(e) => handleLinkClick("logout", e)}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Footer / Profile */}
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
    </div>
  );
};

export default DashboardPage;
