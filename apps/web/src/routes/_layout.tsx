import Footer from "@/app/components/common/Footer";
import Navbar from "@/app/components/common/Navbar";
import Sidebar from "@/app/components/common/Sidebar";
import { Outlet, createFileRoute } from "@tanstack/react-router";

// export const Route = createFileRoute("/_layout")({
//   component: () => (
//     <div className="h-dvh overflow-hidden">
//       <Navbar />
//       <div
//         className="
//         h-[calc(100dvh-4rem)]
//   grid
//   lg:grid-cols-[20rem_1fr]
//   xl:grid-cols-[20rem_1fr_20rem]
// "
//       >
//         <Sidebar className="hidden lg:block h-[calc(100svh-4rem)] bg-muted/20" />

//         <div className="flex flex-col min-w-0 min-h-[calc(100svh-4rem)] max-w-7xl overflow-y-auto">
//           <main className="flex-1 p-2">
//             <Outlet />
//           </main>
//           <Footer />
//         </div>

//         <div className="hidden xl:block h-[calc(100svh-4rem)] shrink-0 bg-muted/20"></div>
//       </div>
//     </div>
//   ),
// });
export const Route = createFileRoute("/_layout")({
  component: () => (
    <div className="min-h-dvh">
      <Navbar />

      <div
        className="
          grid
          lg:grid-cols-[20rem_1fr]
          xl:grid-cols-[20rem_1fr_20rem]
        "
      >
        {/* LEFT SIDEBAR */}
        <Sidebar className="hidden lg:block bg-muted/20 sticky top-0 h-dvh  pt-16" />

        {/* MIDDLE CONTENT (WINDOW SCROLLS THIS) */}
        <div className="min-w-0 max-w-7xl ">
          <main className="p-2">
            <Outlet />
          </main>
          <Footer />
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="hidden xl:block bg-muted/20 sticky top-0 h-dvh" />
      </div>
    </div>
  ),
});
