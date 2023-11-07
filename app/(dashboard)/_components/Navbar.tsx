import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import { UserAvatar } from "./UserAvatar";
import Link from "next/link";

interface NavbarProp {
  name: string;
  email: string;
  image: string;
}

const Navbar = ({ name, email, image }: NavbarProp) => {
  return (
    <header className="bg-neutral-100 dark:bg-neutral-900 h-[8%]">
      <nav className="py-4 px-8  md:px-20 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-4">
          <Image src="/chat.png" alt="chat icon" width={30} height={50} />
          <span className="text-sky-600 font-bold">SwiftTalk</span>
        </Link>
        <div className="flex items-center gap-10">
          <UserAvatar email={email} name={name} image={image} />
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
