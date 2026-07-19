"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { profile, socials } from "@/lib/data";
import SectionTag from "./SectionTag";
import MagneticButton from "./MagneticButton";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

const icons: Record<string, React.ElementType> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Email: Mail,
};

function displayValue(href: string) {
  if (href.startsWith("mailto:")) return href.replace("mailto:", "");
  return href.replace(/^https?:\/\//, "");
}

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <SectionTag index="05" stage="output" title="Contact" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="gradient-border relative mt-10 overflow-hidden rounded-[2rem]"
        >
          <div className="gradient-border-inner glass relative grid grid-cols-1 gap-10 rounded-[calc(2rem-1px)] p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            <div
              className="pointer-events-none absolute inset-0 -z-10 opacity-70"
              style={{
                background:
                  "radial-gradient(55% 70% at 12% 0%, rgba(124,92,255,0.16), transparent 70%)",
              }}
            />

            {/* pitch + primary CTA */}
            <div className="flex flex-col justify-between gap-8">
              <div>
                <div className="mb-5 flex items-center gap-2 font-mono text-xs text-cyan">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-soft" />
                  available for opportunities
                </div>
                <h3 className="font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
                  Let&rsquo;s build something worth shipping.
                </h3>
                <p className="mt-4 max-w-sm text-muted">
                  Open to research collaborations, full-stack roles, and anything
                  in between. I usually reply within a day.
                </p>
              </div>

              <MagneticButton
                href={`mailto:${profile.email}`}
                variant="light"
                cursorText="send"
                className="w-fit"
              >
                <Mail size={16} />
                Say hello
              </MagneticButton>
            </div>

            {/* contact card — structured rows instead of a row of bare icons */}
            <div className="flex flex-col divide-y divide-line overflow-hidden rounded-2xl border border-line bg-void/40">
              {socials.map((social) => {
                const Icon = icons[social.label] ?? ArrowUpRight;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                    data-cursor-text={social.label}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/[0.04]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors group-hover:border-cyan/50 group-hover:text-ink">
                      <Icon size={16} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-muted">
                        {social.label}
                      </span>
                      <span className="block truncate text-sm text-ink">
                        {displayValue(social.href)}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={15}
                      className="shrink-0 text-muted transition-colors group-hover:text-cyan"
                    />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
