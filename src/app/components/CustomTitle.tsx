import Head from 'next/head'
import {Cinzel_Decorative } from "next/font/google";

export const cinzel = Cinzel_Decorative({
    variable: '--font-cinzel',
    subsets: ['latin'],
    weight: ['400', '700'],
    display: 'swap', 
  });
function CustomTitle({title}:{title:string}) {
  return (
      <Head >
        <title>{title}</title>
      </Head>
  )
}
 
export default CustomTitle