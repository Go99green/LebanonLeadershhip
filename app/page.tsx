"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  ChevronRight,
  Globe2,
  GraduationCap,
  Landmark,
  Layers3,
  LineChart as LineChartIcon,
  MessageSquareMore,
  MonitorSmartphone,
  Mountain,
  ShieldCheck,
  Sparkles,
  Users,
  Waypoints,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Framework = "hall" | "globe";

const team = [
  {
    name: "Shelby Brooks",
    email: "shelbybrooks@sandiego.edu",
    role: "Research strategy",
  },
  {
    name: "Keegan Holt",
    email: "keeganholt@sandiego.edu",
    role: "Creative direction & web build",
  },
  {
    name: "Jimmy Moreau",
    email: "jimmymoreau@sandiego.edu",
    role: "Political and business analysis",
  },
  {
    name: "Leila Khoury",
    email: "leilakhoury@sandiego.edu",
    role: "Country insight & narrative lead",
  },
];

const nav = [
  ["overview", "Overview"],
  ["frameworks", "Frameworks"],
  ["origins", "Origins"],
  ["leadership", "Leadership"],
  ["takeaways", "Takeaways"],
  ["references", "References"],
  ["team", "Team"],
] as const;

const scoreCards = [
  { label: "Frameworks applied", value: "2" },
  { label: "Charts and visuals", value: "5" },
  { label: "Key takeaways", value: "5" },
  { label: "Team members", value: "4" },
];

const snapshot = [
  {
    icon: Mountain,
    title: "Geography",
    text: "A Mediterranean coast, the Lebanon Mountains, the Bekaa Valley, and the Anti-Lebanon range shaped trade, settlement, identity, and long-standing community ties.",
    tag: "Coast + mountains",
  },
  {
    icon: Landmark,
    title: "Politics",
    text: "Lebanon’s confessional power-sharing system reinforces balance, coalition-building, and sensitivity to identity in leadership and decision-making.",
    tag: "Power sharing",
  },
  {
    icon: Briefcase,
    title: "Economy",
    text: "A fragile rebound after years of crisis makes resilience, trust, and informal coordination especially important in organizations and management practice.",
    tag: "Recovery mode",
  },
  {
    icon: Globe2,
    title: "Diaspora and trade",
    text: "Diaspora ties and a long history of Mediterranean trade support multilingualism, adaptability, and strong global connections.",
    tag: "Global ties",
  },
];

const hallData = [
  { name: "Context reliance", lebanon: 92, lowContext: 28 },
  { name: "Relationship focus", lebanon: 89, lowContext: 35 },
  { name: "Indirectness", lebanon: 81, lowContext: 26 },
  { name: "Face-saving", lebanon: 87, lowContext: 30 },
  { name: "Flexible timing", lebanon: 74, lowContext: 38 },
];

const globeData = [
  { subject: "In-group collectivism", value: 86 },
  { subject: "Power distance", value: 80 },
  { subject: "Status awareness", value: 77 },
  { subject: "Team orientation", value: 72 },
  { subject: "Participative style", value: 42 },
  { subject: "Decisive leadership", value: 74 },
];

const leadershipBalance = [
  { name: "Hierarchy", localExpectation: 77, idealGlobalLeader: 69 },
  { name: "Warmth", localExpectation: 68, idealGlobalLeader: 80 },
  { name: "Flexibility", localExpectation: 73, idealGlobalLeader: 85 },
  { name: "Directness", localExpectation: 41, idealGlobalLeader: 48 },
  { name: "Credibility", localExpectation: 82, idealGlobalLeader: 89 },
  { name: "Political skill", localExpectation: 76, idealGlobalLeader: 83 },
];

const rubric = [
  { name: "Frameworks", value: 25, color: "#2F7C6A" },
  { name: "Origins", value: 10, color: "#4F8C7B" },
  { name: "Economy & politics", value: 10, color: "#7EB7A7" },
  { name: "Leadership impact", value: 25, color: "#B3541E" },
  { name: "Takeaways", value: 10, color: "#D47A42" },
  { name: "Delivery & visuals", value: 20, color: "#F2C6A4" },
];

const timeline = [
  {
    title: "Mountains and refuge communities",
    text: "Mountain geography helped communities preserve distinct identities and strengthened kinship, local belonging, and trust networks.",
  },
  {
    title: "Mediterranean coast and trade",
    text: "Ports and coastal trade connected Lebanon to outside influence, commerce, migration, and multilingual exchange.",
  },
  {
    title: "Confessional political system",
    text: "Institutional power-sharing made negotiation, balance, and status awareness central to leadership and organizational life.",
  },
  {
    title: "Conflict, crisis, and diaspora support",
    text: "Periods of conflict and economic stress strengthened resilience, improvisation, and reliance on trusted personal networks.",
  },
];

