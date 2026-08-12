import AuthGate from "@/components/AuthGate";
import { ToastProvider } from "@/components/ToastProvider";

export default function Home() {
  return <ToastProvider><AuthGate demoEmail={process.env.DEMO_EMAIL ?? ""} demoPassword={process.env.DEMO_PASSWORD ?? ""}/></ToastProvider>;
}
