import { Book, MoveRight } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatedGradientTextDemo } from "./cool-top-text";
import Link from "next/link";

export const Hero = () => (
  <div className="w-full px-8 border-b">
    <div className="container mx-auto">
      <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
        <div>
          <AnimatedGradientTextDemo />
        </div>
        <div className="flex gap-4 flex-col">
          <h1 className="text-4xl md:text-6xl max-w-2xl tracking-tighter text-center font-regular">
            Classroom management for modern education.
          </h1>
          <p className="text-md md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
            Power your entire unversity/college with DavidDesk&apos;s AI to
            manage your institution, empower educators and students, and
            streamline almost everything!
          </p>
        </div>
        <div className="flex flex-row gap-3">
          <Button size="lg" className="gap-4" variant="outline">
            Learn More <Book className="w-4 h-4" />
          </Button>
          <Button size="lg" className="gap-4" asChild>
            <Link href="/auth/admin-signup">
              Sign up here <MoveRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </div>
);
