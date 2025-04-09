import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal"; // New modal component
import styles from "../styles/Home.module.css";

export default function Home() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState<"login" | "signup">("login");

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to IntelliStudy!</h1>
        <p>Smarter studying, powered by AI.</p>

        {/* Login and Signup Buttons */}
        <div className={styles.buttonContainer}>
  <button
    className="button"
    onClick={() => {
      setAuthType("login");
      setAuthModalOpen(true);
    }}
  >
    Login
  </button>
  <button
    className="signupButton"
    onClick={() => {
      setAuthType("signup");
      setAuthModalOpen(true);
    }}
  >
    Sign Up
  </button>
</div>

      </main>

      {/* Authentication Modal */}
      {isAuthModalOpen && (
        <AuthModal
          authType={authType}
          onClose={() => setAuthModalOpen(false)}
        />
      )}

      <Footer />
    </>
  );
}
