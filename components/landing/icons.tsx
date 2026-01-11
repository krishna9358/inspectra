import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

export function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
    >
      <path
        d="M13.4017 5.2793L6.12172 12.5593L2.59839 9.036"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-xl text-gray-400"
    >
      <g clipPath="url(#clip0_9283_3101)">
        <path
          d="M11 11.9194V5.91943H13V11.9194H19V13.9194H13V19.9194H11V13.9194H5V11.9194H11Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_9283_3101">
          <rect
            width="24"
            height="24"
            fill="currentColor"
            transform="translate(0 0.919434)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export function MinusIcon() {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-xl text-gray-400"
    >
      <g clipPath="url(#clip0_9283_3094)">
        <path d="M5 11.9194V13.9194H19V11.9194H5Z" fill="currentColor" />
      </g>
      <defs>
        <clipPath id="clip0_9283_3094">
          <rect
            width="24"
            height="24"
            fill="currentColor"
            transform="translate(0 0.919434)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg
      width={24}
      height={24}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg
      width={24}
      height={24}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export function TextGeneratorIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
    >
      <g filter="url(#filter0_d_11466_4983)">
        <g filter="url(#filter1_i_11466_4983)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.65016 30.069L8.65172 30.0672L8.66373 30.0529C8.67509 30.0393 8.69298 30.0176 8.71661 29.9884C8.76388 29.9299 8.83392 29.8415 8.92024 29.727C9.09325 29.4974 9.32961 29.166 9.57857 28.7639C10.0262 28.041 10.4852 27.1362 10.7156 26.2116C9.27786 24.168 8.43335 21.6756 8.43335 18.9882C8.43335 12.0479 14.0596 6.42157 21 6.42157C27.9404 6.42157 33.5667 12.0479 33.5667 18.9882C33.5667 25.9286 27.9404 31.5549 21 31.5549C19.4278 31.5549 17.9211 31.2657 16.5317 30.737C15.1235 31.2652 13.374 31.4628 12.0023 31.5368C11.2414 31.5779 10.5659 31.5822 10.0802 31.5763C9.83698 31.5733 9.6405 31.5678 9.50367 31.5629C9.43523 31.5605 9.38166 31.5582 9.34455 31.5565L9.30143 31.5545L9.2895 31.5539L9.28489 31.5536L9.33335 30.6549C9.28419 31.5536 9.28489 31.5536 9.28489 31.5536C8.94277 31.5349 8.64025 31.3235 8.50567 31.0084C8.37122 30.6936 8.42761 30.3291 8.65016 30.069ZM15.1666 17.4885C14.3381 17.4885 13.6666 18.16 13.6666 18.9885C13.6666 19.8169 14.3381 20.4885 15.1666 20.4885H15.1799C16.0083 20.4885 16.6799 19.8169 16.6799 18.9885C16.6799 18.16 16.0083 17.4885 15.1799 17.4885H15.1666ZM20.9999 17.4885C20.1715 17.4885 19.4999 18.16 19.4999 18.9885C19.4999 19.8169 20.1715 20.4885 20.9999 20.4885H21.0132C21.8417 20.4885 22.5132 19.8169 22.5132 18.9885C22.5132 18.16 21.8417 17.4885 21.0132 17.4885H20.9999ZM26.8332 17.4885C26.0048 17.4885 25.3332 18.16 25.3332 18.9885C25.3332 19.8169 26.0048 20.4885 26.8332 20.4885H26.8466C27.675 20.4885 28.3466 19.8169 28.3466 18.9885C28.3466 18.16 27.675 17.4885 26.8466 17.4885H26.8332Z"
            fill="url(#paint0_radial_11466_4983)"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_11466_4983"
          x="-3"
          y="-3"
          width="48"
          height="48"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.498039 0 0 0 0 0.407843 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_11466_4983"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_11466_4983"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_i_11466_4983"
          x="8.43335"
          y="6.42157"
          width="26.6571"
          height="26.6807"
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
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1.52381" dy="1.52381" />
          <feGaussianBlur stdDeviation="1.14286" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_11466_4983"
          />
        </filter>
        <radialGradient
          id="paint0_radial_11466_4983"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(22.0839 27.1287) rotate(-60.1772) scale(24.8321 24.8204)"
        >
          <stop stopColor="#7F68FF" />
          <stop offset="1" stopColor="#BEB2FF" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function ImageGeneratorIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
    >
      <g filter="url(#filter0_d_9279_147)">
        <g filter="url(#filter1_i_9279_147)">
          <path
            d="M13.6522 10.124C12.8594 10.124 12.2166 10.7667 12.2166 11.5596C12.2166 12.3524 12.8594 12.9951 13.6522 12.9951C14.445 12.9951 15.0877 12.3524 15.0877 11.5596C15.0877 10.7667 14.445 10.124 13.6522 10.124Z"
            fill="url(#paint0_radial_9279_147)"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 6.4375C10.0325 6.4375 8.4375 8.03249 8.4375 10V20C8.4375 21.9675 10.0325 23.5625 12 23.5625H22C23.9675 23.5625 25.5625 21.9675 25.5625 20V10C25.5625 8.03249 23.9675 6.4375 22 6.4375H12ZM9.5625 10C9.5625 8.65381 10.6538 7.5625 12 7.5625H22C23.3462 7.5625 24.4375 8.65381 24.4375 10V12.5688C23.8719 12.4375 23.2829 12.3681 22.6783 12.3681C19.4925 12.3681 16.7568 14.29 15.5652 17.0367C14.629 16.121 13.3471 15.5556 11.933 15.5556C11.0795 15.5556 10.2734 15.7619 9.5625 16.127V10Z"
            fill="url(#paint1_radial_9279_147)"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_9279_147"
          x="-3"
          y="-3"
          width="40"
          height="40"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.435294 0 0 0 0 0.345098 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_9279_147"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_9279_147"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_i_9279_147"
          x="8.4375"
          y="6.4375"
          width="18.6488"
          height="18.6488"
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
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1.52381" dy="1.52381" />
          <feGaussianBlur stdDeviation="1.14286" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_9279_147"
          />
        </filter>
        <radialGradient
          id="paint0_radial_9279_147"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(13.9454 22.1904) rotate(-58.7716) scale(25.6788 25.6788)"
        >
          <stop stopColor="#FF6F58" />
          <stop offset="1" stopColor="#FFA293" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_9279_147"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(13.9454 22.1904) rotate(-58.7716) scale(25.6788 25.6788)"
        >
          <stop stopColor="#FF6F58" />
          <stop offset="1" stopColor="#FFA293" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function CodeGeneratorIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
    >
      <g filter="url(#filter0_d_9279_150)">
        <g filter="url(#filter1_i_9279_150)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.4375 10C8.4375 8.03249 10.0325 6.4375 12 6.4375H22C23.9675 6.4375 25.5625 8.03249 25.5625 10V20C25.5625 21.9675 23.9675 23.5625 22 23.5625H12C10.0325 23.5625 8.4375 21.9675 8.4375 20V10ZM18.4373 11.123C18.5047 10.8197 18.3134 10.5193 18.0102 10.4519C17.7069 10.3845 17.4065 10.5757 17.3391 10.879L15.5618 18.8766C15.4944 19.1798 15.6856 19.4803 15.9889 19.5477C16.2922 19.6151 16.5926 19.4239 16.66 19.1206L18.4373 11.123ZM20.2665 12.8471C20.0469 12.6275 19.6907 12.6274 19.471 12.8471C19.2513 13.0668 19.2513 13.4229 19.471 13.6426L20.8282 14.9999L19.471 16.357C19.2513 16.5767 19.2513 16.9329 19.471 17.1525C19.6907 17.3722 20.0468 17.3722 20.2665 17.1525L22.0214 15.3977C22.241 15.178 22.241 14.8219 22.0214 14.6022L20.2665 12.8471ZM14.5224 13.6494C14.742 13.4297 14.742 13.0736 14.5223 12.8539C14.3027 12.6343 13.9465 12.6343 13.7268 12.854L11.9788 14.6022C11.7591 14.8219 11.7591 15.178 11.9788 15.3977L13.7269 17.1457C13.9465 17.3654 14.3027 17.3654 14.5224 17.1457C14.742 16.926 14.742 16.5699 14.5224 16.3502L13.172 14.9999L14.5224 13.6494Z"
            fill="url(#paint0_radial_9279_150)"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_9279_150"
          x="-3"
          y="-3"
          width="40"
          height="40"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0901961 0 0 0 0 0.654902 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_9279_150"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_9279_150"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_i_9279_150"
          x="8.4375"
          y="6.4375"
          width="18.125"
          height="18.125"
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
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1" dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_9279_150"
          />
        </filter>
        <radialGradient
          id="paint0_radial_9279_150"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(17.7385 20.5335) rotate(-60.1541) scale(16.9079 16.9079)"
        >
          <stop stopColor="#17A7FF" />
          <stop offset="1" stopColor="#84D0FF" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function VideoGeneratorIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="38"
      height="32"
      viewBox="0 0 38 32"
      fill="none"
    >
      <g filter="url(#filter0_d_9279_153)">
        <g filter="url(#filter1_i_9279_153)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.875 10.1305C8.875 8.10037 10.5208 6.45459 12.551 6.45459H25.449C27.4792 6.45459 29.125 8.10037 29.125 10.1305V17.8694C29.125 19.8996 27.4792 21.5454 25.449 21.5454H12.551C10.5208 21.5454 8.875 19.8996 8.875 17.8694V10.1305ZM21.8102 13.429C22.227 13.6955 22.227 14.3043 21.8102 14.5708L18.0934 16.9471C17.6424 17.2355 17.0509 16.9116 17.0509 16.3762V11.6236C17.0509 11.0882 17.6424 10.7643 18.0934 11.0527L21.8102 13.429Z"
            fill="url(#paint0_radial_9279_153)"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_9279_153"
          x="-1"
          y="-4"
          width="40"
          height="40"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.67451 0 0 0 0 0.0980392 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_9279_153"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_9279_153"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_i_9279_153"
          x="8.875"
          y="6.45459"
          width="21.7738"
          height="16.6146"
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
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1.52381" dy="1.52381" />
          <feGaussianBlur stdDeviation="1.14286" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_9279_153"
          />
        </filter>
        <radialGradient
          id="paint0_radial_9279_153"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(19.8733 18.8761) rotate(-52.4062) scale(16.3099 18.2642)"
        >
          <stop stopColor="#FFAC19" />
          <stop offset="1" stopColor="#FFCE78" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function EmailGeneratorIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="32"
      viewBox="0 0 36 32"
      fill="none"
    >
      <g filter="url(#filter0_d_9279_160)">
        <g filter="url(#filter1_i_9279_160)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 10.1784C8 8.17331 9.62546 6.54785 11.6306 6.54785H24.3694C26.3745 6.54785 28 8.17332 28 10.1784V17.8217C28 19.8268 26.3745 21.4523 24.3694 21.4523H11.6306C9.62546 21.4523 8 19.8268 8 17.8217V10.1784ZM12.3775 10.6036C12.1178 10.4225 11.7605 10.4862 11.5794 10.7459C11.3983 11.0056 11.462 11.3629 11.7217 11.544L16.7981 15.0839C17.5204 15.5877 18.4803 15.5877 19.2026 15.0839L24.279 11.544C24.5387 11.3629 24.6024 11.0056 24.4213 10.7459C24.2402 10.4862 23.8829 10.4225 23.6232 10.6036L18.5468 14.1435C18.2185 14.3725 17.7822 14.3725 17.4539 14.1435L12.3775 10.6036Z"
            fill="url(#paint0_radial_9279_160)"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_9279_160"
          x="-2"
          y="-4"
          width="40"
          height="40"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.168627 0 0 0 0 0.811765 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_9279_160"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_9279_160"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_i_9279_160"
          x="8"
          y="6.54785"
          width="21.5238"
          height="16.4284"
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
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1.52381" dy="1.52381" />
          <feGaussianBlur stdDeviation="1.14286" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_9279_160"
          />
        </filter>
        <radialGradient
          id="paint0_radial_9279_160"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(18.8625 18.816) rotate(-52.4062) scale(16.1086 18.0387)"
        >
          <stop stopColor="#2BCFFF" />
          <stop offset="1" stopColor="#8EE5FF" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function ChevronDown2Icon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      {...props}
    >
      <path
        d="M4.33301 5.91666L8.49967 10.0833L12.6663 5.91666"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}
