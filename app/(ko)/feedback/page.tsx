import type { Metadata } from "next";
import { FeedbackPage } from "@/components/pages/feedback-page";
import { ui } from "@/data/site";

export const metadata: Metadata = { title: ui.feedback.title.ko };

export default function Page() {
  return <FeedbackPage lang="ko" />;
}
