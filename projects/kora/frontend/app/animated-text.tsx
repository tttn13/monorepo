import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from 'next/link'
import LoginBtn from './components/login-btn'
import { Josefin_Sans } from 'next/font/google'
import { InfiniteSlider } from "./components/infinite-display";
import DemoCalendar from "./components/demo/dummy-booking-form";
import DemoTimeSelector from "./components/demo/dummy-time-selector";
import DemoEventSelector from "./components/demo/dummy-event-length";
import DemoDetails from "./components/demo/dummy-details";

const sans = Josefin_Sans({ subsets: ['latin'] })

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["easy", "simple", "time saving"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <h2 className={`${sans.className} text-2xl font-bold text-center pt-8`}>ZUCAL</h2>

        <div className="flex gap-8 py-20 lg:pb-40 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50">We make scheduling</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                          y: 0,
                          opacity: 1,
                        }
                        : {
                          y: titleNumber > index ? -150 : 150,
                          opacity: 0,
                        }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Create your schedule once, and you're ready to go.
            </p>
          
          </div>
          <div className="flex flex-col gap-[50px] items-center">
            <Link href="/login"><LoginBtn /></Link>
            <InfiniteSlider durationOnHover={75} gap={24}>
              <DemoCalendar />
              <DemoTimeSelector />
              <DemoEventSelector />
              <DemoDetails />
              <img
                src="https://d31qvhc0y1xlj9.cloudfront.net/schedule_page.png"
                alt="Schedule Page"
                className="aspect-square w-[280px] h-[200px] rounded-[4px]"
              />
              <img
                src="https://d31qvhc0y1xlj9.cloudfront.net/book_page.png"
                alt="Book Page"
                className="aspect-square w-[280px] h-[200px] rounded-[4px]"
              />
              <img
                src="https://d31qvhc0y1xlj9.cloudfront.net/main_page.png"
                alt="Main Page"
                className="aspect-square w-[280px] h-[200px] rounded-[4px]"
              />
            </InfiniteSlider>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
