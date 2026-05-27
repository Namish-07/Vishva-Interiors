import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { ContactFormInput, Testimonial } from "../types";
import { TESTIMONIALS, PRODUCT_CATEGORIES } from "../data";
import { Mail, Phone, MapPin, Stars, Sparkles, Send, CheckCircle2, Clock, Calendar, HelpCircle, Compass } from "lucide-react";
import InteractivePhone from "./InteractivePhone";

interface ContactFormProps {
  preFilledInterest?: string;
  preFilledMessage?: string;
}

export default function ContactForm({ preFilledInterest, preFilledMessage }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormInput>({
    name: "",
    email: "",
    phone: "",
    company: "",
    interestCategory: "glass",
    message: "",
    appointmentDate: ""
  });

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isSent, setIsSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Hook into preFill options if they are triggered from other panels
  useEffect(() => {
    if (preFilledInterest) {
      setFormData((prev) => ({
        ...prev,
        interestCategory: preFilledInterest
      }));
    }
  }, [preFilledInterest]);

  useEffect(() => {
    if (preFilledMessage) {
      setFormData((prev) => ({
        ...prev,
        message: preFilledMessage
      }));
    }
  }, [preFilledMessage]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate high-end backend post
    setTimeout(() => {
      setSubmitting(false);
      setIsSent(true);
      
      // Auto reset success popup after a few seconds
      setTimeout(() => {
        setIsSent(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          interestCategory: "glass",
          message: "",
          appointmentDate: ""
        });
      }, 6000);
    }, 1500);
  };

  // Testimonial rotator interval loop
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="contact" className="relative w-full py-24 md:py-32 bg-slate-925 border-t border-white/5 overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-gold-600/5 rounded-full blur-3.5xl pointer-events-none" />
      <div className="absolute bottom-[200px] right-[-100px] w-96 h-96 bg-purple-700/5 rounded-full blur-3.5xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Testimonials Banner above input forms, acting as client validation */}
        <div className="mb-20 md:mb-24 space-y-6 max-w-4xl mx-auto text-center">
          <div className="inline-flex justify-center items-center gap-1.5 text-center">
            {[1, 2, 3, 4, 5].map((s) => (
              <Stars key={s} className="w-4 h-4 text-gold-400 fill-gold-400 animate-pulse" />
            ))}
          </div>

          <h3 className="font-serif text-2xl md:text-3.5xl font-bold tracking-tight text-white leading-normal">
            &ldquo;{TESTIMONIALS[activeTestimonial].content}&rdquo;
          </h3>

          <div className="space-y-1">
            <h5 className="font-sans text-xs uppercase font-bold tracking-wider text-white">
              {TESTIMONIALS[activeTestimonial].name}
            </h5>
            <span className="block font-mono text-[10px] text-gold-500 uppercase tracking-widest">
              {TESTIMONIALS[activeTestimonial].role} • {TESTIMONIALS[activeTestimonial].company}
            </span>
          </div>

          {/* Rotator selector dots */}
          <div className="flex justify-center items-center gap-2 pt-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveTestimonial(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === activeTestimonial ? "w-6 bg-gold-400" : "bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Show testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* The Hub Main GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pt-12 border-t border-white/5">
          
          {/* LEFT SIDE: HQ & Branch Office Coordinates */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="space-y-4">
              <span className="font-mono text-xs text-gold-400 tracking-widest uppercase font-semibold">
                Studio Communications
              </span>
              <h2 className="font-serif text-3xl md:text-4.5xl font-bold tracking-tight text-white">
                Book a Private <br />
                <span className="italic font-normal text-gold-300">Design Consultation</span>
              </h2>
              <p className="font-sans text-gray-400 text-sm leading-relaxed">
                Meet with our engineering decorators at our Visakhapatnam headquarters or schedule an on-site structural alignment review at your residence in Andhra Pradesh.
              </p>
            </div>

            {/* Structured info items */}
            <div className="space-y-6 pt-4 border-t border-white/5">
              
              <div className="flex gap-4">
                <a 
                  href="https://maps.app.goo.gl/6EDexhSqfoHztf4X9"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View Store Location on Google Maps"
                  className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0 border border-gold-400/20 text-gold-400 hover:bg-gold-500 hover:text-white transition-all hover:scale-105"
                >
                  <Compass className="w-5 h-5 animate-spin-slow" />
                </a>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h5 className="font-sans font-bold text-white text-xs md:text-sm uppercase tracking-wider">Visakhapatnam Headquarters</h5>
                    <a
                      href="https://maps.app.goo.gl/6EDexhSqfoHztf4X9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold-400 hover:text-gold-300 flex items-center gap-0.5 text-[10px] font-mono"
                    >
                      (View Map <Compass className="w-3 h-3 inline animate-pulse" />)
                    </a>
                  </div>
                  <span className="block font-sans text-xs text-gray-400 leading-relaxed">
                    Sector 4, Sector 5, MVP Colony, Visakhapatnam, Andhra Pradesh 530017
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0 border border-gold-400/20 text-gold-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h5 className="font-sans font-bold text-white text-xs md:text-sm uppercase tracking-wider">Direct Enquiries</h5>
                  <span className="block font-sans text-xs text-gray-300 font-medium">
                    <InteractivePhone showIcon={false} className="text-xs text-gray-300 font-medium" />
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0 border border-gold-400/20 text-gold-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h5 className="font-sans font-bold text-white text-xs md:text-sm uppercase tracking-wider">Electronic Transmission</h5>
                  <span className="block font-sans text-xs text-gray-300 font-medium">
                    consult@vishvainteriors.com • vishvainteriors@gmail.com
                  </span>
                </div>
              </div>

            </div>

            {/* Quick response badge info */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex gap-4 items-center">
              <Clock className="w-6 h-6 text-gold-500 shrink-0" />
              <div className="space-y-0.5">
                <h5 className="font-sans text-white text-xs font-bold uppercase tracking-wider">Dynamic Response Matrix</h5>
                <p className="font-sans text-[11px] text-gray-400 leading-relaxed">
                  Our designing architect guarantees response within 4 hours. Custom pricing sheets prepared free of obligation.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Dynamic validation form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/60 rounded-3xl border border-white/10 p-6 md:p-10 shadow-3xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-2xl" />
              
              <h4 className="font-serif text-lg text-white font-bold tracking-wider mb-8 border-b border-white/5 pb-4">
                Transmission Hub
              </h4>

              {isSent ? (
                /* Success screen after submission */
                <div className="text-center py-16 px-4 space-y-6">
                  <div className="w-16 h-16 bg-gold-500/13 rounded-full flex items-center justify-center mx-auto border border-gold-400">
                    <CheckCircle2 className="w-8 h-8 text-gold-400 animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <b className="font-serif text-white text-xl tracking-wide block">Bespoke Design Request Received</b>
                    <p className="font-sans text-xs md:text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
                      Thank you for contacting Vishva Interiors, {formData.name}. Our principal design architect has received your spec summary for <strong className="text-white">{formData.interestCategory.toUpperCase()}</strong>.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-xl max-w-xs mx-auto border border-white/5 text-xs text-gray-400 font-mono flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4 text-gold-500" />
                    <span>Estimated Call: Today evening</span>
                  </div>
                </div>
              ) : (
                /* Standard form entries */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="name-input" className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest font-semibold">
                        Full Name *
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Anand Raju"
                        className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 focus:border-gold-400 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold-400 transition-all placeholder-gray-600"
                      />
                    </div>

                    {/* Email address */}
                    <div className="space-y-1.5">
                      <label htmlFor="email-input" className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest font-semibold">
                        Email Address *
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="e.g. anand@rajudesigns.com"
                        className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 focus:border-gold-400 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold-400 transition-all placeholder-gray-600"
                      />
                    </div>

                    {/* Telephone line */}
                    <div className="space-y-1.5">
                      <label htmlFor="phone-input" className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest font-semibold">
                        Phone Line *
                      </label>
                      <input
                        id="phone-input"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="e.g. +91 95332 12122"
                        className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 focus:border-gold-400 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold-400 transition-all placeholder-gray-600"
                      />
                    </div>

                    {/* Company (Optional) */}
                    <div className="space-y-1.5">
                      <label htmlFor="company-input" className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest font-semibold">
                        Enterprise/Company Profile
                      </label>
                      <input
                        id="company-input"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="e.g. Amaravati Builders"
                        className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 focus:border-gold-400 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold-400 transition-all placeholder-gray-600"
                      />
                    </div>

                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Interest Category Selector */}
                    <div className="space-y-1.5">
                      <label htmlFor="interestCategory-select" className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest font-semibold">
                        Interest Category Range
                      </label>
                      <select
                        id="interestCategory-select"
                        name="interestCategory"
                        value={formData.interestCategory}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 focus:border-gold-400 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold-400 transition-all"
                      >
                        {PRODUCT_CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.id} className="bg-slate-950 text-white">
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Slot reservation (Optional) */}
                    <div className="space-y-1.5">
                      <label htmlFor="appointmentDate-input" className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest font-semibold">
                        Requested Meeting Slot (Optional)
                      </label>
                      <input
                        id="appointmentDate-input"
                        type="date"
                        name="appointmentDate"
                        value={formData.appointmentDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 focus:border-gold-400 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold-400 transition-all placeholder-gray-600 font-sans"
                      />
                    </div>

                  </div>

                  {/* Message body */}
                  <div className="space-y-1.5">
                    <label htmlFor="message-textarea" className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest font-semibold">
                      Detailed Architecture Scope Summary
                    </label>
                    <textarea
                      id="message-textarea"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Outline any special dimension specs or custom configurations needed (e.g. glass railings with 12mm laminated glass, titanium PVD screens, etc.)."
                      className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 focus:border-gold-400 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold-400 transition-all placeholder-gray-600 resize-none"
                    />
                  </div>

                  {/* Submission dispatch Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group w-full py-4 px-6 rounded-xl bg-gradient-to-r from-gold-550 to-gold-450 hover:from-gold-600 hover:to-gold-400 text-white font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span>
                        {submitting ? "Processing specification..." : "Dispatch Secure Consultation Request"}
                      </span>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                    <span className="block text-[10px] text-center text-gray-500 font-mono mt-3 uppercase tracking-wide">
                      🔒 Enforced directly under 256-bit encryption compliance standards
                    </span>
                  </div>

                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
