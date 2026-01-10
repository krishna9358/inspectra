import Link from "next/link";
import Image from "next/image";

function getCurrentYear() {
    return new Date().getFullYear();
}

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-gray-900">
            <span className="absolute top-0 -translate-x-1/2 left-1/2">
                <svg
                    width="1260"
                    height="457"
                    viewBox="0 0 1260 457"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g filter="url(#filter0_f_11105_867)">
                        <circle cx="630" cy="-173.299" r="230" fill="#3B2EFF" />
                    </g>
                    <defs>
                        <filter
                            id="filter0_f_11105_867"
                            x="0"
                            y="-803.299"
                            width="1260"
                            height="1260"
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
                                stdDeviation="200"
                                result="effect1_foregroundBlur_11105_867"
                            />
                        </filter>
                    </defs>
                </svg>
            </span>
            <div className="relative z-10 py-16 xl:py-24">
                <div className="container px-5 mx-auto sm:px-7">
                    <div className="grid gap-y-8 gap-x-6 lg:grid-cols-12">
                        <div className="lg:col-span-3 xl:col-span-4">
                            <div>
                                <Link href="/" className="flex items-center gap-2 mb-6">
                                    <Image
                                        src="/logo.png"
                                        alt="Inspectra Logo"
                                        width={40}
                                        height={40}
                                        className="invert"
                                    />
                                    <span className="text-2xl font-bold text-white">
                                        Inspectra
                                    </span>
                                    <span className="inline-block px-1.5 py-0.5 rounded-lg rounded-bl-none bg-primary-500/90 text-white text-xs font-medium">
                                        Beta
                                    </span>
                                </Link>
                                <p className="block text-sm text-gray-400 mb-9">
                                    AI-powered code review that catches bugs, security vulnerabilities,
                                    and code quality issues before they ship. See flaws before production does.
                                </p>
                                <div className="flex">
                                    <a
                                        href="https://discord.com"
                                        target="_blank"
                                        className="text-gray-400 hover:text-white/80 size-10"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="17"
                                            viewBox="0 0 16 17"
                                            fill="none"
                                        >
                                            <g clipPath="url(#clip0_11105_879)">
                                                <path
                                                    d="M13.5447 3.68965C12.5249 3.22173 11.4313 2.87699 10.2879 2.67954C10.2671 2.67573 10.2463 2.68525 10.2356 2.7043C10.0949 2.95444 9.93915 3.28077 9.83006 3.53727C8.60027 3.35316 7.37679 3.35316 6.17221 3.53727C6.0631 3.27507 5.90166 2.95444 5.76038 2.7043C5.74966 2.68589 5.72886 2.67636 5.70803 2.67954C4.56527 2.87636 3.47171 3.2211 2.45129 3.68965C2.44246 3.69346 2.43488 3.69982 2.42986 3.70806C0.355594 6.80697 -0.212634 9.82971 0.0661201 12.815C0.0673814 12.8296 0.0755799 12.8435 0.086932 12.8524C1.45547 13.8574 2.78114 14.4676 4.08219 14.872C4.10301 14.8784 4.12507 14.8707 4.13832 14.8536C4.44608 14.4333 4.72043 13.9902 4.95565 13.5241C4.96953 13.4968 4.95628 13.4645 4.92791 13.4537C4.49275 13.2886 4.0784 13.0873 3.67982 12.8588C3.64829 12.8404 3.64577 12.7953 3.67477 12.7737C3.75865 12.7108 3.84255 12.6454 3.92264 12.5794C3.93713 12.5674 3.95732 12.5648 3.97435 12.5724C6.59286 13.7679 9.4277 13.7679 12.0153 12.5724C12.0323 12.5642 12.0525 12.5667 12.0677 12.5788C12.1478 12.6448 12.2316 12.7108 12.3161 12.7737C12.3451 12.7953 12.3433 12.8404 12.3117 12.8588C11.9131 13.0918 11.4988 13.2886 11.063 13.453C11.0346 13.4638 11.022 13.4968 11.0359 13.5241C11.2762 13.9895 11.5505 14.4327 11.8526 14.853C11.8652 14.8707 11.8879 14.8784 11.9087 14.872C13.2161 14.4676 14.5417 13.8574 15.9103 12.8524C15.9223 12.8435 15.9298 12.8302 15.9311 12.8156C16.2647 9.36431 15.3723 6.36636 13.5655 3.7087C13.5611 3.69982 13.5535 3.69346 13.5447 3.68965ZM5.34668 10.9973C4.55833 10.9973 3.90876 10.2735 3.90876 9.38464C3.90876 8.49578 4.54574 7.77202 5.34668 7.77202C6.15392 7.77202 6.79721 8.50214 6.78459 9.38464C6.78459 10.2735 6.14761 10.9973 5.34668 10.9973ZM10.6632 10.9973C9.87484 10.9973 9.22526 10.2735 9.22526 9.38464C9.22526 8.49578 9.86222 7.77202 10.6632 7.77202C11.4704 7.77202 12.1137 8.50214 12.1011 9.38464C12.1011 10.2735 11.4704 10.9973 10.6632 10.9973Z"
                                                    fill="currentColor"
                                                    fillOpacity="0.8"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_11105_879">
                                                    <rect
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        transform="translate(0 0.919434)"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://x.com"
                                        target="_blank"
                                        className="text-gray-400 hover:text-white/80 size-10"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="17"
                                            viewBox="0 0 16 17"
                                            fill="none"
                                        >
                                            <path
                                                d="M12.2176 2.18848H14.4666L9.55323 7.80414L15.3334 15.4458H10.8076L7.26277 10.8112L3.20671 15.4458H0.956369L6.2117 9.43921L0.666748 2.18848H5.30749L8.51168 6.4247L12.2176 2.18848ZM11.4283 14.0997H12.6745L4.63034 3.4639H3.29306L11.4283 14.0997Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://github.com"
                                        target="_blank"
                                        className="text-gray-400 hover:text-white/80 size-10"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="17"
                                            viewBox="0 0 16 17"
                                            fill="none"
                                        >
                                            <g clipPath="url(#clip0_11105_885)">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M8.00009 1.25293C6.10091 1.25392 4.264 1.92657 2.81783 3.15061C1.37166 4.37465 0.410521 6.07027 0.106282 7.93426C-0.197957 9.79825 0.174536 11.7091 1.15717 13.325C2.13979 14.941 3.66848 16.1568 5.46987 16.7549C5.86729 16.8287 6.01698 16.5824 6.01698 16.3729C6.01698 16.1635 6.00903 15.5563 6.00638 14.8924C3.78085 15.3732 3.31057 13.9533 3.31057 13.9533C2.9476 13.0312 2.42301 12.7889 2.42301 12.7889C1.69706 12.2962 2.47733 12.3054 2.47733 12.3054C3.28143 12.3621 3.70402 13.1261 3.70402 13.1261C4.41672 14.3418 5.57585 13.9901 6.03155 13.7847C6.10309 13.2696 6.31107 12.9193 6.54025 12.7204C4.76247 12.5202 2.89461 11.8378 2.89461 8.78988C2.88359 7.9994 3.1786 7.23496 3.71859 6.65472C3.63646 6.4545 3.36224 5.64575 3.79675 4.54722C3.79675 4.54722 4.46839 4.33383 5.99712 5.36256C7.30836 5.00601 8.69183 5.00601 10.0031 5.36256C11.5305 4.33383 12.2008 4.54722 12.2008 4.54722C12.6366 5.64312 12.3624 6.45187 12.2803 6.65472C12.822 7.23506 13.1176 8.00083 13.1056 8.79251C13.1056 11.8471 11.2337 12.5202 9.45331 12.7164C9.73945 12.964 9.99512 13.4475 9.99512 14.1903C9.99512 15.2546 9.98585 16.1108 9.98585 16.3729C9.98585 16.585 10.1302 16.8326 10.5356 16.7549C12.3372 16.1567 13.866 14.9407 14.8487 13.3245C15.8313 11.7082 16.2036 9.79713 15.899 7.93296C15.5944 6.0688 14.6328 4.37317 13.1861 3.14933C11.7395 1.9255 9.90215 1.25329 8.00274 1.25293H8.00009Z"
                                                    fill="currentColor"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_11105_885">
                                                    <rect
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        transform="translate(0 0.919434)"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://linkedin.com"
                                        target="_blank"
                                        className="text-gray-400 hover:text-white/80 size-10"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="19"
                                            viewBox="0 0 18 19"
                                            fill="none"
                                        >
                                            <path
                                                d="M16.5 1.41943H1.5C0.671875 1.41943 0 2.09131 0 2.91943V17.9194C0 18.7476 0.671875 19.4194 1.5 19.4194H16.5C17.3281 19.4194 18 18.7476 18 17.9194V2.91943C18 2.09131 17.3281 1.41943 16.5 1.41943ZM5.36875 16.9194H2.69063V7.79443H5.36875V16.9194ZM4.02969 6.60693C3.17344 6.60693 2.47969 5.91318 2.47969 5.05693C2.47969 4.20068 3.17344 3.50693 4.02969 3.50693C4.88594 3.50693 5.57969 4.20068 5.57969 5.05693C5.57969 5.91318 4.88594 6.60693 4.02969 6.60693ZM15.3094 16.9194H12.6313V12.4819C12.6313 11.4882 12.6125 10.2132 11.2453 10.2132C9.85938 10.2132 9.64688 11.2913 9.64688 12.4069V16.9194H6.96875V7.79443H9.54063V8.96318H9.57813C9.94063 8.28818 10.8156 7.57568 12.1172 7.57568C14.8313 7.57568 15.3094 9.36318 15.3094 11.6944V16.9194Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-6 xl:col-span-5">
                            <div className="grid sm:grid-cols-3 gap-7">
                                <div>
                                    <span className="block mb-6 text-sm text-gray-400">
                                        Product
                                    </span>
                                    <nav className="flex flex-col space-y-3">
                                        <Link
                                            href="/#features"
                                            className="text-sm font-normal text-gray-400 transition hover:text-white"
                                        >
                                            Features
                                        </Link>
                                        <Link
                                            href="/#pricing"
                                            className="text-sm font-normal text-gray-400 transition hover:text-white"
                                        >
                                            Pricing
                                        </Link>
                                        <Link
                                            href="/#faq"
                                            className="text-sm font-normal text-gray-400 transition hover:text-white"
                                        >
                                            FAQ
                                        </Link>
                                        <Link
                                            href="/docs"
                                            className="text-sm font-normal text-gray-400 transition hover:text-white"
                                        >
                                            Documentation
                                        </Link>
                                        <Link
                                            href="/changelog"
                                            className="text-sm font-normal text-gray-400 transition hover:text-white"
                                        >
                                            Changelog
                                        </Link>
                                    </nav>
                                </div>
                                <div>
                                    <span className="block mb-6 text-sm text-gray-400">
                                        Integrations
                                    </span>
                                    <nav className="flex flex-col space-y-3">
                                        <Link
                                            href="/integrations/github"
                                            className="text-sm font-normal text-gray-400 transition hover:text-white"
                                        >
                                            GitHub
                                        </Link>
                                        <Link
                                            href="/integrations/gitlab"
                                            className="text-sm font-normal text-gray-400 transition hover:text-white"
                                        >
                                            GitLab
                                        </Link>
                                        <Link
                                            href="/integrations/bitbucket"
                                            className="text-sm font-normal text-gray-400 transition hover:text-white"
                                        >
                                            Bitbucket
                                        </Link>
                                        <Link
                                            href="/integrations/slack"
                                            className="text-sm font-normal text-gray-400 transition hover:text-white"
                                        >
                                            Slack
                                        </Link>
                                        <Link
                                            href="/integrations/vscode"
                                            className="text-sm font-normal text-gray-400 transition hover:text-white"
                                        >
                                            VS Code Extension
                                        </Link>
                                    </nav>
                                </div>
                                <div>
                                    <span className="relative block mb-6 text-sm text-gray-400">
                                        Account
                                    </span>
                                    <nav className="flex flex-col space-y-3">
                                        <Link
                                            href="/login"
                                            className="text-sm font-normal text-gray-400 transition hover:text-white"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/login"
                                            className="text-sm font-normal text-gray-400 transition hover:text-white"
                                        >
                                            Sign Up
                                        </Link>
                                        <Link
                                            href="/contact"
                                            className="text-sm font-normal text-gray-400 transition hover:text-white"
                                        >
                                            Support
                                        </Link>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-3">
                            <div>
                                <span className="block mb-6 text-sm text-gray-400">
                                    Stay In Touch
                                </span>
                                <p className="block mb-5 text-sm text-gray-400">
                                    Subscribe for updates on new features and releases!
                                </p>
                                <form>
                                    <div className="flex flex-col items-center gap-2 w-full sm:max-w-64">
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="w-full h-12 p-4 text-sm text-white border border-gray-700 rounded-full placeholder:text-center placeholder:text-gray-400 placeholder:text-sm text-center placeholder:font-normal focus:outline-0 bg-transparent"
                                            required
                                        />
                                        <button className="w-full px-6 py-3 text-sm font-medium text-white transition rounded-full cursor-pointer bg-primary-500 hover:bg-primary-600">
                                            Subscribe Now
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-800">
                <div className="container relative z-10 px-5 mx-auto sm:px-7">
                    <div className="py-5 text-center">
                        <p className="text-sm text-gray-500">
                            &copy; {getCurrentYear()} Inspectra - All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
