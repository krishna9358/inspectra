import Image from "next/image";
import Link from "next/link";
import HeroLogos from "./hero-logos";
import { Subheading } from "./subheading";
import { IntroVideo } from "./intro-video";

export default function HeroSection() {
  return (
    <section className="pt-16 relative overflow-hidden dark:bg-[#171F2E]">
      <div className="max-w-[120rem] mx-auto relative">
        <div className="wrapper">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center pb-16">
              <Subheading text="AI-Powered Code Review Platform" />

              <h1 className="text-gray-700 mx-auto font-bold mb-4 text-4xl sm:text-[50px] dark:text-white/90 sm:leading-[64px] max-w-[700px]">
                See Flaws Before Production Does
              </h1>
              <p className="max-w-[537px] text-center mx-auto dark:text-gray-400 text-gray-500 text-base">
                Inspectra is your AI code reviewer that catches bugs, security
                vulnerabilities, and code quality issues before they ship.
                Review PRs in seconds, not hours.
              </p>

              <div className="mt-9 flex sm:flex-row flex-col gap-3 relative z-30 items-center justify-center">
                <Link
                  href="/signup"
                  className="bg-primary-500 transition h-12 inline-flex items-center justify-center hover:bg-primary-600 px-6 py-3 rounded-full text-white text-sm"
                >
                  Start Free Trial
                </Link>

                <Link
                  href="https://github.com"
                  className="border border-gray-200 dark:border-gray-700 transition h-12 inline-flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-3 rounded-full text-gray-700 dark:text-gray-300 text-sm gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                </Link>
              </div>
            </div>
          </div>
          <div className="max-w-[1000px] mx-auto relative">
            <div className="p-3 sm:p-[18px] relative z-30 rounded-[32px] border border-white/30 dark:border-white/10 bg-white/20">
              <Image
                src="/images/hero/hero-img.jpg"
                alt=""
                className="w-full rounded-2xl block dark:hidden"
                width={966}
                height={552}
              />
              <Image
                src="/images/hero/hero-img-dark.png"
                alt=""
                className="w-full rounded-2xl hidden dark:block"
                width={966}
                height={552}
              />
            </div>
            <div className="absolute hidden lg:block z-10 -top-20 -translate-y-20 left-1/2 -translate-x-1/2">
              <svg
                width="1300"
                height="1001"
                viewBox="0 0 1300 1001"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.7" filter="url(#filter0_f_9279_7148)">
                  <circle cx="800" cy="500.03" r="300" fill="#4E6EFF" />
                </g>
                <g opacity="0.3" filter="url(#filter1_f_9279_7148)">
                  <circle cx="500" cy="500.03" r="300" fill="#FF58D5" />
                </g>
                <defs>
                  <filter
                    id="filter0_f_9279_7148"
                    x="300"
                    y="0.029541"
                    width="1000"
                    height="1000"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur
                      stdDeviation="100"
                      result="effect1_foregroundBlur_9279_7148"
                    />
                  </filter>
                  <filter
                    id="filter1_f_9279_7148"
                    x="0"
                    y="0.029541"
                    width="1000"
                    height="1000"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur
                      stdDeviation="100"
                      result="effect1_foregroundBlur_9279_7148"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        <div className="max-[1100px]:hidden">
          <Image
            src="/images/hero/shape-left-1.svg"
            className="absolute top-14 left-16 floating-1"
            alt=""
            width={170}
            height={44}
          />
          <Image
            src="/images/hero/shape-left-2.svg"
            className="absolute left-[145px] top-[298px] floating-2 max-[1240px]:left-[80px]"
            alt=""
            width={181}
            height={44}
          />
          <Image
            src="/images/hero/shape-right-1.svg"
            className="absolute right-16 top-[108px] floating-3"
            alt=""
            width={176}
            height={44}
          />
          <Image
            src="/images/hero/shape-right-2.svg"
            className="absolute top-[316px] right-[200px] floating-4 max-[1240px]:right-[80px] max-[1350px]:right-[150px] max-[1500px]:right-[200px]"
            alt=""
            width={179}
            height={44}
          />
        </div>
      </div>
      <div className="hero-glow-bg pointer-events-none w-full h-167.5 absolute z-10 bottom-0"></div>
      <HeroLogos />
    </section>
  );
}
