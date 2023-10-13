import { NextResponse } from "next/server";
import { db } from "../../../../firebase.config";
import { doc, updateDoc, getDoc } from "firebase/firestore";
export async function POST(request: Request) {
  const { id } = await request.json();
  const docRef = doc(db, "tickets", `${id}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    if (docSnap.data().isExpired) {
      return NextResponse.json({ status: "alredy_expired" });
    }
  }

  return await updateDoc(docRef, {
    isExpired: true,
  })
    .then(() => {
      return NextResponse.json({ status: "current_expired" });
    })
    .catch((err) => {
      return NextResponse.json({ status: "not_generated" });
    });
}
