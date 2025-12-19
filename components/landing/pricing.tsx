import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Simple pricing for modern teams</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Start for free, upgrade as you scale. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PricingCard 
            title="Free" 
            price="$0" 
            description="For open source and personal projects."
            features={["Unlimited public repositories", "Basic security scanning", "Community support", "100 reviews / month"]}
          />
          <PricingCard 
            title="Pro" 
            price="$29" 
            description="For individual professional developers."
            highlight
            features={["Unlimited private repositories", "Advanced security analysis", "Priority support", "Unlimited reviews", "Custom style guides"]}
          />
          <PricingCard 
            title="Team" 
            price="$99" 
            description="For growing engineering teams."
            features={["Everything in Pro", "SSO & SAML", "Team analytics dashboard", "Audit logs", "Dedicated success manager"]}
          />
        </div>
      </div>
    </section>
  );
}

function PricingCard({ title, price, description, features, highlight = false }: { title: string, price: string, description: string, features: string[], highlight?: boolean }) {
    return (
        <div className={`relative p-8 rounded-3xl border ${highlight ? 'border-purple-500 bg-purple-500/5' : 'border-white/10 bg-white/5'} flex flex-col`}>
            {highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    Most Popular
                </div>
            )}
            <h3 className="text-lg font-medium text-zinc-400 mb-2">{title}</h3>
            <div className="text-4xl font-bold text-white mb-4">
                {price} <span className="text-lg font-normal text-zinc-500">/mo</span>
            </div>
            <p className="text-sm text-zinc-400 mb-8">{description}</p>
            
            <ul className="space-y-4 mb-8 flex-1">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                        <Check className={`w-4 h-4 ${highlight ? 'text-purple-400' : 'text-zinc-500'}`} />
                        {feature}
                    </li>
                ))}
            </ul>
            
            <Button className={`w-full h-12 rounded-xl text-base font-medium ${highlight ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white' : 'bg-white text-black hover:bg-zinc-200'}`}>
                Get Started
            </Button>
        </div>
    );
}
