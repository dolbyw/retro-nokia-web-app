import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useLanguage } from "../hooks/useLanguage";

// Empty component
export default function Empty() {
  const { t } = useLanguage();
  
  return (
    <div className={cn("flex h-full items-center justify-center")} onClick={() => toast(t.comingSoon)}>{t.empty}</div>
  );
}