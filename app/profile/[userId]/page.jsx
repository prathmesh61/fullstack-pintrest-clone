"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import man from "../../../public/man.png";
import Image from "next/image";
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "@/Database/firebase";
import { useEffect, useState } from "react";
import PinList from "@/app/components/Pin/PinList";
import { useParams } from "next/navigation";
const Profile = () => {
  const params = useParams();
  // console.log(params.userId.replace("%40", "@"));
  const router = useRouter();
  const [pinList, setPinList] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const { data, status } = useSession();
  const signOutClick = () => {
    signOut();
    router.push("/");
  };
  const db = getFirestore(app);

  useEffect(() => {
    // console.log(params.userId.replace("%40", "@"));

    setUserInfo(params.userId.replace("%40", "@"));
  }, [params]);

  useEffect(() => {
    getUserPins();
  }, []);
  const getUserPins = async () => {
    setPinList([]);

    const q = query(
      collection(db, "pinterest-post"),
      where("email", "==", params.userId.replace("%40", "@"))
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setPinList((listOfPins) => [...listOfPins, doc.data()]);
      // console.log(setPinList);
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-6">
        <div className="flex flex-col items-center justify-center ">
          {data?.user.image ? (
            <Image
              src={data?.user.image}
              alt="user"
              width={100}
              height={100}
              className="rounded-full object-contain"
            />
          ) : (
            <Image
              src={man}
              alt="user"
              width={100}
              height={100}
              className="rounded-full object-contain"
            />
          )}
          <h3 className="font-bold text-lg mt-2 mb-2">{data?.user.name}</h3>
          <h4 className="font-semibold mb-6 text-md">{data?.user.email}</h4>
        </div>
        {data?.user.name ? (
          <button
            onClick={() => signOutClick()}
            className="bg-black py-2 px-6 rounded-lg text-white cursor-pointer"
          >
            sign Out
          </button>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-black py-2 px-6 rounded-lg text-white cursor-pointer"
          >
            sign in with gooogle
          </button>
        )}
      </div>
      <PinList pinList={pinList} />
    </>
  );
};

export default Profile;
