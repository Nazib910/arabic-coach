import AuthGate from "@/components/AuthGate";
import { ToastProvider } from "@/components/ToastProvider";

export default function Home() {
  return <ToastProvider><AuthGate/></ToastProvider>;
}
