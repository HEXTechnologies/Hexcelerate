import SignInForm from "../../components/UserLogin/SignInForm";
import "./SignUpPage.css";

export default function Home() {
  return (
    <main className="home-container">
      <div className="form-wrapper">
        <SignInForm />
      </div>
    </main>
  );
}
