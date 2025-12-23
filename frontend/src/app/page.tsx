"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { HeroParallax } from "@/components/ui/hero-parallax";
import AppleCardsCarousel from '@/components/Carousel/carousel'
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import Image from "next/image";
import useFcmToken from "@/hooks/useFcmToken";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { saveFcmToken } from "@/api/user/userAPI";
import  Link  from "next/link";

const HomePage: React.FC = () => {
  const { token } = useFcmToken();
  const user = useSelector((state: RootState) => state.user.user?.user);

  useEffect(() => {
    if (!token || !user) return;
  
    const saveToken = async () => {
      try {
        console.log('saving fcm token to db....')
        const response = await saveFcmToken(token);
        console.log("FCM token saved successfully!", response);
      } catch (err) {
        console.error("Failed to save token:", err);
      }
    };
  
    saveToken();
  }, [token, user]);


  const products = [
    {
      title: "Handwoven Basket",
      link: "https://ethiocrafts.com/handwoven-basket",
      thumbnail: "https://res.cloudinary.com/dso7gnmps/image/upload/v1733309544/pottery_ylbfx1.jpg",
    },
    {
      title: "Traditional Coffee Set",
      link: "https://ethiocrafts.com/traditional-coffee-set",
      thumbnail: "https://res.cloudinary.com/dso7gnmps/image/upload/v1733309544/pottery_ylbfx1.jpg",
    },
    {
      title: "Cultural Attire",
      link: "https://ethiocrafts.com/cultural-attire",
      thumbnail: "https://res.cloudinary.com/dso7gnmps/image/upload/v1733309773/painting_atkfcf.jpg",
    },
    {
      title: "Handmade Jewelry",
      link: "https://ethiocrafts.com/handmade-jewelry",
      thumbnail: "https://res.cloudinary.com/dso7gnmps/image/upload/v1733309755/jewlery_fektgf.jpg",
    },
    {
      title: "Artisan Pottery",
      link: "https://ethiocrafts.com/artisan-pottery",
      thumbnail: "https://res.cloudinary.com/dso7gnmps/image/upload/v1733309773/painting_atkfcf.jpg",
    },
    {
      title: "Leather Goods",
      link: "https://ethiocrafts.com/leather-goods",
      thumbnail: "https://res.cloudinary.com/dso7gnmps/image/upload/v1733309773/painting_atkfcf.jpg",
    },
    {
      title: "Woven Scarves",
      link: "https://ethiocrafts.com/woven-scarves",
      thumbnail: "https://res.cloudinary.com/dso7gnmps/image/upload/v1733309788/scarf_i5mybc.jpg",
    },
    {
      title: "Carved Wooden Art",
      link: "https://ethiocrafts.com/carved-wooden-art",
      thumbnail: "https://res.cloudinary.com/dso7gnmps/image/upload/v1733309795/stool_p6qcsj.jpg",
    },
    {
      title: "Painted Icons",
      link: "https://ethiocrafts.com/painted-icons",
      thumbnail: "https://res.cloudinary.com/dso7gnmps/image/upload/v1733309773/painting_atkfcf.jpg",
    },
    {
      title: "Ethiopian Rugs",
      link: "https://ethiocrafts.com/ethiopian-rugs",
      thumbnail: "https://res.cloudinary.com/dso7gnmps/image/upload/v1733309773/painting_atkfcf.jpg",
    },
    {
      title: "Beaded Accessories",
      link: "https://ethiocrafts.com/beaded-accessories",
      thumbnail: "https://res.cloudinary.com/dso7gnmps/image/upload/v1733309773/painting_atkfcf.jpg",
    },
  ];


  
  const testimonials = [
    {
      name: "Handwoven Textiles",
      title: "Traditional Ethiopian Weavings",
      image: "https://cdn.shopify.com/s/files/1/0274/3107/5938/files/ITC_ETHIOPIA_SABAHAR_2019_YONAS_TADESSE-2658_2048x2048.jpg?v=1622592496", // Replace with actual image URL
      description:
        "Beautifully handwoven fabrics, showcasing intricate patterns and vibrant colors, representing the diverse cultures across Ethiopia.",
    },
    {
      name: "Ethiopian Pottery",
      title: "Handcrafted Ceramics",
      image: "https://c7.alamy.com/comp/B67JN7/ethiopian-coffee-pots-B67JN7.jpg", // Replace with actual image URL
      description:
        "Authentic, handmade pottery, each piece uniquely designed, often inspired by traditional Ethiopian motifs and natural elements.",
    },
    {
      name: "Beaded Jewelry",
      title: "Traditional Ethiopian Jewelry",
      image: "https://i.pinimg.com/1200x/a7/c5/55/a7c55590d0c109d41c26dc0c4e71dd82.jpg", // Replace with actual image URL
      description:
        "Exquisite beaded jewelry crafted by artisans, representing Ethiopia’s rich cultural heritage, with designs passed down through generations.",
    },
    {
      name: "Ethiopian Carvings",
      title: "Wooden Sculptures and Carvings",
      image: "https://pageaucarvings.com/uploads/2/7/6/4/2764025/3745787_orig.jpg?365", // Replace with actual image URL
      description:
        "Hand-carved wooden sculptures, ranging from religious figures to symbolic animals, showcasing the artistic craftsmanship of Ethiopian artisans.",
    },
    {
      name: "Ethiopian Basketry",
      title: "Handcrafted Baskets",
      image: "https://thumbs.dreamstime.com/b/habesha-baskets-83615415.jpg", // Replace with actual image URL
      description:
        "Crafted from natural fibers, these traditional Ethiopian baskets are both functional and decorative, often used in daily life or as home decor.",
    },
  ];


  return (
    <div>
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
          <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
            <span className="text-green-500">Celebrate </span>
            <span className="text-yellow-400">Ethiopian </span>
            <span className="text-red-500">Artistry.</span>
          </div>
          <p className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
            Authentic Ethiopian Artistry
          </p>
          <Link href="/products" className="bg-black dark:bg-white text-white dark:text-black rounded-full px-6 py-3 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white shadow-md hover:shadow-lg">
          
            Shop now
          
          </Link>
        </motion.div>
      </AuroraBackground>
      <HeroParallax products={products} />;
      <div className='mt-10'>
        <AppleCardsCarousel />
      </div>

      <div className="flex -mt-48 flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Honor
                <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                  Ethiopian
                </span>
                <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none shadow-text">
                  craftsmanship
                </span>
              </h1>
            </>
          }
        >
          <Image
            src={`https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/BMYV5xTrAe_b5ae6vN-1p.jpg`}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>

      <div className="h-[40rem] -mt-52 rounded-md flex flex-col antialiased bg-white items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>


      <div className="bg-white py-20 px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div className="w-full md:w-1/2 text-[#5C3D2E]">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center md:text-left">
              Secure and Seamless E-commerce Experience
            </h2>

            {/* Numbered list */}
            <ol className="space-y-8">
              {/* Item 1 */}
              <motion.li
                className="flex items-start"
                whileInView={{ opacity: [0, 1], y: [50, 0] }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex-shrink-0 bg-gradient-to-r from-[#e8c6a7] to-[#5C3D2E] text-white font-bold w-12 h-12 flex items-center justify-center rounded-full mr-4 shadow-md">
                  1
                </div>
                <div>
                  <strong className="text-lg mb-2 block">Safe Payments</strong>
                  <p className="text-sm md:text-base">
                    Enjoy worry-free transactions with our secure payment gateway.
                  </p>
                </div>
              </motion.li>

              {/* Item 2 */}
              <motion.li
                className="flex items-start"
                whileInView={{ opacity: [0, 1], y: [50, 0] }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex-shrink-0 bg-gradient-to-r from-[#e8c6a7] to-[#5C3D2E] text-white font-bold w-12 h-12 flex items-center justify-center rounded-full mr-4 shadow-md">
                  2
                </div>
                <div>
                  <strong className="text-lg mb-2 block">Reliable Shipping</strong>
                  <p className="text-sm md:text-base">
                    We deliver your purchases safely and efficiently worldwide.
                  </p>
                </div>
              </motion.li>

              {/* Item 3 */}
              <motion.li
                className="flex items-start"
                whileInView={{ opacity: [0, 1], y: [50, 0] }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex-shrink-0 bg-gradient-to-r from-[#e8c6a7] to-[#5C3D2E] text-white font-bold w-12 h-12 flex items-center justify-center rounded-full mr-4 shadow-md">
                  3
                </div>
                <div>
                  <strong className="text-lg mb-2 block">User-friendly Platform</strong>
                  <p className="text-sm md:text-base">
                    Browse and shop with ease on our intuitive, visually appealing interface.
                  </p>
                </div>
              </motion.li>
            </ol>
          </motion.div>

          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <Image
            width={400}
            height={400}
              src="https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/7NqdB8vojwt2nzi684dKU.jpg"
              alt="Ethiopian Art"
              className="rounded-lg shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
