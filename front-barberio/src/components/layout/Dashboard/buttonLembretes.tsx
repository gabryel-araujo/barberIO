import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessageCircleQuestionIcon } from "lucide-react";
import { ReactNode } from "react";

type ButtonLembreteProps = {
  className?: string;
  children: ReactNode;
  mensagem: string;
  link?: string;
};

export const ButtonLembrete = ({
  children,
  className,
  mensagem,
  link,
}: ButtonLembreteProps) => {
  return (
    <div className="flex">
      <a
        href={link}
        className={`${className} w-40 h-10 cursor-pointer rounded-l-sm bg-green-600 text-slate-100 flex items-center justify-center`}
      >
        {children}
      </a>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={`${className} w-10 h-10 bg-yellow-600 rounded-r-sm text-yellow-600 flex items-center justify-center`}
          >
            <MessageCircleQuestionIcon fill="white" size={20} />
          </div>
        </TooltipTrigger>
        <TooltipContent>{mensagem}</TooltipContent>
      </Tooltip>
    </div>
  );
};
