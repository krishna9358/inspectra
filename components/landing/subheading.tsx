
import { Stars } from "./stars";

type PropsType = {
    text: string;
};

export function Subheading({ text }: PropsType) {
    return (
        <div className="rounded-full mb-6 max-w-fit mx-auto bg-linear-to-r from-[#FF58D580] to-[#4E6EFF80] p-0.5">
            <div className="bg-white dark:bg-dark-primary py-2 text-sm items-center gap-2 px-5 inline-flex dark:text-white/90 rounded-full">
                <Stars />
                <p>{text}</p>
            </div>
        </div>
    );
}
