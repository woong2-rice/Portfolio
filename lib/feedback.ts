// 피드백 저장소: 여행 기록장과 같은 Supabase 프로젝트의 feedback 표.
// 아래 키는 브라우저에 공개되는 publishable 키라 코드에 있어도 괜찮아요.
// 표는 '쓰기만 가능, 읽기는 대시보드에서만' 규칙으로 만들어요(supabase/feedback.sql).
export const FEEDBACK = {
  url: "https://vqmdcyoldsosvonlagdv.supabase.co",
  key: "sb_publishable_Q5LoKBKG0YtgZivMORFTsQ_jXfF_0pB",
};

export const feedbackApps = ["launchpad", "travel-log", "langsplit", "unse-jumak", "diamond", "same-age"] as const;
export type FeedbackApp = (typeof feedbackApps)[number];
export const feedbackKinds = ["bug", "idea", "praise", "other"] as const;
export type FeedbackKind = (typeof feedbackKinds)[number];

export async function sendFeedback(row: {
  app: FeedbackApp;
  kind: FeedbackKind;
  message: string;
  contact?: string;
  lang?: string;
  page?: string;
}) {
  const res = await fetch(`${FEEDBACK.url}/rest/v1/feedback`, {
    method: "POST",
    headers: {
      apikey: FEEDBACK.key,
      Authorization: `Bearer ${FEEDBACK.key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ ...row, contact: row.contact || null }),
  });
  if (!res.ok) throw new Error(`feedback ${res.status}`);
}
