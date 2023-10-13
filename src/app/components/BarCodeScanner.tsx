import React, { useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { db } from "../../../firebase.config";
import { doc, updateDoc, getDoc } from "firebase/firestore";

const messages = {
  alredy_expired: "This Ticket is already scanned",
  current_expired: "Scanned perfactly!",
  not_generated: "This Ticket is not generated",
};

const QRCodeScanner = () => {
  const [message, setMessage] = useState<
    "alredy_expired" | "current_expired" | "not_generated" | null
  >(null);

  const [status, setStatus] = useState<"loading" | "open" | "close">("close");
  const handleDecode = async (id: any) => {
    const docRef = doc(db, "tickets", `${id}`);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    if (docSnap.exists()) {
      if (docSnap.data().isExpired) {
        setMessage("alredy_expired");
      } else {
        await updateDoc(docRef, { isExpired: true }).then(() => {
          setMessage("current_expired");
        });
      }
    } else {
      setMessage("not_generated");
    }
  };

  return (
    <>
      {message !== null && (
        <div
          className={`p-5 max-w-[350px] w-[350px] rounded-lg border-2  ${
            message == "current_expired"
              ? "border-green-300 bg-green-100"
              : "border-red-300 bg-red-100"
          }`}
        >
          <p className="uppercase tracking-wider font-medium text-sm mb-1">
            ALEART
          </p>
          <h5 className="text-xl font-bold mb-2">{messages[message]}</h5>
          <button
            onClick={() => {
              setMessage(null);
            }}
            className="px-10 py-3 bg-black text-white rounded-xl text-md  tracking-wider font-semibold w-full"
          >
            Close
          </button>
        </div>
      )}

      {status === "open" && message == null && (
        <QrScanner
          onDecode={handleDecode}
          onError={(error: any) => console.log(error?.message)}
        />
      )}

      {status == "close" && (
        <div>
          <div className="flex items-center  rounded-xl mb-2">
            <img src="/logo.png" alt="" className="w-[80px]" />
            <p className="font-medium">
              Developed by <br /> <b>Sasahyog Technologies</b>
            </p>
          </div>
          <button
            onClick={() => {
              setStatus("open");
            }}
            className="bg-indigo-500 text-white font-bold px-20 py-3 text-xl rounded-lg"
          >
            Start Scanning
          </button>
        </div>
      )}
    </>
  );
};

export default QRCodeScanner;
