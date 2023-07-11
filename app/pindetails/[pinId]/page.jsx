"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "@/Database/firebase";
import Image from "next/image";
import Link from "next/link";

const PinDetails = ({ params }) => {
  //   const params = useParams();
  const router = useRouter();
  const db = getFirestore(app);
  const [pinDetail, setPinDetail] = useState([]);
  useEffect(() => {
    getPinDetail();
  }, []);
  const getPinDetail = async () => {
    const q = query(
      collection(db, "pinterest-post"),
      where("id", "==", params.pinId)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setPinDetail(doc.data());
    });
  };

  console.log(params.pinId);
  return (
    <div>
      {pinDetail ? (
        <div className=" bg-white p-3 md:p-12 rounded-2xl md:px-24 lg:px-36">
          <div
            className="grid grid-cols-1 lg:grid-cols-2 md:gap-10 shadow-lg
      rounded-2xl p-3 md:p-7 lg:p-12 xl:pd-16 "
          >
            <Image
              src={pinDetail?.image}
              width={300}
              height={300}
              alt={pinDetail.title}
              className="rounded-2xl"
            />
            <div className="flex flex-col gap-2 justify-center items-start">
              <h1 className="text-2xl font-bold">{pinDetail.title}</h1>
              <p className="text-sm">{pinDetail.desc}</p>
              <p className="text-sm">{pinDetail.date}</p>
              <Link
                href={`${pinDetail.link}`}
                className="bg-blue-500 px-4 py-1 text-white rounded-md cursor-pointer w-fit"
              >
                Go To Website
              </Link>
              <div
                className="flex gap-4 mt-4"
                onClick={() => router.push(`/profile/${pinDetail.email}`)}
              >
                <Image
                  src={pinDetail.userImage}
                  width={50}
                  height={50}
                  alt="imageUser"
                  className="rounded-full"
                />
                <div className="flex flex-col gap-1 ">
                  <p className="text-sm font-bold">{pinDetail.userName}</p>
                  <p className="text-sm font-light">{pinDetail.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PinDetails;
