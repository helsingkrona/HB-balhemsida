import Image from "next/image";
import CountdownServer from "@/components/CountdownServer"


const Banner: React.FC = () => {
    return (
        <div className="relative w-full h-32 md:h-64 overflow-hidden">
            {/* Background Image with cropping */}
            <div className="absolute inset-0">
                <Image
                    src="/studiovega_241005_249.jpg" // Replace with your actual image path
                    alt="Event Banner"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="absolute top-[-50px] bottom-[-50px] w-full h-auto"
                    priority
                />
            </div>
            {/* Overlay for text and countdown */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-4">
                {/* Title */}
                <h1 className="text-white text-3xl md:text-5xl font-bold mb-2">
                    SNÖRSJÖAORDEN 2025
                </h1>

                {/* Countdown Timer */}
                <CountdownServer />
            </div>
        </div>

    );
};

export default Banner;