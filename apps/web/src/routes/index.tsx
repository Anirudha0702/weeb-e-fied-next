import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { House, MoveRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const lists = [
    "Jujutsu Kaisen 2nd Season",
    "Jujutsu Kaisen: Hidden Inventory/Premature Death",
    "Jujutsu Kaisen (TV), Overflow (Uncensored)",
    "Chainsaw Man the Movie: Reze Arc",
    "Solo Leveling Season 2: Arise from the Shadow",
    "Black Clover",
    "Gachiakuta",
    "Solo Leveling",
    "Bleach",
  ];
  const navigate = useNavigate();

  return (
    <div className=" relative w-full bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <img
        src="/images/home.jpg"
        alt=""
        className="w-full h-full object-cover absolute inset-0 "
      />
      <div className="w-full max-w-md md:max-w-4xl z-10 ">
        <div className="flex flex-col gap-6 ">
          <Card className="overflow-hidden p-0 z-10">
            <CardContent className="grid p-0 md:grid-cols-2 grid-cols-1">
              <div className="p-6 md:p-8 ">
                <div className="justify-center font-semibold flex gap-6">
                  <span
                    className="flex items-center gap-1 cursor-pointer hover:text-primary"
                    onClick={() =>
                      navigate({
                        to: "/home",
                      })
                    }
                  >
                    <House size={15} />
                    Home
                  </span>
                  <span className="cursor-pointer hover:text-primary">
                    Explore
                  </span>
                  <span className="cursor-pointer hover:text-primary">
                    Most Popular
                  </span>
                </div>
                <img
                  src="/images/logo-text-crop.png"
                  alt=""
                  className="my-14"
                />
                <Input type="text" placeholder="Search for anime..." />
                <Button
                  className="w-32 rounded-full mt-4 mx-auto flex "
                  onClick={() =>
                    navigate({
                      to: "/home",
                    })
                  }
                >
                  Be a Weeb
                  <MoveRight />
                </Button>
                <div className="text-sm mt-6 text-muted-foreground">
                  <span className="font-semibold text-white mr-2">
                    Suggestion:
                  </span>
                  {lists.map((item, index) => (
                    <span
                      key={index}
                      className="mr-2 hover:text-primary cursor-pointer"
                    >
                      {item},
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-muted/50 relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute inset-0 pointer-events-none" />

                {/* CONTENT WRAPPER */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                  {/* HERO */}
                  <section className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-purple-400 mb-6">
                      Weeb — Where Love for Anime Blooms
                    </h1>

                    <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                      Like <span className="font-semibold">Death Note</span>, do
                      you have an anime wish-list but no safe place to watch it
                      for free? Welcome to{" "}
                      <span className="text-purple-400 font-semibold">
                        Weeb
                      </span>{" "}
                      — your ad-free, safe anime haven.
                    </p>
                  </section>

                  {/* INTRO */}
                  <section className="">
                    <div className="bg-background/60 backdrop-blur rounded-2xl p-8 border border-border shadow-xl">
                      <h2 className="text-2xl font-semibold text-purple-400 mb-4">
                        Free. Safe. Uninterrupted.
                      </h2>
                      <p className="text-muted-foreground">
                        Stream anime without ads, buffering, or sign-ups. Smooth
                        as Cowboy Bebop’s action scenes — immersive like Sword
                        Art Online (minus the danger).
                      </p>
                    </div>
                  </section>

                  {/* FEATURES */}
                  {/* <section className="mb-28">
                    <h2 className="text-3xl font-bold text-center text-purple-400 mb-14">
                      Why Choose Weeb?
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        [
                          "No Ads",
                          "Watch uninterrupted. No popups. No mid-episode breaks.",
                        ],
                        [
                          "No Sign-Up",
                          "Open Weeb and start watching instantly.",
                        ],
                        [
                          "HD Quality",
                          "Crisp visuals exactly as studios intended.",
                        ],
                        [
                          "SUB & DUB",
                          "Watch in Japanese or dubbed — your choice.",
                        ],
                        [
                          "Fast Streaming",
                          "Lightning-fast load speeds. No waiting.",
                        ],
                        [
                          "Multi-Device",
                          "Desktop, tablet, or mobile — works everywhere.",
                        ],
                      ].map(([title, desc]) => (
                        <div
                          key={title}
                          className="bg-background/50 rounded-xl p-6 border border-border hover:border-purple-400/30 transition"
                        >
                          <h3 className="text-green-400 font-semibold mb-2">
                            {title}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section> */}

                  {/* GENRES */}
                  {/* <section className="mb-28">
                    <h2 className="text-3xl font-bold text-center text-purple-400 mb-14">
                      Popular Anime Genres
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-muted-foreground">
                      <div>
                        <h3 className="text-purple-300 font-semibold mb-2">
                          Action
                        </h3>
                        <ul className="space-y-1 text-sm">
                          <li>Attack on Titan</li>
                          <li>Fullmetal Alchemist: Brotherhood</li>
                          <li>Naruto</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-purple-300 font-semibold mb-2">
                          Adventure
                        </h3>
                        <ul className="space-y-1 text-sm">
                          <li>One Piece</li>
                          <li>Hunter x Hunter</li>
                          <li>Sword Art Online</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-purple-300 font-semibold mb-2">
                          Psychological
                        </h3>
                        <ul className="space-y-1 text-sm">
                          <li>Death Note</li>
                          <li>Psycho-Pass</li>
                          <li>Death Parade</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-purple-300 font-semibold mb-2">
                          Romance
                        </h3>
                        <ul className="space-y-1 text-sm">
                          <li>Your Name</li>
                          <li>Toradora!</li>
                          <li>Kimi ni Todoke</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-purple-300 font-semibold mb-2">
                          Slice of Life
                        </h3>
                        <ul className="space-y-1 text-sm">
                          <li>K-On!</li>
                          <li>A Silent Voice</li>
                          <li>March Comes in Like a Lion</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-purple-300 font-semibold mb-2">
                          Horror
                        </h3>
                        <ul className="space-y-1 text-sm">
                          <li>Tokyo Ghoul</li>
                          <li>Another</li>
                          <li>Parasyte</li>
                        </ul>
                      </div>
                    </div>
                  </section> */}

                  {/* HOW IT WORKS */}
                  {/* <section className="mb-24">
                    <div className="bg-background/60 rounded-2xl p-10 border border-border">
                      <h2 className="text-2xl font-semibold text-purple-400 mb-4">
                        How to Watch on Weeb
                      </h2>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        <li>Visit Weeb</li>
                        <li>Browse or search your anime</li>
                        <li>Click play and enjoy — no login required</li>
                      </ol>
                    </div>
                  </section> */}

                  {/* FOOTER */}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
