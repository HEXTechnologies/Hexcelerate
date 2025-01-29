import SignUpForm from "../../components/UserLogin/SignUpForm";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <SignUpForm />
      </div>
    </main>
  );
}
