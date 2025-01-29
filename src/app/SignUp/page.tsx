import SignUpForm from "../../components/UserLogin/SignUpForm";
import "./SignUpPage.css";

export default function Home() {
  return (
    <main className="home-container">
      <div className="form-wrapper">
        <SignUpForm />
      </div>
    </main>
  );
}
