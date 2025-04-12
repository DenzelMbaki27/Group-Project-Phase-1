import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { auth } from "../lib/firebase";
import { useRouter } from "next/router";
import StudyPlanner from "../components/TaskList";
import { User } from "firebase/auth";

export default function Study() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/");
      } else {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <><Navbar /><div style={{ padding: "2rem" }}>
      <h1>Study Page</h1>
      {user ? (
        <>
          <p>Welcome, {user.email}!</p>
          <StudyPlanner user={user} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div><Footer /></>
  );
}
