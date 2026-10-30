import { lineScore, modules, standings } from "@/data/diamond";

// 다이아몬드 엔진이 실제로 낸 결과를 그 앱의 화면 조각처럼 그린 것 (data-ui: 앱 자체의 표 규칙을 씀).
// 크기는 감싼 틀의 너비(cqw)에 맞춰 줄고 늘어납니다.

const shell = "h-full w-full bg-[#0b1324] text-[#eef1f6] [container-type:inline-size] font-sans";

export function DiamondLineScore() {
  const rows = [lineScore.away, lineScore.home];
  return (
    <div data-ui className={shell}>
      <div className="flex items-center justify-between bg-[#1d3461] px-[3cqw] py-[1.6cqw] text-[2cqw] font-semibold">
        <span>다이아몬드</span>
        <span className="opacity-80">2026 시즌 개막전, 사직</span>
      </div>
      <div className="px-[3cqw] pt-[3cqw]">
        <p className="text-[2.2cqw] opacity-75">경기 종료</p>
        <p className="text-[4.4cqw] font-bold leading-tight tracking-tight">
          수원 5 : 4 부산, 9회 초 4득점으로 뒤집다
        </p>
      </div>
      <table className="mx-[3cqw] mt-[3cqw] w-[calc(100%-6cqw)] border-collapse text-[2.3cqw] tabular-nums">
        <thead>
          <tr className="text-[#f3cd6a]">
            <th className="py-[1cqw] text-left font-medium">팀</th>
            {lineScore.innings.map((i) => (
              <th key={i} className="w-[5.2cqw] py-[1cqw] font-medium">
                {i}
              </th>
            ))}
            <th className="w-[5.2cqw] font-semibold">R</th>
            <th className="w-[5.2cqw] font-medium">H</th>
            <th className="w-[5.2cqw] font-medium">E</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.team} className="border-t border-[#24314d]" /* taste-skill-ignore: real table */>
              <td className="py-[1.3cqw] font-semibold">{r.team}</td>
              {r.runs.map((x, i) => (
                <td key={i} className={`text-center ${x > 0 ? "font-bold text-[#f3cd6a]" : "opacity-70"}`}>
                  {x}
                </td>
              ))}
              <td className="text-center text-[2.8cqw] font-bold">{r.r}</td>
              <td className="text-center">{r.h}</td>
              <td className="text-center">{r.e}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="mx-[3cqw] mt-[3cqw] space-y-[0.8cqw] text-[2.2cqw] opacity-90">
        {lineScore.log.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </div>
  );
}

export function DiamondStandings() {
  return (
    <div data-ui className={shell}>
      <div className="flex items-center justify-between bg-[#1d3461] px-[4cqw] py-[2.4cqw] text-[3.4cqw] font-semibold">
        <span>시즌 최종 순위</span>
        <span className="opacity-80">144경기</span>
      </div>
      <table className="mx-[4cqw] mt-[2cqw] w-[calc(100%-8cqw)] border-collapse text-[3.6cqw] tabular-nums">
        <thead>
          <tr className="text-[#f3cd6a]">
            <th className="py-[1.4cqw] text-left font-medium">순위</th>
            <th className="text-left font-medium">팀</th>
            <th className="font-medium">승</th>
            <th className="font-medium">패</th>
            <th className="font-medium">무</th>
            <th className="font-medium">차</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((s) => (
            <tr key={s.team} className="border-t border-[#24314d]" /* taste-skill-ignore: real table */>
              <td className="py-[1.5cqw]">{s.rank}</td>
              <td className="font-semibold">{s.team}</td>
              <td className="text-center">{s.w}</td>
              <td className="text-center">{s.l}</td>
              <td className="text-center">{s.t}</td>
              <td className="text-center opacity-80">{s.gb}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DiamondModules() {
  return (
    <div data-ui className={shell}>
      <div className="bg-[#1d3461] px-[4cqw] py-[2.4cqw] text-[3.4cqw] font-semibold">구단 운영</div>
      <ul className="px-[4cqw] pt-[2cqw]">
        {modules.map((m) => (
          <li key={m.name} className="py-[2.4cqw]">
            <p className="text-[4.6cqw] font-bold text-[#f3cd6a]">{m.name}</p>
            <p className="text-[3.6cqw] opacity-90">{m.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
