'use client';

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login/page";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <div>
      {/* <main className="mt-0"> */}
        {/* <div className="flex z-10 w-full max-w-5xl items-center justify-between font-mono text-smx"> */}
        {/* <Login />  flex min-h-screen flex-col items-center justify-between p-24*/}
        <Login />
        {/* <button onClick={() => router.push('/sfdsdf')}>check</button> */}
       
    </div>
  );
}

