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
    IconPackage
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
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
    const [activeLink, setActiveLink] = useState("dashboard"); // Track active link
    const dispatch = useDispatch();
    const router = useRouter();


    const links = [
        {
            label: "Dashboard",
            href: "#",
            icon: (
                <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            value: "dashboard",
        },
        {
            label: "Add Product",
            href: "#",
            icon: (
                <IconShoppingBagPlus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
            ),
            value: "add-product",
        },
        {
            label: "Add Blog",
            href: "#",
            icon: (
                // <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                <IconArticle className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
            ),
            value: "add-blog",
        },
        {
            label: "Add Artisan",
            href: "#",
            icon: (
                // <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                <IconPalette className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
            ),
            value: "add-artisan",
        },
        {
            label: "Manage Products",
            href: "#",
            icon: (
                <IconSettingsCog className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
            ),
            value: "manage-products",
        },
        {
            label: "Manage Blogs",
            href: "#",
            icon: (
                <IconEdit className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
            ),
            value: "manage-blogs",
        },
        {
            label: "Manage Orders",
            href: "#",
            icon: (
                <IconPackage className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
            ),
            value: "manage-orders",
        },
        {
            label: "Manage Users",
            href: "#",
            icon: (
                <IconUsers  className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
            ),
            value: "manage-customers",
        },
        {
            label: "Manage Artisans",
            href: "#",
            icon: (
                <IconUsers  className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
            ),
            value: "manage-artisans",
        },
    ];

    const handleLinkClick = (linkValue: string, event?: React.MouseEvent) => {
        if (linkValue === "logout") {
            if (event) event.preventDefault(); // Prevent default link navigation
            handleLogout(); // Call the logout logic
        } else {
            setActiveLink(linkValue);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        router.replace('/signin');
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
    </SidebarBody>
  </Sidebar>

  {/* Content Area */}
  <div 
    className="flex flex-1 bg-white dark:bg-neutral-900 
    border-l border-neutral-200 dark:border-neutral-800 
    shadow-inner rounded-l-2xl overflow-y-auto"
  >
    {activeLink === "dashboard" && <AdminAnalyticsDashboard />}
    {activeLink === "add-product" && <AddProduct />}
    {activeLink === "add-blog" && <AddBlog />}
    {activeLink === "add-artisan" && <AddArtisanForm />}
    {activeLink === "manage-products" && <ProductManager />}
    {activeLink === "manage-blogs" && <BlogManager />}
    {activeLink === "manage-orders" && <ManageOrders />}
    {activeLink === "manage-customers" && <ManageCustomers />}
    {activeLink === "manage-artisans" && <ManageArtisans />}
  </div>
</div>

    );
};

export default DashboardPage;

export const Logo = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black dark:text-white whitespace-pre"
            >
                Acet Labs
            </motion.span>
        </Link>
    );
};

export const LogoIcon = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
        </Link>
    );
};
