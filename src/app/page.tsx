"use client";

import Hero from "@/components/Hero";
import { ExperienceCard } from "@/components/ExperienceCard";
import { SectionHeader } from "@/components/SectionHeader";
import { ResearchCard } from "@/components/ResearchCard";
import { AwardCard } from "@/components/AwardCard";
import { VolunteeringShowcase } from "@/components/VolunteeringShowcase";
import { Tabs } from "@/components/Tabs";
import { GlassCard } from "@/components/GlassCard";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { motion } from "framer-motion";
import { TrendingUp, Users, BookOpen, Award, Stethoscope, FlaskConical, Heart, GraduationCap } from "lucide-react";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const iconMap: Record<string, (size: number) => React.ReactNode> = {
  BookOpen: (s) => <BookOpen size={s} />,
  TrendingUp: (s) => <TrendingUp size={s} />,
  Users: (s) => <Users size={s} />,
  Award: (s) => <Award size={s} />,
  Stethoscope: (s) => <Stethoscope size={s} />,
  FlaskConical: (s) => <FlaskConical size={s} />,
  Heart: (s) => <Heart size={s} />,
  GraduationCap: (s) => <GraduationCap size={s} />,
};

export default function Home() {
  const { data, loading } = usePortfolioData();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: 'var(--background)' }}>
        <div className="flex flex-col items-center gap-4">
          <div
            className="h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"
            style={{ borderColor: 'var(--border)', borderTopColor: 'transparent' }}
          />
          <span className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>Loading portfolio...</span>
        </div>
      </div>
    );
  }

  // Section visibility — defaults to all visible if not set
  const rawVis = data.hero?.section_visibility;
  const visibility = typeof rawVis === 'string' ? JSON.parse(rawVis) : (rawVis || {});
  const isVisible = (section: string) => visibility[section] !== false;

  // Parse stats
  const rawStats = data.hero?.stats;
  const statsArr = typeof rawStats === 'string' ? JSON.parse(rawStats) : (rawStats || []);

  // Check if sections have real data
  const hasEducation = data.education.length > 0;
  const hasExperience = data.experience.length > 0;
  const hasResearch = data.research.length > 0;
  const hasAwards = data.awards.length > 0;
  const hasExtracurriculars = data.extracurriculars.length > 0;
  const hasStats = statsArr.length > 0;

  // Research sub-categories
  const publishedResearch = data.research.filter((r: any) => r.type === 'Published Research');
  const ongoingResearch = data.research.filter((r: any) => r.type === 'Ongoing Research');
  const presentations = data.research.filter((r: any) => r.type === 'Paper Presentation');

  // Awards sub-categories
  const licenses = data.awards.filter((a: any) => a.type === 'License' || a.type === 'Certification');
  const scholarships = data.awards.filter((a: any) => a.type === 'Scholarship');

  // Extracurriculars sub-categories
  const volunteering = data.extracurriculars.filter((e: any) => e.category === 'Volunteering');
  const leadership = data.extracurriculars.filter((e: any) => e.category === 'Leadership');
  const otherActivities = data.extracurriculars.filter((e: any) => e.category === 'Other');

  return (
    <div className="flex flex-col">
      <Hero heroData={data.hero} />

      {/* ══════════════════════════════════════════════════════════
          Inverted Stats Section — Jet Black Background
         ══════════════════════════════════════════════════════════ */}
      {isVisible('stats') && hasStats && (
        <section className="relative overflow-hidden py-20" style={{ background: 'var(--foreground)' }}>
          {/* Dot Pattern */}
          <div className="pointer-events-none absolute inset-0 dot-pattern" />

          <div className="container relative z-10 mx-auto max-w-6xl px-6">
            <motion.div
              className="grid grid-cols-2 gap-6 md:grid-cols-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3, margin: "-60px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
              }}
            >
              {statsArr.map((stat: any, i: number) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 28 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
                  }}
                  className="group flex flex-col items-center rounded-2xl border p-6 text-center transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: 'rgba(226,240,240,0.03)',
                    borderColor: 'rgba(226,240,240,0.08)',
                  }}
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-white"
                    style={{ background: 'linear-gradient(135deg, #36565F, #5F8190)' }}
                  >
                    {(iconMap[stat.icon] || iconMap.Award)(22)}
                  </div>
                  <span
                    className="mb-1 text-2xl font-bold md:text-3xl"
                    style={{ fontFamily: 'var(--font-calistoga)', color: '#FFFFFF' }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-xs uppercase tracking-[0.12em] font-medium"
                    style={{ fontFamily: 'var(--font-jetbrains)', color: 'rgba(226,240,240,0.6)' }}
                  >
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          Academics
         ══════════════════════════════════════════════════════════ */}
      {isVisible('academics') && hasEducation && (
        <section id="academics" className="py-28 md:py-36 lg:py-44">
          <div className="container mx-auto max-w-6xl px-6">
            <SectionHeader
              label="Education"
              title="Academic Journey"
              highlightWord="Journey"
              subtitle="Education milestones and academic achievements in the medical field."
            />
            <div className="grid gap-6">
              {data.education.map((edu: any, idx: number) => (
                <ExperienceCard
                  key={edu.id || idx}
                  type="education"
                  title={edu.degree}
                  organization={edu.institution}
                  dateRange={edu.date_range || edu.graduation_year}
                  description={edu.details}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          Work Experience
         ══════════════════════════════════════════════════════════ */}
      {isVisible('experience') && hasExperience && (
        <section id="experience" className="py-28 md:py-36 lg:py-44" style={{ background: 'var(--muted)' }}>
          <div className="container mx-auto max-w-6xl px-6">
            <SectionHeader
              label="Career"
              title="Work Experience"
              highlightWord="Experience"
              subtitle="Clinical internships and professional observerships."
            />
            <div className="grid gap-6">
              {data.experience.map((exp: any, idx: number) => (
                <ExperienceCard
                  key={exp.id || idx}
                  type="work"
                  title={exp.title}
                  organization={exp.organization}
                  dateRange={exp.date_range}
                  description={exp.description}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          Research Portfolio
         ══════════════════════════════════════════════════════════ */}
      {isVisible('research') && hasResearch && (
        <section id="research" className="py-28 md:py-36 lg:py-44">
          <div className="container mx-auto max-w-6xl px-6">
            <SectionHeader
              label="Research"
              title="Research Portfolio"
              highlightWord="Portfolio"
              subtitle="Investigating clinical outcomes and medical innovations."
            />
            <Tabs
              tabs={[
                ...(publishedResearch.length > 0 ? [{
                  id: 'published',
                  label: 'Published',
                  content: (
                    <div className="grid gap-6">
                      {publishedResearch.map((res: any, idx: number) => (
                        <ResearchCard
                          key={res.id || idx}
                          type="published"
                          title={res.title}
                          link={res.link}
                          description={res.description}
                          datePublished={res.date_published}
                        />
                      ))}
                    </div>
                  )
                }] : []),
                ...(ongoingResearch.length > 0 ? [{
                  id: 'ongoing',
                  label: 'Ongoing',
                  content: (
                    <div className="grid gap-6">
                      {ongoingResearch.map((res: any, idx: number) => (
                        <ResearchCard
                          key={res.id || idx}
                          type="ongoing"
                          title={res.title}
                          status={res.status}
                          description={res.description}
                          datePublished={res.date_published}
                        />
                      ))}
                    </div>
                  )
                }] : []),
                ...(presentations.length > 0 ? [{
                  id: 'presentations',
                  label: 'Presentations',
                  content: (
                    <div className="grid gap-6">
                      {presentations.map((res: any, idx: number) => (
                        <ResearchCard
                          key={res.id || idx}
                          type="presentation"
                          title={res.title}
                          link={res.link}
                          description={res.description}
                          datePublished={res.date_published}
                        />
                      ))}
                    </div>
                  )
                }] : []),
              ]}
            />
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          Awards & Achievements
         ══════════════════════════════════════════════════════════ */}
      {isVisible('awards') && hasAwards && (
        <section id="awards" className="py-28 md:py-36 lg:py-44" style={{ background: 'var(--muted)' }}>
          <div className="container mx-auto max-w-6xl px-6">
            <SectionHeader
              label="Recognition"
              title="Awards & Achievements"
              highlightWord="Achievements"
              subtitle="Certifications, licenses, and recognitions for merit."
            />
            <Tabs
              tabs={[
                ...(licenses.length > 0 ? [{
                  id: 'licenses',
                  label: 'Licenses & Certifications',
                  content: (
                    <div className="grid gap-6 md:grid-cols-2">
                      {licenses.map((award: any, idx: number) => (
                        <AwardCard
                          key={award.id || idx}
                          type="license"
                          title={award.title}
                          year={award.year}
                          description={award.description}
                        />
                      ))}
                    </div>
                  )
                }] : []),
                ...(scholarships.length > 0 ? [{
                  id: 'scholarships',
                  label: 'Scholarships',
                  content: (
                    <div className="grid gap-6 md:grid-cols-2">
                      {scholarships.map((award: any, idx: number) => (
                        <AwardCard
                          key={award.id || idx}
                          type="scholarship"
                          title={award.title}
                          year={award.year}
                          description={award.description}
                        />
                      ))}
                    </div>
                  )
                }] : []),
              ]}
            />
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          Extra-Curriculars
         ══════════════════════════════════════════════════════════ */}
      {isVisible('extracurriculars') && hasExtracurriculars && (
        <section id="volunteering" className="py-28 md:py-36 lg:py-44">
          <div className="container mx-auto max-w-6xl px-6">
            <SectionHeader
              label="Beyond Academics"
              title="Extra-Curriculars"
              highlightWord="Curriculars"
              subtitle="Beyond the classroom: Volunteering, Photography, and more."
            />
            <Tabs
              tabs={[
                ...(volunteering.length > 0 ? [{
                  id: 'volunteering',
                  label: 'Volunteering',
                  content: (
                    <VolunteeringShowcase items={volunteering} />
                  )
                }] : []),
                ...(leadership.length > 0 ? [{
                  id: 'leadership',
                  label: 'Leadership',
                  content: (
                    <VolunteeringShowcase items={leadership} />
                  )
                }] : []),
                ...(otherActivities.length > 0 ? [{
                  id: 'others',
                  label: 'Other Activities',
                  content: (
                    <div className="grid gap-6 md:grid-cols-3">
                      {otherActivities.map((ext: any, idx: number) => (
                        <GlassCard key={ext.id || idx} className="text-center">
                          <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{ext.title}</h4>
                          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{ext.description}</p>
                        </GlassCard>
                      ))}
                    </div>
                  )
                }] : []),
              ]}
            />
          </div>
        </section>
      )}
    </div>
  );
}
