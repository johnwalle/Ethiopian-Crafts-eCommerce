"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "../ui/apple-cards-carousel";

const AppleCardsCarousel: React.FC = () => {
    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));
    
    return (
        <div className="w-full h-full py-20">
            <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                Explore Ethiopian Culture.
            </h2>
            <Carousel items={cards} />
        </div>
    );
}

export default AppleCardsCarousel;

interface DummyContentProps {
    image: string;
}

const DummyContent = ({ image }: DummyContentProps) => {
    return (
        <>
            {
                [...new Array(3).fill(1)].map((_, index) => {
                    return (
                        <div
                            key={"dummy-content" + index}
                            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
                        >
                            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                                Ethiopia is a land of diverse cultures, languages, and traditions. Explore its rich history, ancient art forms, and the beauty of its landscapes.
                                </p>
                            <Image
                                src={image}
                                alt="Ethiopian culture mockup"
                                height="300" // Reduced height
                                width="500"
                                className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                            />
                        </div>
                    );
                })}
        </>
    );
};

const data = [
    {
        category: "Traditional Art",
        title: "Ethiopian Handwoven Textiles",
        src: "https://www.welana.com/cdn/shop/articles/ethiopian-handmade-scarf-weaving-welana_8cc25856-f852-4c92-b0b0-179fe8237e9b_1200x1200.jpg?v=1743509461",
        content: <DummyContent 
        image={'https://www.welana.com/cdn/shop/articles/ethiopian-handmade-scarf-weaving-welana_8cc25856-f852-4c92-b0b0-179fe8237e9b_1200x1200.jpg?v=1743509461'}/>,
    },
    {
        category: "Music & Dance",
        title: "Traditional Ethiopian Music",
        src: "https://www.ephremtube.com/assets/images/ethiopiawinsim/ethiopiawinsim_14.jpg",
        content: <DummyContent 
        image={'https://www.ephremtube.com/assets/images/ethiopiawinsim/ethiopiawinsim_14.jpg'}/>,
    },
    {
        category: "Cuisine",
        title: "Taste of Ethiopian Cuisine",
        src: "https://www.rumispice.com/cdn/shop/articles/your-guide-to-the-history-taste-of-ethiopian-food-869598.jpg?v=1663735781",
        content: <DummyContent 
        image={'https://www.rumispice.com/cdn/shop/articles/your-guide-to-the-history-taste-of-ethiopian-food-869598.jpg?v=1663735781'}/>,
    },
    {
        category: "History & Heritage",
        title: "The Ancient Ruins of Aksum",
        src: "https://cdn.britannica.com/23/93423-050-107B2836/obelisk-kingdom-Aksum-Ethiopian-name-city.jpg",
        content: <DummyContent 
        image={'https://cdn.britannica.com/23/93423-050-107B2836/obelisk-kingdom-Aksum-Ethiopian-name-city.jpg'}/>,
    },
    {
        category: "Crafts & Artifacts",
        title: "Ethiopian Traditional Artifacts",
        src: "https://artincontext.org/wp-content/uploads/2022/02/Ethiopian-Arts.jpg",
        content: <DummyContent 
        image={'https://artincontext.org/wp-content/uploads/2022/02/Ethiopian-Arts.jpg'}/>,
    },
    {
        category: "Festivals",
        title: "Timkat: Ethiopian Epiphany",
        src: "https://thumbs.dreamstime.com/b/timket-ethiopian-orthodox-celebration-epiphany-followers-celebrate-january-addis-ababa-49218016.jpg",
        content: <DummyContent 
        image={'https://thumbs.dreamstime.com/b/timket-ethiopian-orthodox-celebration-epiphany-followers-celebrate-january-addis-ababa-49218016.jpg'}/>,
    },
    {
        category: "Architecture",
        title: "Lalibela Rock-Hewn Churches",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Lalibela%2C_san_giorgio%2C_esterno_24.jpg/1200px-Lalibela%2C_san_giorgio%2C_esterno_24.jpg",
        content: <DummyContent 
        image={'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Lalibela%2C_san_giorgio%2C_esterno_24.jpg/1200px-Lalibela%2C_san_giorgio%2C_esterno_24.jpg'}/>,
    },
];