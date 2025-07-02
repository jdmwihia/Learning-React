import React, { useRef, useState } from "react";

// --- Login Form ---
const LoginForm = ({ onSubmit }: { onSubmit: (identifier: string, password: string) => void }) => {
  const identifierRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const identifier = identifierRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    onSubmit(identifier, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="identifier" type="text" placeholder="Username or Email" ref={identifierRef} required />
      <input name="password" type="password" placeholder="Password" ref={passwordRef} required />
      <button type="submit">Log In</button>
    </form>
  );
};

// --- Sign Up Form ---
const SignUpForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const password1Ref = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      first_name: firstNameRef.current?.value || "",
      last_name: lastNameRef.current?.value || "",
      email: emailRef.current?.value || "",
      password1: password1Ref.current?.value || "",
      password2: password2Ref.current?.value || "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input name="first_name" type="text" placeholder="First Name" ref={firstNameRef} required />
      <input name="last_name" type="text" placeholder="Surname" ref={lastNameRef} required />
      <input name="email" type="email" placeholder="Email" ref={emailRef} required />
      <input name="password1" type="password" placeholder="Set Password" ref={password1Ref} required />
      <input name="password2" type="password" placeholder="Retype Password" ref={password2Ref} required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

// --- Modal ---
const Modal = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => (
  <div className="ModalOverlay">
    <div className="ModalContent">
      <button className="ModalClose" onClick={onClose}>×</button>
      {children}
    </div>
  </div>
);

// --- Header Component ---
function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleLoginSubmit = async (identifier: string, password: string) => {
    try {
      const res = await fetch("http://localhost:8000/api/Accounts/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Login successful!");
        setShowLogin(false);
      } else {
        alert("Login failed: " + JSON.stringify(data));
      }
    } catch (err) {
      alert("Login error. Try again.");
    }
  };

  const handleSignUpSubmit = async (data: any) => {
    try {
      const res = await fetch("http://localhost:8000/api/Accounts/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok) {
        alert("Account created successfully!");
        setShowSignUp(false);
      } else {
        alert("Signup failed: " + JSON.stringify(json));
      }
    } catch (err) {
      alert("Signup error. Try again.");
    }
  };

  return (
    <>
      <header className="Header">
        <h1 className="Project">MoveSmart KE</h1>
        <nav className="NavBar">
          <ul className="NavLinks">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
          <div className="AuthButtons">
            <a href="#" className="LoginBtn" onClick={() => setShowLogin(true)}>Login</a>
            <a href="#" className="SignUpBtn" onClick={() => setShowSignUp(true)}>Sign Up</a>
          </div>
        </nav>
      </header>

      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <LoginForm onSubmit={handleLoginSubmit} />
        </Modal>
      )}

      {showSignUp && (
        <Modal onClose={() => setShowSignUp(false)}>
          <SignUpForm onSubmit={handleSignUpSubmit} />
        </Modal>
      )}
    </>
  );
}

export default Header;
