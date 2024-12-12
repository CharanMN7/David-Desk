import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { AlarmClock, AlertCircleIcon } from "lucide-react";
import { Button } from "../ui/button";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="ml-4 mr-2 sm:mx-8 flex h-14 items-center justify-between">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex items-center gap-4 justify-end">
          <Button variant="destructive" 
            className="relative h-8 w-8 rounded-full" >
              <AlertCircleIcon/>
            </Button>
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
