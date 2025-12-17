import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Send, Loader2, Check, Mail, MapPin, ArrowUpRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_ce591nt';
const EMAILJS_TEMPLATE_ID = 'template_u0nk8zd';
const EMAILJS_PUBLIC_KEY = 'Mm7tjzUvNBgOw5GxO';

export function ContactSection() {
  const { toast } = useToast();
  const sectionRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.from_name || !formData.from_email || !formData.message) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current!,
        EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        setShowSuccess(true);
        setFormData({ from_name: '', from_email: '', subject: '', message: '' });
        setTimeout(() => setShowSuccess(false), 5000);
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast({
        title: "Failed to send",
        description: "Please try emailing directly at ritikraj.contact@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24 relative overflow-hidden" ref={containerRef}>
      {/* Ambient background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-radial from-muted/20 to-transparent blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-gradient-radial from-muted/15 to-transparent blur-3xl opacity-40" />
      </motion.div>
      
      <div className="container mx-auto relative" ref={sectionRef}>
        <div className="max-w-6xl mx-auto">
          {/* Section Header - Enhanced */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-6 font-medium">
              Contact
            </span>
            <h2 className="font-heading text-display-sm lg:text-display leading-[0.95]">
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '100%' }}
                  animate={isInView ? { y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  Let's work
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-muted-foreground"
                  initial={{ y: '100%' }}
                  animate={isInView ? { y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  together.
                </motion.span>
              </span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-28">
            {/* Left - Contact Info Enhanced */}
            <motion.div
              className="space-y-14"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                I'm seeking software engineering opportunities and open to meaningful projects. 
                Have a question, an idea, or an opportunity? Let's connect.
              </p>

              <div className="space-y-8">
                <motion.a
                  href="mailto:ritikraj.contact@gmail.com"
                  className="flex items-center gap-5 group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-14 h-14 rounded-full border-2 border-border/60 flex items-center justify-center group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-all duration-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] font-medium">Email</p>
                    <p className="text-foreground font-medium text-lg group-hover:text-muted-foreground transition-colors duration-300">
                      ritikraj.contact@gmail.com
                    </p>
                  </div>
                </motion.a>

                <motion.div 
                  className="flex items-center gap-5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="w-14 h-14 rounded-full border-2 border-border/60 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] font-medium">Location</p>
                    <p className="text-foreground font-medium text-lg">Guwahati, India</p>
                  </div>
                </motion.div>
              </div>

              {/* Social Links - Enhanced */}
              <motion.div 
                className="pt-10 border-t border-border/50"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <h3 className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8 font-medium">
                  Find me on
                </h3>
                <div className="flex gap-6">
                  <motion.a
                    href="https://github.com/RitikRaj108"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors duration-300 group"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.3 }}
                  >
                    GitHub
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.a>
                  <span className="text-border/60">•</span>
                  <motion.a
                    href="https://linkedin.com/in/ritik-raj-311236258"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors duration-300 group"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.3 }}
                  >
                    LinkedIn
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            {/* Right - Contact Form Enhanced */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Success Overlay - Premium Animation */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    className="absolute inset-0 z-10 flex items-center justify-center bg-background/98 backdrop-blur-xl rounded-3xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="text-center space-y-6">
                      <motion.div
                        className="relative"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.7, delay: 0.1 }}
                      >
                        <motion.div
                          className="w-20 h-20 rounded-full bg-foreground flex items-center justify-center mx-auto"
                          animate={{ 
                            boxShadow: ["0 0 0 0 hsl(var(--foreground) / 0.3)", "0 0 0 20px hsl(var(--foreground) / 0)", "0 0 0 0 hsl(var(--foreground) / 0)"]
                          }}
                          transition={{ duration: 1.5, repeat: 2 }}
                        >
                          <Check className="w-10 h-10 text-background" />
                        </motion.div>
                        <motion.div
                          className="absolute -top-2 -right-2"
                          initial={{ scale: 0, rotate: -30 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                          <Sparkles className="w-6 h-6 text-foreground/60" />
                        </motion.div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <h3 className="font-heading text-2xl lg:text-3xl font-bold">Message Sent!</h3>
                        <p className="text-muted-foreground mt-2 text-lg">
                          I'll get back to you within 24 hours.
                        </p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Button
                          variant="premiumOutline"
                          size="lg"
                          onClick={() => setShowSuccess(false)}
                          className="mt-2"
                        >
                          Send Another
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-8 p-10 lg:p-12 rounded-3xl border border-border/50 bg-card/20 backdrop-blur-sm hover:border-border/80 transition-colors duration-500"
              >
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="from_name" className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">
                      Name *
                    </label>
                    <div className="relative">
                      <Input
                        id="from_name"
                        name="from_name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.from_name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="bg-transparent border-border/60 focus:border-foreground h-14 rounded-xl text-base transition-all duration-300 placeholder:text-muted-foreground/50"
                      />
                      <motion.div 
                        className="absolute bottom-0 left-0 h-0.5 bg-foreground rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: focusedField === 'name' ? '100%' : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="from_email" className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">
                      Email *
                    </label>
                    <div className="relative">
                      <Input
                        id="from_email"
                        name="from_email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.from_email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="bg-transparent border-border/60 focus:border-foreground h-14 rounded-xl text-base transition-all duration-300 placeholder:text-muted-foreground/50"
                      />
                      <motion.div 
                        className="absolute bottom-0 left-0 h-0.5 bg-foreground rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: focusedField === 'email' ? '100%' : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="subject" className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">
                    Subject
                  </label>
                  <div className="relative">
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Job Opportunity / Collaboration"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      className="bg-transparent border-border/60 focus:border-foreground h-14 rounded-xl text-base transition-all duration-300 placeholder:text-muted-foreground/50"
                    />
                    <motion.div 
                      className="absolute bottom-0 left-0 h-0.5 bg-foreground rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: focusedField === 'subject' ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="message" className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">
                    Message *
                  </label>
                  <div className="relative">
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project or opportunity..."
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={6}
                      className="bg-transparent border-border/60 focus:border-foreground resize-none rounded-xl text-base transition-all duration-300 placeholder:text-muted-foreground/50"
                    />
                    <motion.div 
                      className="absolute bottom-0 left-0 h-0.5 bg-foreground rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: focusedField === 'message' ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="premium"
                  size="xl"
                  className="w-full group relative overflow-hidden"
                  disabled={isSubmitting}
                  data-magnetic
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
