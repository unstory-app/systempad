export default function RecentPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 opacity-50">
       <div className="w-16 h-16 bg-[#141415] rounded-2xl flex items-center justify-center mb-6 border border-[#27272A]">
         <History className="w-8 h-8 text-[#52525B]" />
       </div>
       <h2 className="text-xl font-bold text-[#F5F5F5] mb-2">No recent history</h2>
       <p className="text-sm text-[#A1A1AA]">Boards you open or edit will appear here.</p>
    </div>
  );
}

import { History } from "lucide-react";
