import { Button } from "@/components/ui/button";
import Navbar from "@/app/(pages)/(marketing)/_components/navbar";
import Link from "next/link";

export default function HomeView() {
  return (
    <>
      <Navbar />
      <main className="container my-20 grid place-content-center text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
            Unleash Your Productivity <br /> with Kanbify
          </h1>
          <h2 className="mx-auto w-fit rounded-xl bg-gradient-to-r from-sky-600 to-purple-700 px-8 py-4 text-lg font-semibold text-white sm:text-3xl">
            A modern <span className="font-bold text-emerald-500">Digital Kanban</span>
          </h2>
        </div>
        <div className="mx-auto mt-8 max-w-2xl space-y-8 text-lg text-neutral-700">
          <p>
            Discover the efficiency of digital Kanban! With our platform, creating and organizing
            tasks is simple and intuitive. Whether working alone or in a team, our tool flexibly
            adapts to your style, helping you achieve your goals faster. Try it today and take your
            productivity to the next level.
          </p>
          <Button
            className="bg-emerald-600 font-semibold tracking-wider hover:bg-emerald-500"
            asChild
          >
            <Link href={"/auth/login"}>Start your project</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
