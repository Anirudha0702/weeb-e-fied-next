import {
  Calendar,
  Github,
  House,
  Instagram,
  Linkedin,
  List,
  Mail,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
interface ISidebar {
  className?: string;
}
function Sidebar({ className = "" }: ISidebar) {
  return (
    <div className={cn("w-full  relative  max-w-80  ", className)}>
      <div className="p-4">
        <div className="flex items-center justify-center flex-col gap-2">
          <div className="bg-primary/40 w-full p-2 rounded-md flex items-center justify-start gap-2 text-md text-primary cursor-pointer hover:bg-primary/30 hover:text-primary">
            <House className="text-primary" />
            <span>Home</span>
          </div>
          <div className=" w-full p-2 rounded-md flex items-center justify-start gap-2 text-md cursor-pointer hover:bg-primary/30 hover:text-primary">
            <List />
            <span>A-Z list</span>
          </div>
          <div className=" w-full p-2 rounded-md flex items-center justify-start gap-2 text-md cursor-pointer hover:bg-primary/30 hover:text-primary">
            <House />
            <span>Genres</span>
          </div>
        </div>
        <div className="mt-3 "></div>
      </div>

      <hr />
      <div className="p-4">
        <div className="flex items-center justify-center flex-col gap-2">
          <div className=" w-full p-2 rounded-md flex items-center justify-start gap-2 text-md  cursor-pointer hover:bg-primary/30 hover:text-primary">
            <Calendar />
            <span>Estimate Schedule</span>
          </div>
          <div className=" w-full p-2 rounded-md flex items-center justify-start gap-2 text-md cursor-pointer hover:bg-primary/30 hover:text-primary">
            <MessageSquare />
            <span>Community</span>
          </div>
        </div>
      </div>
      <hr />
      <div className="absolute bottom-0 flex items-center justify-center w-full mb-4 gap-4 border-t pt-4">
        <a
          href="https://www.facebook.com/profile.php?id=100088316115685"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/meta.svg"
            alt=""
            className="w-8 h-8 cursor-pointer"
          />
        </a>
        <a
          href="https://github.com/Anirudha0702"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="cursor-pointer hover:text-primary" />
        </a>
        <a
          href="https://www.instagram.com/robin_e_fied_930/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram className="cursor-pointer hover:text-primary" />
        </a>
        <a
          href="https://www.linkedin.com/in/anirudha-pradhan-346388240/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin className="cursor-pointer hover:text-primary" />
        </a>
        <a
          href="mailto:anirudhapradhan403@gmail.com"
          className="cursor-pointer hover:text-primary"
        >
          <Mail />
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
