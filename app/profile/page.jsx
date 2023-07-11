// "use client";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import man from "../../public/man.png";
// import Image from "next/image";
// import {
//   Firestore,
//   collection,
//   getDocs,
//   getFirestore,
//   query,
//   where,
// } from "firebase/firestore";
// import app from "@/Database/firebase";
// import { useEffect, useState } from "react";
// import PinList from "../components/Pin/PinList";
// const Profile = () => {
//   const router = useRouter();
//   const [pinList, setPinList] = useState([]);

//   const { data, status } = useSession();
//   const signOutClick = () => {
//     signOut();
//     router.push("/");
//   };
//   const db = getFirestore(app);
//   useEffect(() => {
//     getUserPins();
//   }, []);
//   const getUserPins = async () => {
//     setPinList([]);

//     const q = query(collection(db, "pinterest-post"));

//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//       setPinList((listOfPins) => [...listOfPins, doc.data()]);
//     });
//   };

//   return (
//     <div className="flex flex-col items-center justify-center mt-6">
//       <div className="flex flex-col items-center justify-center ">
//         {data?.user.image ? (
//           <Image
//             src={data?.user.image}
//             alt="user"
//             width={100}
//             height={100}
//             className="rounded-full object-contain"
//           />
//         ) : (
//           <Image
//             src={man}
//             alt="user"
//             width={100}
//             height={100}
//             className="rounded-full object-contain"
//           />
//         )}
//         <h3 className="font-bold text-lg mt-2 mb-2">{data?.user.name}</h3>
//         <h4 className="font-semibold mb-6 text-md">{data?.user.email}</h4>
//       </div>
//       {data?.user.name ? (
//         <button
//           onClick={() => signOutClick()}
//           className="bg-black py-2 px-6 rounded-lg text-white cursor-pointer"
//         >
//           sign Out
//         </button>
//       ) : (
//         <button
//           onClick={() => signIn()}
//           className="bg-black py-2 px-6 rounded-lg text-white cursor-pointer"
//         >
//           sign in with gooogle
//         </button>
//       )}
//       <PinList pinList={pinList} />
//     </div>
//   );
// };

// export default Profile;