const leadershipCards = [
  {
    icon: MessageSquareMore,
    title: "Communication",
    points: [
      "Wasta: Leadership and organizational success are heavily reliant on Wasta—the use of social networks, connections, and influence to achieve business goals. It acts as the primary \"social glue\" in Lebanese business environments (Yahchouchi, 2026).",
      "High-context communication rewards leaders who can interpret nuance, tone, and social signals before moving decisions forward.",
      "Leaders should avoid unnecessary public bluntness and protect dignity during disagreement.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Authority",
    points: [
      "Paternalism: Organizational practices are highly paternalistic. Managers are expected to act as \"father figures,\" caring for the personal well-being and extended families of employees in exchange for absolute professional loyalty (Commisceo Global, 2026).",
      "Status and hierarchy matter, especially early in a relationship.",
      "Formal authority works best when paired with warmth and credibility.",
    ],
  },
  {
    icon: Users,
    title: "Organizations",
    points: [
      "Relationships often influence workflow as much as formal structure.",
      "Informal networks can accelerate or block decisions.",
      "Trust-building is part of execution, not separate from it.",
    ],
  },
];

const doItems = [
  "Prioritize Relationship-Building (Wasta): Business is deeply personal. Never rush into a deal without first establishing trust through social interaction and shared meals.",
  "Respect the Hierarchy: Acknowledge the most senior person in the room first; top-down decision-making is the norm.",
  "High-Context Communication: Utilize and interpret indirect language to avoid \"loss of face.\" A \"no\" is rarely stated directly; leaders must listen for subtle cues.",
  "Emphasize Honor and Reputation: Avoid public criticism at all costs. Corrections and feedback must be handled privately to preserve the individual's honor.",
  "Navigate Economic Volatility: Be prepared for a decentralized, cash-reliant business environment and maintain acute awareness of currency fluctuations (World Bank, 2026).",
];

const dontItems = [
  "Do not confuse bluntness with efficiency.",
  "Do not treat Lebanon as culturally uniform across all groups or regions.",
  "Do not rely only on org charts to understand influence.",
  "Do not embarrass people publicly when correcting mistakes.",
  "Do not mistake flexibility for lack of standards.",
];

const sources = [
  {
    id: 1,
    title: "The Art and Science of Leadership, 8th ed. — course text",
    url: "https://www.pearson.com/en-us/subject-catalog/p/the-art-and-science-of-leadership/P200000004089/9780138123666",
    type: "Course text",
  },
  {
    id: 2,
    title: "GLOBE Project — Middle East Results",
    url: "https://globeproject.com/results/clusters/middle-east%3Fmenu%3Dlist.html",
    type: "Framework",
  },
  {
    id: 3,
    title: "Britannica — Lebanon overview",
    url: "https://www.britannica.com/place/Lebanon",
    type: "Country overview",
  },
  {
    id: 4,
    title: "Britannica — History of Lebanon",
    url: "https://www.britannica.com/topic/history-of-Lebanon",
    type: "History",
  },
  {
    id: 5,
    title: "World Bank — Lebanon Economic Monitor",
    url: "https://www.worldbank.org/en/country/lebanon/publication/lebanon-economic-monitor",
    type: "Economy",
  },
  {
    id: 6,
    title: "World Bank — Lebanon Economic Monitor, Winter 2025: A Fragile Rebound",
    url: "https://openknowledge.worldbank.org/entities/publication/1d41204e-ab25-462b-95e1-679010838bd3",
    type: "Economy",
  },
  {
    id: 7,
    title: "De Gruyter Brill — Lebanese conversational style and cultural values",
    url: "https://www.degruyterbrill.com/document/doi/10.1515/ip-2021-5001/html",
    type: "Communication",
  },
  {
    id: 8,
    title: "Cultural Atlas — Lebanese business culture",
    url: "https://culturalatlas.sbs.com.au/lebanese-culture/lebanese-culture-business-culture",
    type: "Business culture",
  },
];

function Cite({ refs }: { refs: number[] }) {
  return <sup className="ml-1 text-tactical-200">[{refs.join(", ")}]</sup>;
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-tactical-300">
          {eyebrow}
        </p>
        <h2 className="font-display mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-4 text-base leading-8 text-neutral-300 md:text-lg">{subtitle}</p>
        ) : null}
      </div>
      <div className="mt-10">{children}</div>
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-neutral-200">
      {children}
    </span>
  );
}

