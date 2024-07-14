import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <h1 className='text-3xl text-white underline'>Home</h1>
      <Button>Click me</Button>
      <Image src='/assets/icons/logo-full.svg' height=></Image>
    </div>
  );
}
