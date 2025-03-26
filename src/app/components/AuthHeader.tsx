import Image from "next/image";
import Link from "next/link";
import { z } from "zod";

const AuthHeader = ({ sx = "" }: { sx?: string }) => {
  return (
    <div className={sx}>
      <Link href="/anime/home" className="w-20 block">
        <Image
          src="/new-logo-2.png"
          alt="Otaku Guild"
          width={100}
          height={100}
        />
      </Link>
    </div>
  );
};

export default AuthHeader;
