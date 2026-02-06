"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Tooltip, TooltipTrigger, TooltipContent } from "./tooltip";
import ImageLoader from "./image-loader";
import { purifyDom } from "@/utils/lib";

type Program = {
    image?: string;
    title: string;
    code: string;
    program_type: string;
    description: string;
    onClick?: () => void;
};
type Props = {
    mobile?: boolean;
    onClick?: () => void;
};

export default function ProgramLinks({ mobile = false, onClick }: Props) {
    const [programsOpen, setProgramsOpen] = useState(false);
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!programsOpen || programs.length > 0) return;

        const fetchPrograms = async () => {
            try {
                setLoading(true);
                console.log(process.env.NEXT_PUBLIC_FRONTEND_API_TOKEN);
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/load-programs`, {
                    headers: {
                        "X-API-TOKEN": process.env.NEXT_PUBLIC_FRONTEND_API_TOKEN!,
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch programs");

                const data = await res.json();
                setPrograms(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPrograms();
    }, [programsOpen, programs.length]);

    return (
        <li className={`relative fade-left ${mobile ? "w-full" : ""}`} >
            <button
                onClick={() => setProgramsOpen((prev) => !prev)}
                className="px-2 hover:scale-105 transition-transform flex items-center gap-1 mt-1 uppercase font-bold text-[13px]"
            >
                Programs {programsOpen ? <FaCaretUp /> : <FaCaretDown />}
            </button>

            {mobile ? (
                <AnimatePresence>
                    {programsOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pl-4 mt-2 flex flex-col gap-2"
                        >
                            {loading && (
                                <span className="text-xs text-gray-400">Loading...</span>
                            )}

                            {programs.map((program, i) => (
                                <Link
                                    key={i}
                                    href={program.code}
                                    onClick={onClick}
                                    className="text-xs py-1"
                                >
                                    {program.title}
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            ) : (
                <AnimatePresence>
                    {programsOpen && (
                        <motion.ul
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full left-0 mt-1 w-44 bg-slate-900 rounded-md shadow-lg z-50"
                        >
                            {loading && (
                                <li className="px-3 py-2 text-xs text-gray-400">
                                    Loading...
                                </li>
                            )}

                            {!loading && programs.length === 0 && (
                                <li className="px-3 py-2 text-xs text-gray-400">
                                    No programs found
                                </li>
                            )}

                            {programs.map((program, index) => (
                                <Tooltip key={index} >
                                    <TooltipTrigger asChild>
                                        <li key={index} className="hover:bg-slate-800 transition hover:scale-110 duration-200 rounded-lg">
                                            <Link
                                                href={program.code}
                                                className="block pl-3 pr-5 py-2 text-xs font-normal  "
                                                onClick={() => setProgramsOpen(false)}
                                            >
                                                {program.title}
                                            </Link>
                                        </li>
                                    </TooltipTrigger>
                                    <TooltipContent side={"right"}>
                                        <div className="flex flex-row gap-3 p-2">
                                            <div className="flex flex-col">
                                                <ImageLoader
                                                    src={`/storage/images/program_images/thumbnails/${program.image}`}
                                                    alt="Program Banner"
                                                    className="  h-full my-1 rounded"
                                                    width={400}
                                                />
                                                {!program.description && (
                                                    <>
                                                        <p className="text-[16px] font-bold">
                                                            {program.title}
                                                        </p>
                                                        <span className="text-[9px] poppins-thin bg-linear-to-r from-[#00aeef] to-[#004a98] w-fit px-2 py-px rounded my-2">
                                                            {program.program_type ?? ''}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                            {
                                                program.description && (
                                                    <div>
                                                        <p className="text-[16px] font-bold">
                                                            {program.title}
                                                        </p>
                                                        <span className="text-[9px] poppins-thin bg-linear-to-r from-[#00aeef] to-[#004a98] w-fit px-2 py-px rounded my-2">
                                                            {program.program_type ?? ''}
                                                        </span>
                                                        <div
                                                            className=" text-justify text-gray-50 text-[10.5px] mt-2"
                                                            dangerouslySetInnerHTML={{
                                                                __html: purifyDom(program.description ?? ""),
                                                            }}
                                                            style={{ color: "white" }}
                                                        />
                                                    </div>
                                                )
                                            }

                                        </div>
                                    </TooltipContent>
                                </Tooltip>

                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            )}

        </li>
    );
}
