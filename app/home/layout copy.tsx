"use client";

import { useState } from "react";
import IntroSplash from "@/components/utils/intro-splash";
import Banner from "./components/banner";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);



  return (
    <>{
      <main className="flex flex-col">
      <section className="w-full">
        {/* <Banner /> */}
      </section>

      {children}
    </main>
    }
      {/* {!ready && <IntroSplash onFinish={() => setReady(true)} />}
      {ready && children} */}
    </>
  );
}
