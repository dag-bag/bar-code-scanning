import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { db } from "../../../firebase.config";
import { Ticket, Response } from "../../../types";
import { collection, doc, setDoc, writeBatch } from "firebase/firestore";

function generateFirestoreDocumentId() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let documentId = "";

  for (let i = 0; i < 5; i++) {
    // You can adjust the length of the document ID here
    const randomIndex = Math.floor(Math.random() * charactersLength);
    documentId += characters.charAt(randomIndex);
  }

  return documentId;
}

function generateArray(num: number): number[] {
  return Array.from(
    { length: num },
    (_, i) => generateFirestoreDocumentId() as any
  );
}

export async function POST(request: Request) {
  const body = await request.json();
  const ticketIds = generateArray(body.tickets);
  const batch = writeBatch(db);

  ticketIds.forEach(async (id) => {
    const nycRef = doc(db, "tickets", id as any);
    batch.set(nycRef, {
      id,
      isExpired: false,
    });
  });

  const tickedUrls = ticketIds.map(
    (id) => `https://bar-code-kappa.vercel.app/ticket/${id}`
  );

  batch.commit();

  return NextResponse.json({
    tickets: tickedUrls,
    phone: body.phone,
  });
}
