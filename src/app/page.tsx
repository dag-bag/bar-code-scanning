"use client";
import QRCodeScanner from "./components/BarCodeScanner";
export default function Home() {
  return (
    <div className=" h-screen w-full max-w-md m-auto flex items-center justify-center">
      <QRCodeScanner />
    </div>
  );
}
