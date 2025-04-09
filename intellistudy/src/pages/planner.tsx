import { useEffect, useState } from "react";
import { auth, User as FirebaseUser } from "../lib/firebase";
import { useRouter } from "next/router";

export default function Study() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
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
    <div>
      <h1>Study Page</h1>
      {user ? <p>Welcome, {user.email}!</p> : <p>Loading...</p>}
    </div>
  );
}
