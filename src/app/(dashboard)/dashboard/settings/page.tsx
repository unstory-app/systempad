import { 
  User, 
  Shield, 
  CreditCard, 
  Bell, 
  AppWindow, 
  Database,
  ChevronRight
} from "lucide-react";

export default function SettingsPage() {
  const sections = [
    { name: "My Account", icon: User, desc: "Personal information and security settings" },
    { name: "Subscription", icon: CreditCard, desc: "Premium plan and billing history" },
    { name: "Collaboration", icon: Shield, desc: "Workspace permissions and team access" },
    { name: "Notifications", icon: Bell, desc: "Updates, comments and system alerts" },
    { name: "Integration", icon: AppWindow, desc: "Connect GitHub, Linear, and Slack" },
    { name: "Data & Privacy", icon: Database, desc: "Export your workspace data and control privacy" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your account preferences and workspace configuration.</p>
      </div>

      <div className="space-y-4">
         {sections.map((s, i) => (
           <div key={i} className="group glass-card p-6 rounded-2xl border border-border hover:border-foreground/30 transition-all flex items-center justify-between cursor-pointer bg-background">
              <div className="flex items-center gap-5">
                 <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors border border-border">
                    <s.icon className="w-5 h-5" />
                 </div>
                 <div>
                    <h3 className="font-bold text-foreground group-hover:text-foreground/80 transition-colors">{s.name}</h3>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                 </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-all" />
           </div>
         ))}
      </div>
      
      <div className="mt-12 p-8 rounded-2xl bg-red-500/5 border border-red-500/10 flex items-center justify-between">
         <div>
            <h3 className="font-bold text-red-400">Delete Workspace</h3>
            <p className="text-xs text-red-400/60">This will permanently delete all your boards and data.</p>
         </div>
         <button className="px-6 py-2.5 rounded-xl border border-red-500/20 text-red-500 text-xs font-bold hover:bg-red-500 hover:text-white transition-all">
            Delete Permanently
         </button>
      </div>
    </div>
  );
}
