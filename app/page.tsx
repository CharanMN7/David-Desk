import CoolCard from "@/components/landing-page/cool-card";
import CoolSection from "@/components/landing-page/cool-section";
import { Hero } from "@/components/landing-page/hero";
import { Button } from "@/components/ui/button";
import { Earth, Instagram, UsersRound } from "lucide-react";
import Link from "next/link";

const ddStudentDark = "/dd-student-dark.png";

const Page = () => {
  return (
    <div>
      <header className="w-full p-4 flex items-center justify-between md:px-4 sticky top-0 bg-background/50 backdrop-blur-md">
        <h1 className="text-2xl font-semibold">David Desk</h1>
        <Button asChild>
          <Link href="/auth/login">Login</Link>
        </Button>
      </header>
      <Hero />

      <CoolSection
        icon={UsersRound}
        heading="Level up your study game"
        topic="For students"
      >
        <CoolCard
          heading="Chat with David!"
          description="Talk to your AI mentor to revise concepts, get your doubts solved, and
          more!"
          image={ddStudentDark}
        />
        <CoolCard
          heading="Quiz on demand"
          description="Practice all your classroom topics and beyond."
          image={ddStudentDark}
        />
      </CoolSection>

      <CoolSection
        icon={UsersRound}
        heading="Maximize your impact"
        topic="For Faculty"
      >
        <CoolCard
          heading="Your personal TA"
          description="Get in-depth insights from David about your students, beyond grades, and understand how you can help them the best"
          image={ddStudentDark}
        />
        <CoolCard
          heading="AI: Academic Intelligence"
          description="Generate notes for you and your students from your class and send out auto-generated quizzes to your students to stay on track."
          image={ddStudentDark}
        />
      </CoolSection>

      <CoolSection
        icon={UsersRound}
        heading={`Automate'em all`}
        topic="For Admins"
      >
        <CoolCard
          heading="Chat with your data!"
          description="Just talk to your data to visualize and use it without having to deal with complex filters and fixed metrics."
          image={ddStudentDark}
        />
        <CoolCard
          heading="Capture everything!"
          description="Use a database that is intuitive and extendable for your institution to use and make use of almost all of the data you have, with the power of AI agents."
          image={ddStudentDark}
        />
      </CoolSection>

      <footer className="flex flex-wrap justify-between items-end p-8">
        <div>
          <h2 className="text-4xl">David Desk</h2>
          <p className="text-sm text-muted-foreground">
            The ultimate education experience.
          </p>
        </div>
        <div className="flex gap-6 flex-wrap">
          <Link href="">
            <Instagram className="text-muted-foreground" />
          </Link>
          <Link href="">
            <Earth className="text-muted-foreground" />
          </Link>
        </div>
      </footer>
    </div>
  );
};
export default Page;
