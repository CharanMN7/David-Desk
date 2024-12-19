"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { AlarmClock } from "lucide-react";
import { Button } from "../ui/button";

interface NavbarProps {
  title: string;
}

async function sendNotification(title: string, description: string) {
  try {
    const notificationData = {
      title,
      description,
      topic: "alert",
    };

    const response = await fetch(
      "https://david-backend-production.up.railway.app/send-notification",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notificationData),
      },
    );

    if (response.ok) {
      console.log("Notification sent successfully");
    } else {
      console.error("Failed to send notification");
    }
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}

export function Navbar({ title }: NavbarProps) {
  const handleAlarmClick = () => {
    sendNotification(
      "Alarm Triggered",
      "An alarm was triggered from the Navbar.",
    );
  };

  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="ml-4 mr-2 sm:mx-8 flex h-14 items-center justify-between">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex items-center gap-4 justify-end">
          <Button
            variant="default"
            className="relative h-8 w-8 rounded-full"
            onClick={handleAlarmClick}
          >
            <AlarmClock />
          </Button>
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
