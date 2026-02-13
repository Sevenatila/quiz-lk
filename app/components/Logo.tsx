import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <Image
        src="/img/logo.webp"
        alt="Lucas Krausche"
        width={50}
        height={50}
        priority
      />
    </div>
  );
}
