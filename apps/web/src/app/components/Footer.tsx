import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="h-40 bg-[hsl(20,14.3%,6%)] text-[hsl(60,9.1%,97.8%)]">
      <div className="text-center text-sm text-muted-foreground flex items-center justify-center flex-col h-full gap-2">
        <p>&copy; {new Date().getFullYear()} Weebefied. All rights reserved.</p>
        <p>
          Made with ❤️ by{" "}
          <a
            className="font-logoFont"
            href="https://anirudhapradhan.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anirudha D. Pradhan
          </a>
        </p>
        <section className="text-center  flex items-center justify-center gap-1 mx-2">
          <Link href="https://www.facebook.com/profile.php?id=100088316115685">
            <Image
              src="/meta.svg"
              height={30}
              width={30}
              alt="Meta"
              className="object-contain"
            />
          </Link>
          <Link href="https://github.com/Anirudha0702">
            <Image
              src="/github.svg"
              height={30}
              width={30}
              alt="Github"
              className="object-contain"
            />
          </Link>
          <Link href="https://linkedin.com/in/anirudha-pradhan-346388240">
            <Image
              src="/linkedin.svg"
              height={30}
              width={30}
              alt="Linked In"
              className="object-contain"
            />
          </Link>
          <Link href="https://x.com/Anirudh68131423">
            <Image
              src="/x.svg"
              height={30}
              width={30}
              alt="X"
              className="object-contain"
            />
          </Link>
        </section>
      </div>
    </footer>
  );
}
