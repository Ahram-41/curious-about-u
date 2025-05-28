import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface GitHubButtonProps {
  className?: string
}

export function GitHubButton({ className = "" }: GitHubButtonProps) {
  const handleClick = () => {
    window.open("https://github.com/Ahram-41/curious-about-u", "_blank", "noopener,noreferrer")
  }

  return (
    <TooltipProvider delayDuration={200} skipDelayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleClick}
            variant="outline"
            size="sm"
            className={`
              group relative overflow-hidden
              bg-white/95 backdrop-blur-md
              border-pink-200/80 hover:border-pink-300
              text-pink-700 hover:text-white
              shadow-lg hover:shadow-2xl
              transition-all duration-200 ease-in-out
              hover:scale-110 active:scale-95
              rounded-full 
              px-2 py-2 xl:px-4 xl:py-2
              text-xs xl:text-sm
              min-h-[44px] min-w-[44px] xl:min-h-auto xl:min-w-auto
              touch-manipulation
              ${className}
            `}
          >
            {/* 悬停时的背景渐变 */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
            
            {/* 按钮内容 */}
            <div className="relative flex items-center justify-center gap-1 xl:gap-2 z-10">
              <Github className="h-5 w-5 xl:h-4 xl:w-4 transition-all duration-200 group-hover:rotate-12 group-hover:scale-110 flex-shrink-0" />
              <span className="font-medium text-xs xl:text-sm hidden xl:inline">GitHub</span>
            </div>
            
            {/* 装饰性光效 */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-200 rounded-full">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            </div>
            
            {/* 外层光晕效果 */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-0 group-hover:opacity-30 blur-md transition-all duration-300 group-hover:scale-110 -z-10" />
          </Button>
        </TooltipTrigger>
        <TooltipContent 
          side="left" 
          className="bg-white/95 backdrop-blur-sm border-pink-200 text-pink-700 shadow-xl rounded-lg px-3 py-2 animate-in fade-in-0 zoom-in-95 duration-150 hidden xl:block"
          sideOffset={8}
        >
          <p className="text-sm font-medium flex items-center gap-2">
            <Github className="h-3 w-3" />
            查看项目源代码 ✨
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
} 