import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { MiniCard } from './ui/mini-card';

const experiences = [
  {
    type: 'work',
    title: 'Web Developer Intern',
    company: 'AshwaQuant Pvt. Ltd.',
    period: 'May 2025 – July 2025',
    location: 'Remote, India',
    description: [
      'Built and deployed a fully responsive company website from scratch using React.js, aligned with branding and UI/UX best practices.',
      'Integrated Node.js backend with RESTful APIs to enable reliable contact forms, automated inquiry responses, and seamless client communication.',
      'Developed and managed detailed course pages with pricing setup and purchase workflow.',
      'Conducted requirement gathering, design improvements, and continuous updates for optimal performance.',
    ],
    technologies: ['React.js', 'Node.js', 'REST APIs', 'UI/UX'],
  },
];

const leadership = {
  title: 'Core Member – Sponsorship & Event Operations',
  organization: 'Yuvaan College Fest',
  highlights: [
    'Negotiated and closed sponsorship deals worth ₹1.5 Lakh using data-driven outreach strategies.',
    'Planned and executed logistics for 300+ attendees during a large-scale cultural event.',
  ],
  achievements: [
    { value: '₹1.5L', label: 'Sponsorship Secured' },
    { value: '300+', label: 'Event Attendees' },
  ],
};

const education = [
  {
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'Indian Institute of Information Technology Guwahati',
    period: 'Present',
  },
  {
    degree: 'Class XII (BSEB)',
    institution: 'R.P.S. College Harnaut, Nalanda',
    period: 'May 2020 • Bihar, India',
  },
];

export function ExperienceSection() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section id="experience" className="py-16 lg:py-24 relative overflow-hidden" ref={containerRef}>
      {/* Ambient background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </motion.div>
      
      <div className="container mx-auto relative" ref={ref}>
        <div className="max-w-6xl mx-auto">
          {/* Section Header - Enhanced */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-6 font-medium">
              Experience
            </span>
            <h2 className="font-heading text-display-sm lg:text-display leading-[0.95]">
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '100%' }}
                  animate={isInView ? { y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  Professional
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-muted-foreground"
                  initial={{ y: '100%' }}
                  animate={isInView ? { y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  Journey.
                </motion.span>
              </span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-28">
            {/* Left - Work Experience */}
            <div className="space-y-14">
              <h3 className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8 font-medium">
                Work Experience
              </h3>
              {experiences.map((exp, index) => (
                <motion.article
                  key={exp.title}
                  className="relative group"
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <MiniCard>
                    <div className="space-y-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-heading text-xl lg:text-2xl font-bold text-foreground">
                          {exp.title}
                        </h3>
                        <p className="text-muted-foreground text-lg">{exp.company}</p>
                      </div>
                      <span className="text-xs tracking-[0.2em] text-muted-foreground whitespace-nowrap font-medium">
                        {exp.period}
                      </span>
                    </div>
                    
                    <ul className="space-y-4">
                      {exp.description.map((item, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-start gap-4 text-muted-foreground"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2.5 flex-shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2.5 pt-4">
                      {exp.technologies.map((tech, i) => (
                        <motion.span
                          key={tech}
                          className="px-4 py-1.5 text-xs border border-border/60 rounded-full text-muted-foreground hover:border-foreground/30 transition-colors duration-300"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  </MiniCard>
                </motion.article>
              ))}

              {/* Leadership - Enhanced */}
              <motion.div
                className="pt-10 border-t border-border/50"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8 font-medium">
                  Leadership & Responsibilities
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-heading text-lg lg:text-xl font-bold text-foreground">
                      {leadership.title}
                    </h4>
                    <p className="text-muted-foreground text-lg">{leadership.organization}</p>
                  </div>
                  
                  {/* Leadership highlights */}
                  <ul className="space-y-3">
                    {leadership.highlights.map((highlight, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-start gap-4 text-muted-foreground"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.55 + i * 0.1, duration: 0.5 }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2.5 flex-shrink-0" />
                        <span className="leading-relaxed">{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  {/* Achievement cards */}
                  <div className="flex gap-6 pt-4">
                    {leadership.achievements.map((achievement, index) => (
                      <motion.div 
                        key={achievement.label}
                        className="flex-1 p-6 rounded-2xl border border-border/50 bg-card/20 backdrop-blur-sm hover:border-border hover:bg-card/40 transition-all duration-500"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      >
                        <motion.div 
                          className="text-3xl lg:text-4xl font-heading font-bold text-foreground"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          {achievement.value}
                        </motion.div>
                        <div className="text-sm text-muted-foreground mt-2">
                          {achievement.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right - Education Enhanced */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-10 font-medium">
                Education
              </h3>
              <div className="space-y-10">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.degree}
                    className="relative pl-8 border-l-2 border-border/50 hover:border-foreground/50 transition-colors duration-500 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.15, duration: 0.6 }}
                  >
                    <motion.div 
                      className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-foreground border-4 border-background"
                      whileHover={{ scale: 1.3 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="space-y-2">
                      <h4 className="font-heading text-lg lg:text-xl font-bold text-foreground group-hover:text-foreground/80 transition-colors duration-300">
                        {edu.degree}
                      </h4>
                      <p className="text-muted-foreground">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground/80">{edu.period}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Coursework - Enhanced */}
              <motion.div 
                className="mt-14 pt-10 border-t border-border/50"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <h3 className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8 font-medium">
                  Relevant Coursework
                </h3>
                <div className="flex flex-wrap gap-3">
                  {['Data Structures', 'Operating Systems', 'DBMS', 'AI/ML', 'Computer Networks', 'Data Analytics'].map((course, index) => (
                    <motion.span
                      key={course}
                      className="px-5 py-2.5 text-sm border border-border/60 rounded-full text-muted-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-500 cursor-default"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.8 + index * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {course}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
