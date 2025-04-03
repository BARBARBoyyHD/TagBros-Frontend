import React from "react";
import { useAuth, SignInButton } from "@clerk/clerk-react";

export default function UserLogin() {
  const { isSignedIn } = useAuth();

  return (
    <div>
      {isSignedIn ? (
        <div>You are signed in.</div>
      ) : (
        <SignInButton forceRedirectUrl={"/pages/ig/generator"} signUpForceRedirectUrl={"/pages/ig/generator"}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign In
          </button>
        </SignInButton>
      )}
    </div>
  );
}
