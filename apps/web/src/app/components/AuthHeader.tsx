import Image from "next/image";
import Link from "next/link";
import { z } from "zod";

const AuthHeader = ({ sx = "" }: { sx?: string }) => {
  return (
    <div className={sx}>
      <Link href="/anime/home" className="block">
        <Image
          src="/logo-2-1_no-bg.png"
          alt="Otaku Guild"
          width={200}
          height={100}
        />
      </Link>
    </div>
  );
};

export default AuthHeader;
