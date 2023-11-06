import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="bg-neutral-100 dark:bg-neutral-900">
      <nav className="py-4 px-8  md:px-20 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image src="/chat.png" alt="chat icon" width={30} height={50} />
          <span className="text-sky-600 font-bold">SwiftTalk</span>
        </div>
        <ModeToggle />
      </nav>
    </header>
  );
};

export default Navbar;
