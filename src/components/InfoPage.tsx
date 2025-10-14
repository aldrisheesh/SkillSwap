import { ScrollArea } from './ui/scroll-area';
import { ArrowLeft } from 'lucide-react';

interface InfoPageProps {
  onBack: () => void;
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

export function InfoPage({ onBack, title, subtitle, content }: InfoPageProps) {
  return (
    <div className="h-full flex flex-col bg-[#FDF4E3]">
      {/* Header */}
      <div className="bg-[#134686] text-white p-4">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl">{title}</h2>
        </div>
        <p className="text-sm opacity-80 ml-14">{subtitle}</p>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6 max-w-2xl mx-auto">
          {content}
        </div>
      </ScrollArea>
    </div>
  );
}

export const communityGuidelinesContent = (
  <div className="space-y-6 text-[#134686]">
    <div className="bg-gradient-to-br from-[#134686] to-[#0f3666] text-white rounded-xl p-6">
      <h3 className="text-xl mb-4">🤝 Bayanihan Spirit</h3>
      <p className="mb-4">SkillSwap is built on the Filipino tradition of <strong>bayanihan</strong>—community cooperation and mutual aid. We believe in the power of giving and receiving, where everyone's skills are valued equally.</p>
      <p className="text-sm opacity-90">Together, we create a self-sustaining local economy that strengthens our barangay bonds.</p>
    </div>

    <div className="bg-white rounded-xl p-6 border-2 border-[#134686]/10">
      <h3 className="text-xl mb-4">Community Guidelines</h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">1. 🤝 Respect & Bayanihan</h4>
          <p className="text-sm text-[#134686]/80">Treat all community members with respect, kindness, and the spirit of mutual aid. We are building a stronger neighborhood together.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">2. ✨ Honesty & Transparency</h4>
          <p className="text-sm text-[#134686]/80">Be honest about your skills and availability. If you cannot fulfill a commitment, communicate promptly. Trust is our foundation.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">3. 💯 Quality Service</h4>
          <p className="text-sm text-[#134686]/80">Provide the best service you can. Your reputation in the community is built on the quality of your exchanges and verified by peer reviews.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">4. ⏱️ Time Banking Principle</h4>
          <p className="text-sm text-[#134686]/80">One hour of service equals one Time Credit, regardless of the skill. All contributions are valued equally—a coding lesson holds the same value as gardening help.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">5. 🔄 Reciprocity & Circulation</h4>
          <p className="text-sm text-[#134686]/80">Give before you receive. Keep Time Credits circulating. Help given reliably begets help received.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">6. 🛡️ Safety First</h4>
          <p className="text-sm text-[#134686]/80">Meet in public places for first exchanges. Use in-app messaging. Trust your instincts and report any concerning behavior.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">7. 🎓 Learning-Forward</h4>
          <p className="text-sm text-[#134686]/80">Every exchange is a learning opportunity. Share knowledge generously through micro-mentorship and co-working sessions.</p>
        </div>
      </div>
    </div>

    <div className="bg-[#FDF4E3] rounded-xl p-6 border-2 border-[#FEB21A]/30">
      <h3 className="text-xl mb-4">Verified by Community</h3>
      <p className="text-sm text-[#134686]/80 mb-3">Build credibility through:</p>
      <ul className="space-y-2 text-sm text-[#134686]/80 list-disc list-inside">
        <li>Peer reviews after each service exchange</li>
        <li>Evidence-based skill portfolios</li>
        <li>Verification by barangay halls or academic institutions</li>
        <li>Community-visible audit trails of Time Credits</li>
      </ul>
    </div>
  </div>
);

export const aboutContent = (
  <div className="space-y-6 text-[#134686]">
    <div className="bg-white rounded-xl p-6 border-2 border-[#134686]/10">
      <h3 className="text-xl mb-4">SkillSwap: Time Bank & Reciprocal Skill Exchange</h3>
      <p className="mb-4">SkillSwap formalizes the Filipino spirit of <strong>bayanihan</strong> through a structured, digital, non-monetary exchange economy. We address financial exclusion and skills underutilization by establishing a trusted ecosystem for community members to barter services based on <strong>time as the unit of exchange</strong>.</p>
      <p>When you provide one hour of service—whether tutoring, technical repair, or caregiving—you earn <strong>one Time Credit</strong>. You can then use that credit to receive help from another community member. It's a cashless, reciprocal economy where every person's contribution holds equal value.</p>
    </div>

    <div className="bg-white rounded-xl p-6 border-2 border-[#134686]/10">
      <h3 className="text-xl mb-4">The Problem We Solve</h3>
      <p className="text-sm text-[#134686]/80 mb-3">Despite the vast pool of skills in our communities, two major problems exist:</p>
      <div className="space-y-3">
        <div>
          <h4 className="font-semibold mb-1">🚫 Financial Exclusion</h4>
          <p className="text-sm text-[#134686]/80">In a cash-based economy, essential services like tutoring, repairs, and assistance are financially prohibitive for students and marginalized communities, limiting access to basic support and lifelong learning.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-1">💤 Skills Underutilization</h4>
          <p className="text-sm text-[#134686]/80">Without a safe, accountable, transparent system for mutual exchange, valuable skills—from coding to engine repair—remain dormant and unused in the community.</p>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl p-6 border-2 border-[#134686]/10">
      <h3 className="text-xl mb-4">Our Solution: Digital Bayanihan</h3>
      <div className="space-y-3">
        <div className="flex gap-3">
          <div className="text-2xl">🤝</div>
          <div>
            <h4 className="font-semibold mb-1">Trusted & Verified Ecosystem</h4>
            <p className="text-sm text-[#134686]/80">Build trust through peer reviews, skill portfolios, and community partner verifications (barangay offices, academic institutions)</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="text-2xl">📊</div>
          <div>
            <h4 className="font-semibold mb-1">Transparent Time-Banking Ledger</h4>
            <p className="text-sm text-[#134686]/80">Secure double-entry ledger tracks all Time Credit transactions with audit trails and dispute resolution</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="text-2xl">📍</div>
          <div>
            <h4 className="font-semibold mb-1">Hyperlocal Communities</h4>
            <p className="text-sm text-[#134686]/80">Geo-location technology connects neighbors in the same barangay, campus, or neighborhood</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="text-2xl">🎓</div>
          <div>
            <h4 className="font-semibold mb-1">Learning-Forward Exchanges</h4>
            <p className="text-sm text-[#134686]/80">Micro-mentorship and co-work sessions turn every swap into skill transfer opportunities</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="text-2xl">🔄</div>
          <div>
            <h4 className="font-semibold mb-1">Reciprocity Engine</h4>
            <p className="text-sm text-[#134686]/80">Nudge mechanics keep the economy circulating—help given reliably begets help received</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl p-6 border-2 border-[#134686]/10">
      <h3 className="text-xl mb-4">How It Works</h3>
      <div className="space-y-3">
        <div className="flex gap-3">
          <div className="w-8 h-8 bg-[#134686] text-white rounded-full flex items-center justify-center shrink-0">1</div>
          <div>
            <h4 className="font-semibold mb-1">Share Your Skills</h4>
            <p className="text-sm text-[#134686]/80">Offer what you know to your local barangay or campus community</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-8 h-8 bg-[#134686] text-white rounded-full flex items-center justify-center shrink-0">2</div>
          <div>
            <h4 className="font-semibold mb-1">Earn Time Credits</h4>
            <p className="text-sm text-[#134686]/80">1 hour of service = 1 Time Credit. All skills valued equally</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-8 h-8 bg-[#134686] text-white rounded-full flex items-center justify-center shrink-0">3</div>
          <div>
            <h4 className="font-semibold mb-1">Spend Your Credits</h4>
            <p className="text-sm text-[#134686]/80">Access services regardless of financial status</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-8 h-8 bg-[#134686] text-white rounded-full flex items-center justify-center shrink-0">4</div>
          <div>
            <h4 className="font-semibold mb-1">Build Community</h4>
            <p className="text-sm text-[#134686]/80">Strengthen neighborhood bonds through documented skill growth and badges</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-br from-[#134686] to-[#0f3666] text-white rounded-xl p-6">
      <h3 className="text-xl mb-2">🇵🇭 PUP Technology Festival 2025</h3>
      <p className="text-sm opacity-90 mb-2">Category: Community Empowerment</p>
      <p className="text-sm opacity-90">Promoting digital bayanihan and fostering a smart future together</p>
    </div>
  </div>
);

export const safetyContent = (
  <div className="space-y-6 text-[#134686]">
    <div className="bg-white rounded-xl p-6 border-2 border-[#134686]/10">
      <h3 className="text-xl mb-4">Safety & Privacy</h3>
      <p className="mb-4">Your safety and privacy are our top priorities. Here's how we protect you.</p>
    </div>

    <div className="bg-white rounded-xl p-6 border-2 border-[#134686]/10">
      <h3 className="text-xl mb-4">Safety Tips</h3>
      <div className="space-y-3">
        <div className="flex gap-3">
          <div className="text-2xl">🛡️</div>
          <div>
            <h4 className="font-semibold mb-1">Verify Profiles</h4>
            <p className="text-sm text-[#134686]/80">Look for verified badges and read reviews before booking</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="text-2xl">📍</div>
          <div>
            <h4 className="font-semibold mb-1">Meet Safely</h4>
            <p className="text-sm text-[#134686]/80">For first meetings, choose public locations</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="text-2xl">💬</div>
          <div>
            <h4 className="font-semibold mb-1">Use In-App Messaging</h4>
            <p className="text-sm text-[#134686]/80">Keep communications within the app for your protection</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="text-2xl">🚨</div>
          <div>
            <h4 className="font-semibold mb-1">Report Issues</h4>
            <p className="text-sm text-[#134686]/80">Report any suspicious behavior immediately</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl p-6 border-2 border-[#134686]/10">
      <h3 className="text-xl mb-4">Privacy Policy</h3>
      <p className="text-sm text-[#134686]/80 mb-3">We respect your privacy and are committed to protecting your personal data.</p>
      <ul className="space-y-2 text-sm text-[#134686]/80 list-disc list-inside">
        <li>We never share your data with third parties</li>
        <li>Your location is only shared when you choose</li>
        <li>You control your profile visibility</li>
        <li>All messages are encrypted</li>
      </ul>
    </div>
  </div>
);

export const helpContent = (
  <div className="space-y-6 text-[#134686]">
    <div className="bg-white rounded-xl p-6 border-2 border-[#134686]/10">
      <h3 className="text-xl mb-4">Help & Support</h3>
      <p className="mb-4">Need help? We're here for you!</p>
    </div>

    <div className="bg-white rounded-xl p-6 border-2 border-[#134686]/10">
      <h3 className="text-xl mb-4">Frequently Asked Questions</h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">How do time credits work?</h4>
          <p className="text-sm text-[#134686]/80">One hour of service = one time credit. All skills are valued equally in our community.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">How do I earn my first credits?</h4>
          <p className="text-sm text-[#134686]/80">Offer a skill you have and complete your first exchange. New members start with 5 welcome credits!</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">What if I can't make a scheduled exchange?</h4>
          <p className="text-sm text-[#134686]/80">Contact the other person as soon as possible to reschedule. Respect everyone's time.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">How do I report a problem?</h4>
          <p className="text-sm text-[#134686]/80">Use the report button on any profile or message, or contact support@skillswap.com</p>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-br from-[#134686] to-[#0f3666] text-white rounded-xl p-6">
      <h3 className="text-xl mb-2">Contact Support</h3>
      <p className="text-sm opacity-90 mb-3">Still need help?</p>
      <p className="text-sm">📧 support@skillswap.com</p>
      <p className="text-sm">💬 Live chat: Mon-Fri 9AM-5PM</p>
    </div>
  </div>
);
