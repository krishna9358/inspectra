"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";

export interface DiffLine {
  kind: "hunk" | "context" | "add" | "del";
  old?: number | null;
  new?: number | null;
  content: string;
}

interface GithubInlineCommentsProps {
  fileName: string;
  diff: DiffLine[];
  initialComments?: { [key: number]: any[] };
}

export default function GithubInlineComments({
  fileName,
  diff,
  initialComments = {},
}: GithubInlineCommentsProps) {
  const [activeCommentLine, setActiveCommentLine] = React.useState<number | null>(null);
  const [hoveredLine, setHoveredLine] = React.useState<number | null>(null);
  const [comments, setComments] = React.useState<{ [key: number]: any[] }>(initialComments);

  const toggleComment = (lineIndex: number) => {
    if (activeCommentLine === lineIndex) {
      setActiveCommentLine(null);
    } else {
      setActiveCommentLine(lineIndex);
    }
  };

  return (
    <div className="w-full rounded-xl border border-zinc-800 bg-[#0d1117] overflow-hidden shadow-2xl font-mono text-sm max-w-[900px]">
      {/* Header */}
      <div className="bg-[#161b22] border-b border-zinc-800 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-zinc-400">
          <span className="font-semibold text-zinc-300">{fileName}</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-zinc-500">
          <span>2 additions, 1 deletion</span>
           <div className="flex gap-0.5">
               <div className="w-3 h-3 bg-green-900 rounded-sm" />
               <div className="w-3 h-3 bg-red-900 rounded-sm" />
               <div className="w-3 h-3 bg-zinc-800 rounded-sm" />
           </div>
        </div>
      </div>

      {/* Diff Content */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {diff.map((line, index) => {
               const hasComments = comments[index] && comments[index].length > 0;
               const isHovered = hoveredLine === index;
               
               return (
                <React.Fragment key={index}>
                  <tr
                    className={cn(
                        "group transition-colors duration-75 relative",
                        line.kind === "add" && "bg-green-900/15 hover:bg-green-900/25",
                        line.kind === "del" && "bg-red-900/15 hover:bg-red-900/25",
                        line.kind === "context" && "hover:bg-[#161b22]",
                        line.kind === "hunk" && "bg-[#161b22] text-zinc-500"
                    )}
                    onMouseEnter={() => setHoveredLine(index)}
                    onMouseLeave={() => setHoveredLine(null)}
                  >
                    {/* Line Numbers */}
                    {line.kind === "hunk" ? (
                         <td colSpan={3} className="px-4 py-2 text-center text-xs bg-[#161b22] border-b border-zinc-800/50">
                             {line.content}
                         </td>
                    ) : (
                        <>
                            <td className="w-[1%] min-w-[50px] px-2 py-1 text-right text-zinc-600 select-none border-r border-zinc-800/50 relative">
                                {line.old || ""}
                            </td>
                            <td className="w-[1%] min-w-[50px] px-2 py-1 text-right text-zinc-600 select-none border-r border-zinc-800/50 relative">
                                {line.new || ""}
                                {/* Add Comment Button (Plus Icon) */}
                                {(isHovered || activeCommentLine === index) && line.kind !== "del" && (
                                    <button 
                                        onClick={() => toggleComment(index)}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-5 h-5 bg-blue-600 hover:bg-blue-500 rounded-md shadow-lg flex items-center justify-center text-white transition-all scale-0 group-hover:scale-100"
                                    >
                                        <Plus className="w-3 h-3" />
                                    </button>
                                )}
                            </td>
                            <td className={cn(
                                "px-4 py-1 whitespace-pre break-all relative",
                                line.kind === "add" && "text-zinc-200",
                                line.kind === "del" && "text-zinc-500 line-through decoration-zinc-500/50",
                                line.kind === "context" && "text-zinc-400"
                            )}>
                                <span className="inline-block min-w-full">
                                    {line.content}
                                </span>
                            </td>
                        </>
                    )}
                  </tr>

                  {/* Comment Thread Area */}
                  <AnimatePresence>
                    {(activeCommentLine === index || hasComments) && (
                        <tr>
                            <td colSpan={3} className="px-0">
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden bg-[#0d1117]"
                                >
                                    <div className="px-4 sm:px-12 py-4">
                                        <div className="rounded-lg border border-zinc-700 bg-[#161b22] shadow-xl overflow-hidden">
                                            {/* Existing Comments */}
                                            {comments[index]?.map((comment: any, i: number) => (
                                                <div key={i} className="border-b border-zinc-800 last:border-0 relative">
                                                    <div className={cn(
                                                        "flex items-center gap-2 px-4 py-2 border-b border-zinc-800/50",
                                                        comment.isAi ? "bg-blue-900/10" : "bg-[#161b22]"
                                                    )}>
                                                        {comment.isAi ? (
                                                            <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
                                                                <BotIcon className="w-4 h-4 text-white" />
                                                            </div>
                                                        ) : (
                                                            <Avatar className="w-6 h-6">
                                                                <AvatarImage src={comment.avatar} />
                                                                <AvatarFallback>U</AvatarFallback>
                                                            </Avatar>
                                                        )}
                                                        <span className={cn("font-bold text-xs", comment.isAi ? "text-blue-400" : "text-zinc-300")}>
                                                            {comment.user}
                                                        </span>
                                                        <span className="text-zinc-500 text-xs">{comment.time}</span>
                                                        {comment.isAi && (
                                                            <span className="ml-auto text-[10px] uppercase tracking-wider font-bold text-blue-500 bg-blue-500/10 px-1.5 py-0.5 rounded">AI</span>
                                                        )}
                                                    </div>
                                                    <div className="p-4 text-zinc-300">
                                                        <p className="mb-2 leading-relaxed">{comment.content}</p>
                                                        {comment.suggestion && (
                                                            <div className="mt-3">
                                                               <p className="text-xs uppercase text-zinc-500 font-bold mb-2">Suggested Change</p>
                                                               <div className="bg-zinc-950 p-2 rounded border border-zinc-800 font-mono text-green-400 text-xs">
                                                                   {comment.suggestion}
                                                               </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}

                                            {/* Write Comment Box */}
                                            {activeCommentLine === index && (
                                                <div className="p-4 bg-[#161b22]">
                                                    <Textarea 
                                                        placeholder="Leave a comment..." 
                                                        className="min-h-[80px] bg-[#0d1117] border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-blue-600 mb-2 resize-none"
                                                    />
                                                    <div className="flex justify-end gap-2">
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm" 
                                                            onClick={() => setActiveCommentLine(null)}
                                                            className="text-zinc-400 hover:text-white"
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white font-medium">
                                                            Comment
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {/* Visual Connector Line */}
                                    <div className="absolute top-0 bottom-0 left-[24px] sm:left-[56px] w-[1px] bg-zinc-700/50 -z-10" />
                                </motion.div>
                            </td>
                        </tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
               );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BotIcon({ className }: { className?: string }) {
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        >
            <path d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M2 14h2" />
            <path d="M20 14h2" />
            <path d="M15 13v2" />
            <path d="M9 13v2" />
        </svg>
    )
}