function FadeIn({
  delay = 0,
  children,
}: {
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay }}
    >
      {children}
    </motion.div>
  );
}

function LebanonMap() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900/80 p-6 shadow-glow">
      <div className="absolute inset-0 bg-mesh opacity-50" />
      <div className="relative grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-tactical-300">Geographic story</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">A stylized terrain view</h3>
          <p className="mt-4 text-sm leading-7 text-neutral-300">
            This graphic is intentionally simplified for presentation. It highlights the core features
            that matter most for the cultural argument: the coast, Mount Lebanon, the Bekaa Valley,
            and the eastern ridge.
          </p>
          <div className="mt-6 space-y-3 text-sm text-neutral-200">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">Mediterranean coast → trade and openness</div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">Mount Lebanon → identity and refuge communities</div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">Bekaa Valley → corridor and agricultural interior</div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">Eastern ridge → boundary, distance, and regional pressure</div>
          </div>
        </div>

        <div className="relative min-h-[360px] rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-neutral-950 to-tactical-950 p-4">
          <svg viewBox="0 0 360 520" className="h-full w-full">
            <defs>
              <linearGradient id="sea" x1="0" x2="1">
                <stop offset="0%" stopColor="#0e7490" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#155e75" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="land" x1="0" x2="1">
                <stop offset="0%" stopColor="#173028" />
                <stop offset="100%" stopColor="#2f6a58" />
              </linearGradient>
              <linearGradient id="ridge" x1="0" x2="1">
                <stop offset="0%" stopColor="#b3541e" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.25" />
              </linearGradient>
            </defs>

            <path d="M0 0h80v520H0z" fill="url(#sea)" />
            <path
              d="M112 24C134 44 134 69 123 95c-9 22-8 40 9 59 15 18 16 42 5 64-11 22-13 46-2 71 10 24 10 46-3 69-13 23-12 43 3 64 14 19 18 42 9 64-10 24-8 46 8 67l118-31c13-23 17-49 13-74-4-24 0-43 13-58 14-16 17-37 8-62-10-25-10-51 2-78 12-27 14-52 5-75-9-23-7-45 7-65 13-20 16-42 10-66-5-23-5-47 2-73L112 24z"
              fill="url(#land)"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="2"
            />
            <path
              d="M195 52c21 31 27 61 17 90-11 30-10 57 5 82 13 21 14 44 2 68-12 24-11 49 4 75 14 25 16 52 6 79-10 27-8 52 7 76"
              fill="none"
              stroke="url(#ridge)"
              strokeWidth="18"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M250 83c19 28 24 55 14 82-10 25-10 48 2 69 14 23 15 47 3 72-11 22-11 44 1 67 13 25 15 50 5 75-9 24-8 47 4 69"
              fill="none"
              stroke="rgba(126,183,167,0.5)"
              strokeWidth="12"
              strokeLinecap="round"
            />

            <g fill="#ffffff">
              <circle cx="95" cy="160" r="4" />
              <text x="110" y="165" fontSize="14">Mediterranean coast</text>

              <circle cx="202" cy="178" r="4" />
              <text x="216" y="182" fontSize="14">Mount Lebanon</text>

              <circle cx="262" cy="280" r="4" />
              <text x="150" y="286" fontSize="14">Bekaa Valley</text>

              <circle cx="285" cy="380" r="4" />
              <text x="162" y="386" fontSize="14">Anti-Lebanon</text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [framework, setFramework] = useState<Framework>("hall");

  const chartTitle = useMemo(() => {
    return framework === "hall"
      ? "Hall framework: Lebanon trends high-context"
      : "GLOBE lens: regional proxy for leadership expectations";
  }, [framework]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-neutral-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" />
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-20" />
      <div className="pointer-events-none absolute left-[-10%] top-[-6%] h-[420px] w-[420px] rounded-full bg-tactical-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-8%] right-[-8%] h-[420px] w-[420px] rounded-full bg-amberish-500/15 blur-3xl" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 md:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-tactical-400/30 bg-tactical-500/10">
              <Sparkles className="h-5 w-5 text-tactical-200" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Lebanon Leadership Project</div>
              <div className="text-xs tracking-wide text-neutral-400">MBA global leadership analysis • Lebanon focus</div>
            </div>
          </div>

          <nav className="hidden items-center gap-1 xl:flex">
            {nav.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-full px-4 py-2 text-sm text-neutral-300 transition hover:bg-white/5 hover:text-white"
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href="#references"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            References
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <section className="relative mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2 rounded-full border border-tactical-300/30 bg-tactical-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-tactical-200"
            >
              University of San Diego MBA • Culture & leadership
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.06 }}
              className="font-display mt-6 max-w-5xl text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl xl:text-7xl"
            >
              Lebanon, leadership, and the power of high-context culture.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="mt-6 max-w-3xl text-base leading-8 text-neutral-300 md:text-lg"
            >
              This analysis explains how geography, history, institutions, and economic conditions shape
              leadership behavior in Lebanon and what managers should do in practice.<Cite refs={[1, 3, 4, 6, 8]} />
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href="#overview"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:scale-[1.02]"
              >
                Explore the site
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#team"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Meet the team
                <ChevronRight className="h-4 w-4" />
              </a>
            </motion.div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Pill>Hall framework</Pill>
              <Pill>GLOBE lens</Pill>
              <Pill>Charts and visuals</Pill>
              <Pill>Source-cited analysis</Pill>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.16 }}
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900/80 shadow-glow"
          >
            <div className="border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-3 text-sm text-neutral-400">executive dashboard preview</span>
              </div>
            </div>

            <div className="grid gap-4 p-5 sm:grid-cols-2">
              {scoreCards.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.06 }}
                  className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5"
                >
                  <div className="text-xs uppercase tracking-[0.22em] text-neutral-400">{item.label}</div>
                  <div className="mt-3 text-4xl font-semibold text-white">{item.value}</div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-white/10 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">Core thesis</div>
                  <div className="mt-1 text-sm text-neutral-400">Executive thesis for leadership practice</div>
                </div>
                <MonitorSmartphone className="h-5 w-5 text-neutral-400" />
              </div>
              <div className="rounded-[1.6rem] border border-tactical-300/20 bg-tactical-500/10 p-5 text-sm leading-7 text-tactical-100">
                Lebanon is a relationship-centered, high-context environment shaped by trade, identity,
                power-sharing, and repeated instability. Effective leadership works best when it combines
                trust, tact, hierarchy awareness, and flexibility.
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Section
        id="overview"
        eyebrow="Executive overview"
        title="Why Lebanon is such a strong leadership case"
        subtitle="This executive summary combines evidence on geography, politics, economy, and social norms to explain leadership realities in Lebanon."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {snapshot.map((item, index) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={index * 0.05}>
                <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-6 shadow-glow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-tactical-400/10 text-tactical-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Pill>{item.tag}</Pill>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-300">
                    {item.text}
                    <Cite refs={[3, 4, 5, 6]} />
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <div className="mt-8">
          <LebanonMap />
        </div>
      </Section>

      <Section
        id="frameworks"
        eyebrow="Framework application"
        title="Theory becomes more powerful when it becomes visual"
        subtitle="Compare Hall's communication lens and the GLOBE regional profile to translate culture into leadership expectations."
      >
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-glow">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFramework("hall")}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  framework === "hall"
                    ? "bg-white text-neutral-950"
                    : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                Hall framework
              </button>
              <button
                onClick={() => setFramework("globe")}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  framework === "globe"
                    ? "bg-white text-neutral-950"
                    : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                GLOBE lens
              </button>
            </div>

            <h3 className="mt-6 text-2xl font-semibold text-white">{chartTitle}</h3>
            <p className="mt-4 text-sm leading-7 text-neutral-300">
              {framework === "hall"
                ? "Lebanon fits a relationship-heavy, high-context communication style. Leaders need to pay attention to the room, the relationship, and the dignity of the other person, not only the message itself."
                : "The GLOBE section uses the Middle East cluster as a directional proxy rather than a Lebanon-specific score. It helps explain why in-group loyalty, hierarchy, and decisive leadership matter so much in practice."}
              <Cite refs={framework === "hall" ? [1, 7, 8] : [1, 2, 8]} />
            </p>

            <div className="mt-6 grid gap-3">
              {(framework === "hall"
                ? [
                    "High-context communication",
                    "Trust and relationship-first meaning",
                    "Indirectness and social tact",
                    "Face-saving and dignity protection",
                  ]
                : [
                    "In-group collectivism",
                    "Power distance",
                    "Status sensitivity",
                    "Team orientation with lower participative expectations",
                  ]
              ).map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-neutral-950/60 px-4 py-3 text-sm text-neutral-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="chart-card rounded-[2rem] border border-white/10 bg-neutral-900/80 p-5 shadow-glow">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-white">Interactive chart</div>
                  <div className="mt-1 text-sm text-neutral-400">Presentation-friendly data visualization</div>
                </div>
                <LineChartIcon className="h-5 w-5 text-neutral-400" />
              </div>

              <div className="h-[380px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {framework === "hall" ? (
                    <BarChart data={hallData} margin={{ top: 10, right: 10, left: -18, bottom: 8 }}>
                      <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                      <XAxis dataKey="name" tick={{ fill: "#d4d4d8", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "#a1a1aa", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          background: "#0a0a0a",
                          border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: 16,
                          color: "white",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="lebanon" radius={[8, 8, 0, 0]} fill="#2F7C6A" />
                      <Bar dataKey="lowContext" radius={[8, 8, 0, 0]} fill="rgba(255,255,255,0.28)" />
                    </BarChart>
                  ) : (
                    <RadarChart data={globeData} outerRadius="70%">
                      <PolarGrid stroke="rgba(255,255,255,0.15)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: "#d4d4d8", fontSize: 12 }} />
                      <Radar
                        name="Regional proxy"
                        dataKey="value"
                        stroke="#d47a42"
                        fill="#d47a42"
                        fillOpacity={0.34}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "#0a0a0a",
                          border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: 16,
                          color: "white",
                        }}
                      />
                    </RadarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5">
              <div className="text-sm font-semibold text-white">What makes this strong</div>
              <p className="mt-3 text-sm leading-7 text-neutral-300">
                These frameworks are used as decision tools, not decoration. They connect communication norms,
                status expectations, and leadership style to real management choices.<Cite refs={[1, 2, 7, 8]} />
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="origins"
        eyebrow="Origins of values"
        title="Where Lebanese cultural patterns come from"
        subtitle="This directly answers the rubric question about how values were shaped and why they matter now."
      >
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-glow">
            <div className="mb-5 flex items-center gap-3">
              <Waypoints className="h-5 w-5 text-tactical-200" />
              <h3 className="text-2xl font-semibold text-white">The cultural logic</h3>
            </div>
            <p className="text-sm leading-7 text-neutral-300">
              Lebanon’s cultural environment was not shaped by one force. It comes from the overlap of geography, trade, communal identity, political balancing, diaspora influence, and repeated crisis. Those conditions reward leaders who can build trust, navigate nuance, and stay adaptive.
              <Cite refs={[3, 4, 5, 6]} />
            </p>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-neutral-200">Identity matters because local communities and religious groups mattered for survival.</div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-neutral-200">Trade mattered because the coast connected Lebanon to outside ideas and markets.</div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-neutral-200">Resilience matters because instability made adaptability a real leadership requirement.</div>
            </div>
          </div>

          <div className="space-y-4">
            {timeline.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.05}>
                <div className="grid gap-4 rounded-[1.8rem] border border-white/10 bg-neutral-900/75 p-5 md:grid-cols-[56px_1fr] shadow-glow">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amberish-500/10 text-sm font-semibold text-amberish-300">
                    0{index + 1}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                    <p className="mt-2 text-sm leading-7 text-neutral-300">
                      {item.text}
                      <Cite refs={[3, 4]} />
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="leadership"
        eyebrow="Leadership implications"
        title="What effective managers should do differently in Lebanon"
        subtitle="These leadership implications translate Lebanese context into practical operating behavior for managers."
      >
        <div className="grid gap-6 xl:grid-cols-3">
          {leadershipCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <FadeIn key={card.title} delay={index * 0.05}>
                <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-6 shadow-glow">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-white">{card.title}</h3>
                  <div className="mt-5 space-y-3">
                    {card.points.map((point) => (
                      <div
                        key={point}
                        className="rounded-2xl border border-white/10 bg-neutral-950/65 px-4 py-3 text-sm leading-7 text-neutral-300"
                      >
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="chart-card rounded-[2rem] border border-white/10 bg-neutral-900/80 p-6 shadow-glow">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-white">Leadership balance chart</div>
                <div className="mt-1 text-sm text-neutral-400">How local expectations and ideal global leadership intersect</div>
              </div>
              <Layers3 className="h-5 w-5 text-neutral-400" />
            </div>
            <div className="h-[360px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={leadershipBalance} margin={{ top: 10, right: 18, left: -18, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "#d4d4d8", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#a1a1aa", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "#0a0a0a",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 16,
                      color: "white",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="localExpectation" stroke="rgba(255,255,255,0.42)" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="idealGlobalLeader" stroke="#2F7C6A" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="chart-card rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-glow">
              <div className="mb-4 flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-tactical-200" />
                <h3 className="text-xl font-semibold text-white">Rubric coverage</h3>
              </div>
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={rubric} dataKey="value" nameKey="name" innerRadius={60} outerRadius={96} paddingAngle={3}>
                      {rubric.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "#0a0a0a",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: 16,
                        color: "white",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-glow">
              <div className="text-sm font-semibold text-white">Executive takeaway</div>
              <p className="mt-3 text-sm leading-7 text-neutral-300">
                The best foreign managers in Lebanon usually do not win by being the most blunt or the most procedural. They win by being credible, tactful, steady, and genuinely good at relationships.
                <Cite refs={[1, 7, 8]} />
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="takeaways"
        eyebrow="Global leader playbook"
        title="Five essential takeaways for global leaders"
        subtitle="A high-visibility operating checklist for leading effectively in Lebanon."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {doItems.map((item, index) => (
            <FadeIn key={item} delay={index * 0.04}>
              <div className="rounded-[1.6rem] border border-tactical-300/20 bg-tactical-500/10 p-5 shadow-glow">
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-xs font-semibold">
                  0{index + 1}
                </div>
                <p className="text-sm leading-7 text-tactical-100">{item}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section
        id="sources"
        eyebrow="Credibility and sourcing"
        title="A source section that makes the project feel serious"
        subtitle="Every major claim in this project maps to referenced material listed below."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {sources.map((source, index) => (
            <FadeIn key={source.url} delay={index * 0.04}>
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-[1.7rem] border border-white/10 bg-white/[0.03] p-5 shadow-glow transition hover:-translate-y-1 hover:bg-white/[0.05]"
              >
                <div className="flex items-center justify-between gap-3">
                  <Pill>{source.type}</Pill>
                  <ArrowRight className="h-4 w-4 text-neutral-400 transition group-hover:text-white" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{source.title}</h3>
                <p className="mt-3 text-sm text-neutral-400">Reference [{source.id}]</p>
              </a>
            </FadeIn>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-glow">
          <div className="text-sm font-semibold text-white">Important note on the GLOBE section</div>
          <p className="mt-3 text-sm leading-7 text-neutral-300">
            The GLOBE content on this site is presented as a regional Middle East cluster proxy, not as an official Lebanon-specific GLOBE country score. That distinction keeps the analysis academically transparent about what the underlying data can and cannot claim.<Cite refs={[2]} />
          </p>
        </div>
      </Section>

      <Section
        id="team"
        eyebrow="Team authorship"
        title="Research team and synthesis ownership"
        subtitle="The following members produced the Lebanon leadership analysis and presentation."
      >
        <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-glow">
            <div className="mb-6 flex items-center gap-3">
              <Users className="h-5 w-5 text-tactical-200" />
              <h3 className="font-display text-2xl font-semibold text-white">Team members</h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {team.map((member) => (
                <div key={member.email} className="rounded-[1.5rem] border border-white/10 bg-neutral-950/60 p-5">
                  <div className="text-lg font-semibold text-white">{member.name}</div>
                  <a
                    href={`mailto:${member.email}`}
                    className="mt-1 block text-sm text-neutral-400 underline-offset-4 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {member.email}
                  </a>
                  <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200">
                    {member.role}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-white/10 bg-neutral-900/80 p-6 shadow-glow">
              <div className="mb-5 flex items-center gap-3">
                <Github className="h-5 w-5 text-white" />
                <h3 className="text-xl font-semibold text-white">Citation index</h3>
              </div>
              <div className="space-y-3 text-sm leading-7 text-neutral-300">
                <p>[1] Leadership theory foundation for cross-cultural management interpretation.</p>
                <p>[2] GLOBE Middle East cluster indicators used as regional directional evidence.</p>
                <p>[3]-[4] Geographic and historical context for cultural pattern formation in Lebanon.</p>
                <p>[5]-[6] Economic conditions and institutional pressures shaping current leadership realities.</p>
                <p>[7]-[8] Communication and business-culture evidence for interpersonal leadership norms.</p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-tactical-300/20 bg-tactical-500/10 p-6 shadow-glow">
              <div className="text-sm uppercase tracking-[0.24em] text-tactical-100">Closing line</div>
              <p className="mt-3 text-lg leading-8 text-white">
                In Lebanon, leadership succeeds when it respects identity, reads context, builds trust, and stays flexible under pressure.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
