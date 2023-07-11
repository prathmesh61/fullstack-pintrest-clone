"use client";

import Image from "next/image";
import PinList from "./components/Pin/PinList";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from "firebase/firestore";

import app from "@/Database/firebase";
import { useEffect, useState } from "react";

export default function Home() {
  const [pinList, setPinList] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    getAllPins();
  }, []);
  const getAllPins = async () => {
    setPinList([]);
    const q = query(collection(db, "pinterest-post"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      setPinList((listOfPins) => [...listOfPins, doc.data()]);
    });
  };
  return (
    <main>
      <PinList pinList={pinList} />
    </main>
  );
}
