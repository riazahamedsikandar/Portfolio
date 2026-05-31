/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useMotionValue, useTransform } from "motion/react";
import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Globe, 
  Award, 
  Code2, 
  Briefcase, 
  GraduationCap, 
  Printer,
  ChevronRight,
  Trophy,
  Users,
  Zap,
  Layers,
  ShieldCheck,
  BarChart3,
  Cpu,
  Database,
  Server,
  Smartphone,
  Laptop
} from "lucide-react";

export default function App() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState("All");

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
    setIsDownloading(true);

    try {
      // Temporarily add a class to body for specific print styling help if needed
      document.body.classList.add('is-printing');
      
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2.5, // Increased scale for ultra-crisp text
        useCORS: true,
        backgroundColor: "#ffffff",
        windowWidth: 800, // Sync with the resume container width
        logging: false,
        onclone: (clonedDoc) => {
          const styleElements = clonedDoc.querySelectorAll('style, link[rel="stylesheet"]');
          styleElements.forEach(el => el.remove());

          const pdfStyle = clonedDoc.createElement('style');
          pdfStyle.innerHTML = `
            * { box-sizing: border-box; -webkit-print-color-adjust: exact; }
            body { margin: 0; padding: 0; background: white !important; }
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap');
            [data-resume-root] { 
              display: block !important; 
              position: static !important; 
              left: 0 !important; 
              visibility: visible !important;
              font-family: 'Inter', Helvetica, Arial, sans-serif !important;
            }
          `;
          clonedDoc.head.appendChild(pdfStyle);

          const printArea = clonedDoc.querySelector('[data-resume-root]') as HTMLElement;
          if (printArea) {
            printArea.style.display = 'block';
            printArea.style.position = 'static';
            printArea.style.left = '0';
            printArea.style.visibility = 'visible';
            printArea.style.margin = '0 auto';
          }
        }
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // If content exceeds A4, this will still fit it to one page. 
      // For precise A4, we ensure the aspect ratio is correct.
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, Math.min(pdfHeight, 297));
      pdf.save("Riaz_Ahamed_Professional_Resume.pdf");
      
    } catch (error) {
      console.error("PDF download failed:", error);
      // Fallback is still window.print() but the primary goal is fixing the error
      window.print();
    } finally {
      document.body.classList.remove('is-printing');
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden print:bg-white print:text-black">
      
      {/* Printable Area (Ultra-Professional A4 Resume) */}
      <div 
        ref={resumeRef}
        data-resume-root
        className="fixed left-[-9999px] top-0 bg-white"
        style={{ 
          width: '800px', // A4 width @ 96dpi
          minHeight: '1130px', 
          padding: '50px 70px',
          color: '#111827', 
          fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          lineHeight: '1.4'
        }}
      >
        {/* Header Section */}
        <div style={{ borderBottom: '3px solid #1e40af', paddingBottom: '20px', marginBottom: '25px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '38px', fontWeight: '800', color: '#111827', margin: '0 0 5px 0', letterSpacing: '-0.04em' }}>RIAZ AHAMED</h1>
              <p style={{ fontSize: '16px', color: '#1e40af', fontWeight: '700', margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Senior AI Mobile & Full-Stack Developer</p>
            </div>
            <div style={{ textAlign: 'right', fontSize: '11px', color: '#4b5563', fontWeight: '500' }}>
              <p style={{ margin: '0 0 3px 0' }}>riazahamedsikandar@gmail.com | +91 8667632957</p>
              <p style={{ margin: '0 0 3px 0' }}>Coimbatore, Tamil Nadu, India</p>
              <p style={{ margin: '0 0 3px 0', fontWeight: 'bold', color: '#1e40af' }}>github.com/riazahamedsikandar</p>
              <p style={{ margin: '0', fontWeight: 'bold', color: '#10b981' }}>kitecampus.com | Live Mobile & Web Apps</p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div style={{ marginBottom: '22px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: '800', color: '#1e40af', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px', marginBottom: '8px' }}>Professional Profile</h2>
          <p style={{ fontSize: '12px', color: '#374151', margin: 0, textAlign: 'left', lineHeight: '1.45' }}>
            Result-driven <span style={{ fontWeight: 'bold' }}>Senior AI Mobile & Full-Stack Developer</span> with 5+ years of expertise. Creator and sole architect of <span style={{ fontWeight: 'bold' }}>KiteCampus School Ecosystem</span>, launching dual companion apps on Google Play Store with active web dashboards. Experienced in integrating <span style={{ fontWeight: 'bold' }}>AI APIs (OpenAI & Gemini)</span>, optimizing relational tables in <span style={{ fontWeight: 'bold' }}>MS SQL Server</span>, and compiling secure enterprise architectures with Zero API credentials leak.
          </p>
        </div>

        {/* Grid Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.67fr 1fr', gap: '30px' }}>
          
          {/* Main Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            
        {/* Experience */}
        <section>
          <h2 style={{ fontSize: '13px', fontWeight: '800', color: '#1e40af', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px', marginBottom: '12px' }}>Professional Experience</h2>
          
          <div style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
              <h3 style={{ fontSize: '12.5px', fontWeight: '850', color: '#111827', margin: 0 }}>Senior AI Mobile & Full-Stack Developer</h3>
              <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#6b7280' }}>2023 – Present</span>
            </div>
            <p style={{ color: '#1e40af', fontSize: '10.5px', fontWeight: '800', margin: '0 0 3px 0' }}>MOTIV8 STUDIOS | COIMBATORE, TN</p>
            <ul style={{ fontSize: '10px', color: '#374151', paddingLeft: '14px', margin: 0, listStyleType: 'square' }}>
              <li style={{ marginBottom: '2px' }}>Launched and compiled 20+ robust enterprise e-stores, custom companion apps, and dynamic tracking dashboards.</li>
              <li style={{ marginBottom: '2px' }}>Secured enterprise intellectual assets by encapsulating LLM calls (OpenAI & Gemini APIs) via strict server-side proxy routes.</li>
              <li style={{ marginBottom: '2px' }}>Optimized real-time notification push models in cross-platform mobile containers, securing 99.9% push delivery rates.</li>
              <li>Engineered custom server-side routing & token validation layers, eliminating browser-facing API credentials leakage.</li>
            </ul>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
              <h3 style={{ fontSize: '12.5px', fontWeight: '850', color: '#111827', margin: 0 }}>Full-Stack Developer (Freelance / Contract)</h3>
              <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#6b7280' }}>2024 – Present</span>
            </div>
            <p style={{ color: '#1e40af', fontSize: '10.5px', fontWeight: '800', margin: '0 0 3px 0' }}>GLOBAL VENTURES | COIMBATORE, TN (BUSINESS SOLUTIONS)</p>
            <ul style={{ fontSize: '10px', color: '#374151', paddingLeft: '14px', margin: 0, listStyleType: 'square' }}>
              <li style={{ marginBottom: '2px' }}>Designed & launched 15+ rich bespoke web systems, content widgets, and secure e-shops with PHP, React, and Tailwind.</li>
              <li style={{ marginBottom: '2px' }}>Integrated multi-currency online gateways (Stripe & Razorpay) and managed OAuth session lifetimes under sub-2s latency.</li>
              <li style={{ marginBottom: '2px' }}>Formulated relational databases on MS SQL, building optimized queries and customized views for advanced corporate analytics.</li>
              <li>Collaborated with global business clients to compile lightweight back-office panels, accelerating monthly checkout actions by 35%.</li>
            </ul>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
              <h3 style={{ fontSize: '12.5px', fontWeight: '850', color: '#111827', margin: 0 }}>Full-Stack Developer & Mobile Architect</h3>
              <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#6b7280' }}>2019 – 2023</span>
            </div>
            <p style={{ color: '#1e40af', fontSize: '10.5px', fontWeight: '800', margin: '0 0 3px 0' }}>ZEROMI INFOTECH | COIMBATORE, TN</p>
            <ul style={{ fontSize: '10px', color: '#374151', paddingLeft: '14px', margin: 0, listStyleType: 'square' }}>
              <li style={{ marginBottom: '2px' }}>Programmed premium cross-platform apps using Flutter/React Native with absolute offline SQLite and Hive data caching.</li>
              <li style={{ marginBottom: '2px' }}>Overhauled relational database schemas and stored procedures on physical SQL Server setups, lowering latencies by 40%.</li>
              <li style={{ marginBottom: '2px' }}>Wrote modular token-based REST APIs (JWT handshakes) accompanied by strict payload and security decoders.</li>
              <li>Built customized real-time micro-services to map academic indices and student registration sheets on legacy systems.</li>
            </ul>
          </div>
        </section>

            {/* Key Technical Projects */}
            <section style={{ marginBottom: '10px' }}>
              <h2 style={{ fontSize: '13px', fontWeight: '800', color: '#1e40af', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px', marginBottom: '10px' }}>Proprietary Products & Showcase Portfolios</h2>
              
              <div style={{ marginBottom: '8px' }}>
                <p style={{ fontSize: '11px', fontWeight: '800', color: '#111827', margin: '0 0 2px 0' }}>KITECAMPUS SCHOOL SYSTEM (My Proprietary Project)</p>
                <p style={{ fontSize: '9.5px', color: '#374151', margin: '0 0 3px 0', lineHeight: '1.25' }}>
                  Complete multi-tenant ecosystem. Twin live companion applications published on Google Play matching custom desktop administrative consoles.
                </p>
                <p style={{ fontSize: '8.5px', color: '#1e40af', margin: '0 0 4px 0', fontWeight: 'bold' }}>
                  Web: kitecampus.com | Parents App: play.google.com/store/apps/details?id=com.kitecampus.school | Staff App: play.google.com/store/apps/details?id=com.kitecampus.staff
                </p>
                <ul style={{ fontSize: '9px', color: '#4b5563', paddingLeft: '14px', margin: '0', listStyleType: 'square' }}>
                  <li style={{ marginBottom: '1px' }}><strong>Mobile Apps (Flutter):</strong> Drives class schedules, diary notifications, and push fee receipts for 10K+ installs.</li>
                  <li style={{ marginBottom: '1px' }}><strong>Admin Dashboard (Parcel):</strong> Ultra-lightweight bundler securing immediate sub-2s client load times.</li>
                </ul>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 10px' }}>
                <div>
                  <p style={{ fontSize: '9.5px', fontWeight: '800', color: '#111827', margin: '0 0 1px 0' }}>MASAGRO FOODS PORTAL</p>
                  <p style={{ fontSize: '8.5px', color: '#4b5563', margin: 0, lineHeight: '1.2' }}>B2B distributor platform tracking live inventory lists with automatic routing.</p>
                </div>
                <div>
                  <p style={{ fontSize: '9.5px', fontWeight: '800', color: '#111827', margin: '0 0 1px 0' }}>MAKE MY HOLIDAY TOURS</p>
                  <p style={{ fontSize: '8.5px', color: '#4b5563', margin: 0, lineHeight: '1.2' }}>Booking engine serving 2,000+ monthly clients with SMS flight alerts.</p>
                </div>
                <div>
                  <p style={{ fontSize: '9.5px', fontWeight: '800', color: '#111827', margin: '0 0 1px 0' }}>KGI SCHOOL PORTAL</p>
                  <p style={{ fontSize: '8.5px', color: '#4b5563', margin: 0, lineHeight: '1.2' }}>Role-based PHP portals handling academic grades and teacher-pupil journals.</p>
                </div>
                <div>
                  <p style={{ fontSize: '9.5px', fontWeight: '800', color: '#111827', margin: '0 0 1px 0' }}>EXPERIENCE REBOOT</p>
                  <p style={{ fontSize: '8.5px', color: '#4b5563', margin: 0, lineHeight: '1.2' }}>Optimized SQL configurations raising table query speeds by 55% with sub-2s response.</p>
                </div>
              </div>
              
              {/* Company IP Protected Banner */}
              <div style={{ marginTop: '13px', padding: '8px 12px', backgroundColor: '#fafafa', borderRadius: '6px', borderLeft: '3px solid #64748b' }}>
                <p style={{ fontSize: '9.5px', color: '#64748b', margin: 0, fontStyle: 'italic', lineHeight: '1.3' }}>
                  <strong>Enterprise IP Clause:</strong> Due to strict corporate Intellectual Property agreements with enterprise clients, several advanced AI-powered production systems (such as localized smart classification workflows) are kept confidential.
                </p>
              </div>
            </section>
          </div>

          {/* Right Column (Sidebar) */}
          <div style={{ borderLeft: '1px solid #f3f4f6', paddingLeft: '25px' }}>
            
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6b7280', marginBottom: '15px' }}>Core Expertise</h2>
              
              <div style={{ marginBottom: '15px' }}>
                <p style={{ fontSize: '11px', fontWeight: '800', color: '#111827', marginBottom: '4px' }}>AI & MOBILE DEVELOPMENT</p>
                <p style={{ fontSize: '10.5px', color: '#4b5563', margin: 0, lineHeight: '1.4' }}>Kotlin, Swift, React Native, Flutter, OpenAI & Gemini API Integration, Model Orchestration, SDK Linking.</p>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <p style={{ fontSize: '11px', fontWeight: '800', color: '#111827', marginBottom: '4px' }}>BACKEND & SERVICES</p>
                <p style={{ fontSize: '10.5px', color: '#4b5563', margin: 0, lineHeight: '1.4' }}>MS SQL Server, Postgres, Node.js, Express RESTful APIs, Secure Token Auth, On-Premise Servers.</p>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <p style={{ fontSize: '11px', fontWeight: '800', color: '#111827', marginBottom: '4px' }}>ENTERPRISE & SAAS</p>
                <p style={{ fontSize: '10.5px', color: '#4b5563', margin: 0, lineHeight: '1.4' }}>Multi-Tenant SaaS Architecture, Secure Data Synchronization, CI/CD, ERP Integration, SOP Documentation.</p>
              </div>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6b7280', marginBottom: '15px' }}>Key Strengths</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['AI/ML Model Pipelines', 'MS SQL Schema Design', 'Multi-tenant Isolation', 'Cross-Platform App Audits'].map(s => (
                  <div key={s} style={{ fontSize: '10.5px', padding: '6px 10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px', color: '#475569' }}>{s}</div>
                ))}
              </div>
            </section>

            <section style={{ marginBottom: '35px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6b7280', marginBottom: '15px' }}>Key Award</h2>
              <div style={{ padding: '15px 20px', backgroundColor: '#eff6ff', borderRadius: '12px', border: '2px solid #bfdbfe', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-10px', top: '-10px', opacity: 0.1 }}>
                  <Award size={60} color="#1e40af" />
                </div>
                <p style={{ fontSize: '12px', fontWeight: '800', color: '#1e40af', margin: 0, textTransform: 'uppercase' }}>PRODUCT INNOVATION AWARD</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', margin: '4px 0' }}>
                  <Trophy size={14} color="#3b82f6" />
                  <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#3b82f6', margin: 0 }}>2024–2025 Recognition</p>
                </div>
                <p style={{ fontSize: '10.5px', color: '#1e40af', margin: 0, fontWeight: '500', lineHeight: '1.4' }}>Awarded for excellence in <span style={{ fontWeight: 'bold' }}>SaaS & AI Prototype Design</span>, launching and connecting multi-tenant databases with 100% security coverage.</p>
              </div>
            </section>

            <section>
              <h2 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6b7280', marginBottom: '15px' }}>Education</h2>
              <div>
                <p style={{ fontSize: '12px', fontWeight: '800', color: '#111827', margin: 0 }}>B.Com (Computer Apps)</p>
                <p style={{ fontSize: '10.5px', color: '#4b5563', margin: '2px 0' }}>Dr. N.G.P. College of Arts & Science</p>
                <p style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 'bold', marginTop: '4px' }}>CLASS OF 2018</p>
              </div>
            </section>

          </div>
        </div>

        {/* Global Footer (Fixed Position) */}
        <div style={{ marginTop: '50px', borderTop: '1px solid #f3f4f6', paddingTop: '15px', textAlign: 'center' }}>
          <p style={{ fontSize: '10px', color: '#9ca3af', fontStyle: 'italic', margin: 0 }}>
            Proven record of 100% on-time pipeline launches. Active projects on play.google.com & github.com/riazahamedsikandar
          </p>
        </div>
      </div>
      
      {/* 3D Background Element */}
      <div className="fixed inset-0 pointer-events-none print:hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Hero / Header Section */}
      <header className="relative pt-24 pb-32 px-6 overflow-hidden print:pt-10 print:pb-10 print:bg-white print:text-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest print:hidden">
                <Code2 size={14} />
                Senior AI & Mobile Developer
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] print:text-5xl print:text-slate-900">
                RIAZ <br /> AHAMED
              </h1>
              
              <p className="text-lg md:text-2xl text-slate-400 font-medium max-w-xl print:text-slate-600">
                Architecting intelligent <span className="text-blue-400">AI-Powered Mobile Apps</span> using Flutter alongside robust, secure <span className="text-white print:text-slate-900 underline decoration-blue-500 underline-offset-4">Full-Stack Enterprise Portals</span>.
              </p>

              <div className="flex flex-wrap gap-6 text-sm text-slate-400 pt-4 print:text-slate-500">
                <ContactLink icon={<Mail size={16} />} text="riazahamedsikandar@gmail.com" href="mailto:riazahamedsikandar@gmail.com" />
                <ContactLink icon={<Phone size={16} />} text="+91 8667632957" href="tel:+918667632957" />
                <ContactLink icon={<MapPin size={16} />} text="Coimbatore, India" href="https://www.google.com/maps/place/Coimbatore,+Tamil+Nadu" />
              </div>

              {/* Launched Builds & Projects */}
              <div className="flex flex-wrap items-center gap-3 pt-2 print:hidden">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Launched Builds:</span>
                <a 
                  href="https://play.google.com/store/apps/details?id=com.kitecampus.school" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-blue-400 transition-colors bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 hover:border-blue-500/30"
                >
                  <Smartphone size={12} className="text-blue-400" />
                  KiteCampus School App
                </a>
                <a 
                  href="https://play.google.com/store/apps/details?id=com.kitecampus.staff" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-purple-400 transition-colors bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 hover:border-purple-500/30"
                >
                  <Smartphone size={12} className="text-purple-400" />
                  KiteCampus Staff App
                </a>
                <a 
                  href="https://kitecampus.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-emerald-400 transition-colors bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 hover:border-emerald-500/30"
                >
                  <Globe size={12} className="text-emerald-400" />
                  kitecampus.com
                </a>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex gap-4 pt-4 print:hidden"
              >
                <button 
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className={`group relative px-8 py-4 bg-white text-black font-bold rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer ${isDownloading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isDownloading ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Layers size={20} />
                    </motion.div>
                  ) : <Printer size={20} />}
                  {isDownloading ? "GENERATING..." : "DOWNLOAD RESUME"}
                  <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-10" />
                </button>
                <div className="flex items-center gap-2 px-4 border border-white/10 rounded-xl bg-white/5">
                  <a href="https://github.com/riazahamedsikandar" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    <Github size={20} className="text-slate-400 hover:text-blue-400" />
                  </a>
                </div>
              </motion.div>
            </motion.div>

            {/* Achievement Highlight */}
            <div className="lg:col-span-5 relative">
              <div className="hidden print:block mb-8 p-6 border-2 border-blue-600 rounded-3xl">
                <h3 className="text-xl font-black text-slate-900 mb-2 uppercase">PRODUCT INNOVATION AWARD (2024–2025)</h3>
                <p className="text-slate-600 text-sm">
                  Awarded for excellence in SaaS & AI application orchestration, deploying secure production code, and managing multi-tenant SQL structures.
                </p>
              </div>
              
              <div className="print:hidden">
                <TiltCard>
                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-600/40">
                        <Trophy size={32} className="text-white" />
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-emerald-400 tracking-[0.2em] uppercase">Recognition</p>
                        <p className="text-lg font-bold">2024–2025</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-black text-white leading-tight uppercase">APP ENGINEERING RECOGNITION</h3>
                      <p className="text-slate-400 text-sm mt-2 font-medium">
                        Awarded for compiling high-performance <span className="text-white">Flutter Mobile Apps</span> alongside generative AI/ML layers and secure enterprise on-premises database synchronization.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div className="flex -space-x-3">
                         {['FL', 'PT', 'MS', 'AI'].map((initial, i) => (
                          <div 
                            key={i} 
                            className={`w-11 h-11 rounded-full border-2 border-[#111114] flex items-center justify-center text-[10px] font-black text-white shadow-xl
                              ${i === 0 ? 'bg-blue-600' : i === 1 ? 'bg-purple-600' : i === 2 ? 'bg-emerald-600' : 'bg-slate-700'}`}
                            style={{ zIndex: 5 - i }}
                          >
                            {initial}
                          </div>
                        ))}
                        <div className="w-11 h-11 rounded-full border-2 border-[#111114] bg-emerald-600 flex items-center justify-center text-[10px] font-black shadow-lg shadow-emerald-500/40 z-10">
                          10K+
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active Mobile Installations</p>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="max-w-6xl mx-auto px-6 pb-32 space-y-32">
        


        {/* Core Expertise Grids */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 print:gap-4">
          {/* Strategic Professional Impact */}
          <SectionHeader title="Technical Impact" icon={<Zap className="text-yellow-400" />} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 md:col-span-3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#1a1a1e] border border-white/5 p-8 rounded-3xl"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="text-green-400" />
                AI Integration & App Engineering
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Established high-availability API bridges connecting front-end applications with advanced generative models. Handled local fallback states to maintain smooth app responsiveness.
              </p>
              <div className="flex flex-wrap gap-2">
                {["OpenAI APM", "Gemini Core", "Kotlin Sockets", "Token Safety"].map(s => (
                  <span key={s} className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-slate-400 font-bold uppercase tracking-widest">{s}</span>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#1a1a1e] border border-white/5 p-8 rounded-3xl"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BarChart3 className="text-blue-400" />
                MS SQL Optimization
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Optimized complex database schemas on on-premise MS SQL servers. Implemented stored procedure optimizations and refined indexed views, reducing average report generation latency by **55%**.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Schema Tuning", "Query Profiling", "On-Premise sync", "REST Mapping"].map(s => (
                  <span key={s} className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-slate-400 font-bold uppercase tracking-widest">{s}</span>
                ))}
              </div>
            </motion.div>
          </div>

          <SectionHeader title="Core Expertise" icon={<Layers className="text-blue-500" />} />
          
          <ExpertiseCard 
            title="AI Mobile Architecture"
            description="High-performance compiling of cross-platform (React Native) and native (Kotlin) app containers with API integrations for real-time model communication."
            icon={<Code2 className="text-blue-400" />}
            skills={["Android Kotlin", "React Native", "Google Play Console", "Push Service"]}
          />
          <ExpertiseCard 
            title="API & Backend Pipelines"
            description="Development of secure server-side architectures. Designed to manage on-premises database pipelines, handle secure authorization layers, and export stable Rest APIs."
            icon={<Layers className="text-purple-400" />}
            skills={["Node.js / Express", "MS SQL Server", "API Key Proxying", "Linux Docker"]}
          />
          <ExpertiseCard 
            title="Enterprise Integrations"
            description="Familiar executing custom middleware adapters, linking local ERP inventories with cloud databases, and establishing secure enterprise networks."
            icon={<Zap className="text-amber-400" />}
            skills={["ERP Connectors", "Secure API Gateway", "Database Replication", "SOP Documentation"]}
          />
        </section>

        {/* Proprietary Products & Strategic Portfolios */}
        <section className="space-y-12">
          <SectionHeader title="Proprietary Products & Strategic Portfolios" icon={<Globe className="text-emerald-400" />} />
          
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
            {/* Spotlight Card: KiteCampus */}
            <div className="xl:col-span-3 bg-gradient-to-br from-[#121215] via-[#15151c] to-[#111e25] border border-white/5 p-8 rounded-3xl relative overflow-hidden group flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-60 h-60 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full">
                    <Award size={12} />
                    My Custom Built Venture
                  </div>
                  {/* Action links */}
                  <div className="flex flex-wrap gap-2">
                    <a 
                      href="https://play.google.com/store/apps/details?id=com.kitecampus.school" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center gap-1.5 text-[9px] bg-blue-600/15 hover:bg-blue-600/35 text-blue-400 font-bold px-3 py-1.5 rounded-xl border border-blue-500/20 transition-all cursor-pointer"
                    >
                      <Smartphone size={12} /> Parents App
                    </a>
                    <a 
                      href="https://play.google.com/store/apps/details?id=com.kitecampus.staff" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center gap-1.5 text-[9px] bg-purple-600/15 hover:bg-purple-600/35 text-purple-400 font-bold px-3 py-1.5 rounded-xl border border-purple-500/20 transition-all cursor-pointer"
                    >
                      <Smartphone size={12} /> Teachers App
                    </a>
                    <a 
                      href="https://kitecampus.com" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center gap-1.5 text-[9px] bg-emerald-600/15 hover:bg-emerald-600/35 text-emerald-400 font-bold px-3 py-1.5 rounded-xl border border-emerald-500/20 transition-all cursor-pointer"
                    >
                      <Globe size={12} /> kitecampus.com
                    </a>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">KiteCampus Academic Framework</h3>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-semibold">
                    A comprehensive multi-tenant school administration system designed, crafted, and brought to market by me. It handles school syncing, push reports, fee logging, and classroom status maps natively.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-wider mb-1">Flutter Companion</p>
                    <p className="text-[11px] text-slate-400 font-medium">Dual active companion apps driving live homework, receipts, and classroom diary registers.</p>
                  </div>
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-wider mb-1">Parcel Bundler</p>
                    <p className="text-[11px] text-slate-400 font-medium">Web admin consoles optimized with custom bundlers for blistering sub-2s browser renders.</p>
                  </div>
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-wider mb-1">Database Sync</p>
                    <p className="text-[11px] text-slate-400 font-medium">Resilient sync channels linking local MS SQL registers with secure cloud Rest nodes.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Other 4 Key Portfolios Grid */}
            <div className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  title: "Masagro Foods Portal",
                  tech: "React / Node / SQL",
                  icon: <BarChart3 size={18} className="text-yellow-400" />,
                  desc: "B2B client distribution dashboard with geographical order routing and real-time inventory lists mapped securely."
                },
                {
                  title: "Make My Holiday Tours",
                  tech: "PHP / Postgres / APIs",
                  icon: <Globe size={18} className="text-blue-400" />,
                  desc: "Comprehensive travel network serving 2k+ monthly leads, sporting flight provider indexing and SMS transaction alerts."
                },
                {
                  title: "KGI School Portal",
                  tech: "PHP / MS SQL Server",
                  icon: <Users size={18} className="text-purple-400" />,
                  desc: "Highly secure role-based academic layout for grading registers, curriculum cards, and student logs tracking."
                },
                {
                  title: "Experience Reboot Engine",
                  tech: "MS SQL Optimizer",
                  icon: <Zap size={18} className="text-amber-500" />,
                  desc: "Deep procedural refactoring and index tuning executed on corporate database hubs, boosting report speeds by 55%."
                }
              ].map((proj, idx) => (
                <div key={idx} className="p-5 rounded-3xl bg-[#121215] border border-white/5 hover:border-emerald-500/20 hover:bg-[#15151c] transition-all flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2 bg-white/5 rounded-xl">{proj.icon}</div>
                      <span className="text-[9px] font-black tracking-widest uppercase text-slate-500">{proj.tech}</span>
                    </div>
                    <h4 className="text-sm font-black text-white uppercase tracking-tight">{proj.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-semibold">{proj.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategic Impact Section */}
        <section className="space-y-12">
          <SectionHeader title="Product & System Impact" icon={<Trophy className="text-amber-500" />} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-emerald-900/40 border border-emerald-500/20"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Smartphone size={20} className="text-emerald-400" />
                Mobile Launch Milestones
              </h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  Programmed and compiled **KiteCampus school companion applications** with premium visual fidelity.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  Managed the global Play Store lifecycle with **0 critical deployment errors**, navigating modern privacy and target level updates.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  Engineered offline-resilient Sync Bridges linking local desktop office machines with public cloud-native Node servers under 2s latency.
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-purple-900/40 border border-purple-500/20"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Layers size={20} className="text-purple-400" />
                AI Core Implementations
              </h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                  Architected real-time LLM chat systems with secure server-side proxy flows, fully hiding sensitive API keys from clients.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                  Pioneered robust localized categorization rules to process large client query batches with precise structural logging.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                  Successfully trained custom model templates on proprietary datasets with zero data leakage, validating absolute corporate IP safety.
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Technical Arsenal */}
        <section className="space-y-12">
          <SectionHeader title="Technical Arsenal" icon={<Code2 className="text-blue-500" />} />
          
          {/* Skill Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 justify-center pb-4 print:hidden">
            {["All", "Mobile Development", "AI & Backend", "Databases & DevOps"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedSkillCategory(cat)}
                className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 border cursor-pointer ${
                  selectedSkillCategory === cat
                    ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                    : "bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Flutter & Dart", category: "Mobile Development", level: "95%", status: "Core Stack", icon: "Smartphone", desc: "Flagship environment for compiling the custom parents and teaching apps of KiteCampus School suite with high runtime fluidity.", shadow: "group-hover:border-blue-500/30", outlineGlow: "bg-blue-500/10", labelColor: "text-blue-400" },
              { name: "React Native", category: "Mobile Development", level: "90%", status: "Advanced", icon: "Smartphone", desc: "Cross-platform application builds, utilizing robust offline context state caching and customized platform integrations.", shadow: "group-hover:border-cyan-500/30", outlineGlow: "bg-cyan-500/10", labelColor: "text-cyan-400" },
              { name: "Android Kotlin", category: "Mobile Development", level: "85%", status: "Advanced", icon: "Smartphone", desc: "Native environment configurations, background thread dispatchers, and conforming fully to modern Play Store privacy mandates.", shadow: "group-hover:border-emerald-500/30", outlineGlow: "bg-emerald-500/10", labelColor: "text-emerald-400" },
              
              { name: "OpenAI / Gemini Core", category: "AI & Backend", level: "94%", status: "Expert", icon: "Cpu", desc: "Integrating prompt chaining pipelines alongside custom backend servers to guarantee enterprise data security from client exposure.", shadow: "group-hover:border-purple-500/30", outlineGlow: "bg-purple-500/10", labelColor: "text-purple-400" },
              { name: "Node.js & Express", category: "AI & Backend", level: "93%", status: "Core Stack", icon: "Server", desc: "Engineering multi-tenant routing architectures, REST compliance endpoints, authentication handshakes, and third-party payment gateways.", shadow: "group-hover:border-emerald-500/30", outlineGlow: "bg-emerald-500/10", labelColor: "text-emerald-400" },
              { name: "React / Next.js", category: "AI & Backend", level: "95%", status: "Expert", icon: "Laptop", desc: "Crafting fluid interactive single-page dashboards and modular views styled with responsive, mobile-first layouts.", shadow: "group-hover:border-cyan-400/30", outlineGlow: "bg-cyan-400/10", labelColor: "text-cyan-400" },
              { name: "TypeScript", category: "AI & Backend", level: "91%", status: "Intermediate", icon: "Code2", desc: "Enforcing strict compiling safety, logical interfaces typing, and secure schemas validations across diverse frontend models.", shadow: "group-hover:border-indigo-500/30", outlineGlow: "bg-indigo-500/10", labelColor: "text-indigo-400" },
              
              { name: "MS SQL Server", category: "Databases & DevOps", level: "95%", status: "Core Stack", icon: "Database", desc: "Tuning enterprise on-premises tabular registers. Overhauled stored procedures and indexed tables to drop runlatencies by 55%.", shadow: "group-hover:border-red-500/30", outlineGlow: "bg-red-500/10", labelColor: "text-red-400" },
              { name: "PostgreSQL & PHP", category: "Databases & DevOps", level: "88%", status: "Advanced", icon: "Database", desc: "Drafting relational models, transactional integrity boundaries, and MVC routing structures for backend services.", shadow: "group-hover:border-orange-500/30", outlineGlow: "bg-orange-500/10", labelColor: "text-orange-400" },
              { name: "Parcel & Bundlers", category: "Databases & DevOps", level: "90%", status: "Advanced", icon: "Laptop", desc: "High-performance modular web asset bundler utilized in KiteCampus web system to compress scripts for immediate sub-2s client rendering.", shadow: "group-hover:border-amber-500/30", outlineGlow: "bg-amber-500/10", labelColor: "text-amber-400" },
              { name: "Docker & Linux", category: "Databases & DevOps", level: "86%", status: "Advanced", icon: "Layers", desc: "Managing clean, isolated container setups, configuring inbound network routing ports, and deploying secure system backups.", shadow: "group-hover:border-sky-500/30", outlineGlow: "bg-sky-500/10", labelColor: "text-sky-400" },
              { name: "Tailwind CSS & SaaS", category: "Databases & DevOps", level: "95%", status: "Expert", icon: "Zap", desc: "Building beautiful fluid templates with modern semantic grids, custom aesthetic parameters, and total responsive screen scaling.", shadow: "group-hover:border-yellow-500/30", outlineGlow: "bg-yellow-500/10", labelColor: "text-yellow-400" },
            ]
              .filter((s) => selectedSkillCategory === "All" || s.category === selectedSkillCategory)
              .map((tech) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={tech.name}
                  className="group relative p-6 bg-[#121215] border border-white/5 rounded-3xl transition-all duration-500 flex flex-col justify-between hover:bg-[#15151c]/70 hover:border-white/10"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-xl text-slate-400 group-hover:text-white transition-colors duration-300 ${tech.outlineGlow}`}>
                        {tech.icon === "Smartphone" && <Smartphone size={18} />}
                        {tech.icon === "Cpu" && <Cpu size={18} />}
                        {tech.icon === "Server" && <Server size={18} />}
                        {tech.icon === "Database" && <Database size={18} />}
                        {tech.icon === "Layers" && <Layers size={18} />}
                        {tech.icon === "Zap" && <Zap size={18} />}
                        {tech.icon === "Laptop" && <Laptop size={18} />}
                        {tech.icon === "Code2" && <Code2 size={18} />}
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 bg-white/5 border border-white/5 rounded-md ${tech.labelColor}`}>
                          {tech.status}
                        </span>
                        <span className="text-xs font-black text-white">{tech.level}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="text-base font-black text-white uppercase tracking-tight group-hover:text-white transition-colors">
                        {tech.name}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                        {tech.desc}
                      </p>
                    </div>
                  </div>
                  
                  {/* Glowing progress line on hover */}
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-5">
                    <div 
                      className={`h-full bg-gradient-to-r transition-all duration-500 ${
                        tech.name.includes("Flutter") ? "from-blue-500 to-cyan-400" :
                        tech.name.includes("React Native") ? "from-cyan-400 to-indigo-500" :
                        tech.name.includes("Kotlin") ? "from-emerald-500 to-teal-400" :
                        tech.name.includes("OpenAI") ? "from-purple-500 to-pink-500" :
                        tech.name.includes("Node.js") ? "from-green-500 to-emerald-400" :
                        tech.name.includes("React") ? "from-cyan-400 to-sky-400" :
                        tech.name.includes("SQL") ? "from-red-500 to-orange-500" :
                        "from-indigo-400 to-purple-550"
                      }`}
                      style={{ width: tech.level }} 
                    />
                  </div>
                </motion.div>
              ))}
          </div>
        </section>

        {/* Experience Roadmap */}
        <section className="space-y-12">
          <SectionHeader title="Professional Roadmap" icon={<Briefcase className="text-blue-500" />} />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
              <TimelineItem 
                title="Full-Stack Developer (Freelance / Contract)"
                company="Global Ventures (Business Platforms)"
                period="2024 – Present"
                description="Engineered high-performance custom business web systems, creating responsive interactive templates, admin dashboards, and secure backend APIs."
                achievements={[
                  "Designed & launched 15+ rich bespoke web systems, content widgets, and secure e-shops with PHP, React, and Tailwind CSS.",
                  "Integrated secure multi-currency checkouts (Stripe & Razorpay) and managed OAuth session lifetimes under sub-2s latency.",
                  "Developed relational databases on MS SQL, building optimized queries, stored procedures, and customized indices drop latency by 45%.",
                  "Collaborated closely with domestic & global business clients to compile lightweight back-office panels, accelerating monthly checkout actions."
                ]}
                active
              />

              <TimelineItem 
                title="Senior AI Mobile & Full-Stack Developer"
                company="Motiv8 Studios (Digital & AI Systems)"
                period="2023 – Present"
                description="Lead developer architecting multi-tenant web portals, building native and cross-platform mobile apps, and integrating advanced intelligence models into live workflows."
                achievements={[
                  "Successfully compiled and deployed 20+ enterprise ecommerce portfolios, custom booking platforms, and administrative consoles.",
                  "Architected real-time AI prompt flows (OpenAI and Gemini API) with secure, highly isolated server-side proxy layers.",
                  "Engineered robust containerized microservices to guarantee 0% credential leakage from client browser interactions.",
                  "Optimized real-time notification push channels in cross-platform mobile app containers, elevating push delivery success by 30%."
                ]}
                active
              />

              <TimelineItem 
                title="Full-Stack Developer (Mobile Architect)"
                company="Zeromi Infotech (SaaS Platforms)"
                period="2019 – 2023"
                description="Engineered high-performance cross-platform fluid mobile apps and optimized relational databases for creative and academic applications."
                achievements={[
                  "Built native-grade companion mobile apps using Flutter and React Native with robust local SQLite and Hive caching engines.",
                  "Refactored complex on-premises MS SQL Server structures, reducing database query latencies by 40%.",
                  "Structured custom RESTful token handshakes (JWT), session authorization rules, and billing checkout connectors.",
                  "Created real-time integration pipelines mapping legacy attendance registers and pupil transcripts onto public databases secure nodes."
                ]}
                active
              />

              {/* Projects Grid Integrated into Timeline area */}
              <div className="pt-8 space-y-8">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-bold uppercase tracking-tighter text-slate-400 print:text-slate-900">Featured Web & Mobile Portfolios</h3>
                  <div className="flex-1 h-px bg-white/5 print:bg-slate-200" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <ProjectCard 
                    title="KiteCampus Ecosystem"
                    tech="Flutter, Dart, Parcel"
                    description="Self-engineered school digitization framework comprising twin companion mobile apps and optimized web administrative tools."
                  />
                  <ProjectCard 
                    title="Masagro Foods"
                    tech="E-Commerce, SQL, Auto-routing"
                    description="E-commerce distribution hub with integrated automated routing and real-time stock lists."
                  />
                  <ProjectCard 
                    title="Make My Holiday Tours"
                    tech="PHP, MS SQL, API Sync"
                    description="Scalable travel site with real-time flight metrics, customized pricing tables, and SMS logs."
                  />
                  <ProjectCard 
                    title="KGI School Portal"
                    tech="PHP, MS SQL Server, Grades"
                    description="Secure academic database schema and student performance tracking application."
                  />
                  <ProjectCard 
                    title="Experience Reboot"
                    tech="SQL Query Tuning, Procedures"
                    description="High-speed procedural database optimizer slicing queries to secure under-2s response delays."
                  />
                </div>
              </div>
            </div>

            <aside className="lg:col-span-4 space-y-8">
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl print:bg-white print:text-slate-900 print:border-slate-200">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <GraduationCap className="text-blue-500" />
                  Education
                </h3>
                <div className="space-y-2">
                  <p className="font-bold">B.Com (Computer Apps)</p>
                  <p className="text-sm text-slate-400 print:text-slate-600">Dr. N.G.P. Arts and Science College</p>
                  <p className="text-xs text-blue-500 font-bold uppercase tracking-widest mt-1">Class of 2018</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-8 rounded-3xl shadow-xl shadow-teal-900/40 flex flex-col justify-between min-h-[240px] print:hidden">
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-white italic">"Polished Mobile App Engineering."</h3>
                  <p className="text-white/80 text-sm font-medium">Combining high-impact model workflows with bulletproof mobile performance.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Smartphone size={20} className="text-white" />
                  </div>
                  <p className="text-sm font-bold">10K+ App Installs & Users</p>
                </div>
              </div>

              <div className="p-8 rounded-3xl border border-white/10 bg-white/5 space-y-6 print:border-slate-200">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Trophy size={20} className="text-amber-500" />
                  Core Values
                </h3>
                <div className="space-y-4">
                  <ValueItem title="Corporate IP Safety" text="Strict wrapping of server secrets, proxying prompt paths, and securing local SQL endpoints." />
                  <ValueItem title="Scalability" text="Setting up true scalable system configurations, resilient SQL databases, and custom REST API nodes." />
                  <ValueItem title="On-time Delivery" text="Zero compromise on product completeness, utilizing high-quality testing to bypass delivery bottlenecks." />
                </div>
              </div>
            </aside>
          </div>
        </section>

      </main>

      <footer className="py-20 border-t border-white/5 bg-black/50 backdrop-blur-sm print:py-10 print:bg-white print:text-slate-900 print:border-slate-200">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-black tracking-tighter">RIAZ AHAMED</h2>
            <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Coimbatore, India</p>
          </div>
          <div className="flex gap-4 print:hidden">
            <button onClick={handleDownloadPDF} disabled={isDownloading} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all disabled:opacity-50">
              {isDownloading ? "PLEASE WAIT..." : "DOWNLOAD RESUME PDF"}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ValueItem({ title, text }: any) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-black text-blue-400 uppercase tracking-widest">{title}</p>
      <p className="text-sm text-slate-400 print:text-slate-600 leading-snug">{text}</p>
    </div>
  )
}

function ContactLink({ icon, text, href }: any) {
  return (
    <a 
      href={href || "#"} 
      target={href?.startsWith('http') ? "_blank" : undefined}
      rel="noreferrer"
      className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group/link"
    >
      <span className="text-blue-500 group-hover/link:scale-110 transition-transform">{icon}</span>
      {text}
    </a>
  );
}

function SectionHeader({ title, icon }: any) {
  return (
    <div className="md:col-span-3 flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 print:bg-slate-100 print:border-slate-200">
        {icon}
      </div>
      <h2 className="text-3xl font-black uppercase tracking-tighter print:text-2xl print:text-slate-900">{title}</h2>
      <div className="flex-1 h-px bg-white/10 print:bg-slate-200" />
    </div>
  );
}

function ExpertiseCard({ title, description, icon, skills }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:bg-white/[0.07] print:bg-white print:text-slate-900 print:border-slate-200 group"
    >
      <div className="mb-6 group-hover:scale-110 transition-transform duration-500">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-sm text-slate-400 mb-6 leading-relaxed print:text-slate-600">{description}</p>
      <div className="flex flex-wrap gap-2">
        {skills.map((s: any) => (
          <span key={s} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white/5 rounded border border-white/10 print:bg-slate-100 print:border-slate-200 print:text-slate-500">
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function TimelineItem({ title, company, period, description, achievements, active = false }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="group relative pl-8 pb-12 last:pb-0"
    >
      <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 group-last:h-4 print:bg-slate-200" />
      <div className={`absolute left-[-4px] top-1.5 w-2.5 h-2.5 rounded-full transition-all duration-300 ${active ? 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.8)]' : 'bg-slate-800 border border-white/20 print:bg-slate-300'}`} />
      
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className={`text-xl font-black ${active ? 'text-white print:text-slate-900' : 'text-slate-300 print:text-slate-700'}`}>{title}</h3>
            <p className="text-blue-500 font-bold uppercase tracking-widest text-[10px] mt-1">{company}</p>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-white/5 border border-white/10 rounded-full text-slate-500 print:border-slate-200">
            {period}
          </span>
        </div>
        
        <p className="text-sm text-slate-400 leading-relaxed print:text-slate-600">{description}</p>
        
        <ul className="space-y-2 pt-2">
          {achievements.map((a: any, i: number) => (
            <li key={i} className="text-xs text-slate-500 flex items-start gap-2 group-hover:text-slate-300 transition-colors duration-300 print:text-slate-500">
              <ChevronRight size={14} className="text-blue-600 mt-0.5 shrink-0" />
              {a}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function ProjectCard({ title, tech, description }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all hover:bg-white/[0.08] group relative"
    >
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors uppercase tracking-tight">{title}</h3>
        <a href="https://github.com/riazahamedsikandar" target="_blank" rel="noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity">
          <Github size={14} className="text-slate-500 hover:text-white" />
        </a>
      </div>
      <p className="text-[10px] uppercase tracking-[0.2em] font-black text-blue-500/80 mb-3">{tech}</p>
      <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors">{description}</p>
    </motion.div>
  );
}

// 3D Tilt Card Component
function TiltCard({ children }: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [15, -15]);
  const rotateY = useTransform(mouseX, [0, 1], [-15, 15]);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = event.clientX - rect.left;
    const mouseYPos = event.clientY - rect.top;
    
    mouseX.set(mouseXPos / width);
    mouseY.set(mouseYPos / height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div 
      className="perspective-1000 print:hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative bg-[#1a1a1e] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div style={{ transform: "translateZ(80px)" }} className="relative z-10 preserve-3d">
          {children}
        </div>
        
        {/* Glow effect */}
        <motion.div 
          style={{
            left: useTransform(mouseX, [0, 1], ['-20%', '20%']),
            top: useTransform(mouseY, [0, 1], ['-20%', '20%']),
          }}
          className="absolute -inset-[20%] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"
        />
      </motion.div>
    </div>
  );
}

