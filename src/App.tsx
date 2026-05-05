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
  Layers
} from "lucide-react";

export default function App() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
    setIsDownloading(true);

    try {
      // Temporarily add a class to body for specific print styling help if needed
      document.body.classList.add('is-printing');
      
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        windowWidth: 1200, 
        logging: false,
        onclone: (clonedDoc) => {
          // REMOVE ALL GLOBAL STYLES to prevent html2canvas from failing on Tailwind's oklch colors
          const styleElements = clonedDoc.querySelectorAll('style, link[rel="stylesheet"]');
          styleElements.forEach(el => el.remove());

          // Add a minimal reset for the PDF capture
          const pdfStyle = clonedDoc.createElement('style');
          pdfStyle.innerHTML = `
            * { box-sizing: border-box; -webkit-print-color-adjust: exact; }
            body { margin: 0; padding: 0; background: white !important; }
            [data-resume-root] { 
              display: block !important; 
              position: static !important; 
              left: 0 !important; 
              visibility: visible !important;
            }
          `;
          clonedDoc.head.appendChild(pdfStyle);

          const printArea = clonedDoc.querySelector('[data-resume-root]') as HTMLElement;
          if (printArea) {
            printArea.style.display = 'block';
            printArea.style.position = 'static';
            printArea.style.left = '0';
            printArea.style.visibility = 'visible';
          }
        }
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("Riaz_Ahamed_Resume.pdf");
      
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
          width: '794px', // A4 width at 96 DPI
          minHeight: '1123px', // A4 height at 96 DPI
          padding: '40px 50px',
          color: '#1f2937', 
          fontFamily: 'Helvetica, Arial, sans-serif',
          lineHeight: '1.5'
        }}
      >
        {/* Header Section */}
        <div style={{ borderBottom: '2px solid #2563eb', paddingBottom: '20px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', margin: '0 0 4px 0', letterSpacing: '-0.02em' }}>RIAZ AHAMED</h1>
            <p style={{ fontSize: '15px', color: '#2563eb', fontWeight: '700', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Technical Team Lead | Operations IT Specialist</p>
          </div>
          <div style={{ textAlign: 'right', fontSize: '11px', color: '#4b5563', lineHeight: '1.8' }}>
            <p style={{ margin: 0 }}>riazahamedsikandar@gmail.com</p>
            <p style={{ margin: 0 }}>+91 8667632957</p>
            <p style={{ margin: 0 }}>Coimbatore, Tamil Nadu, India</p>
            <p style={{ margin: 0, fontWeight: 'bold', color: '#2563eb' }}>github.com/riazahamedsikandar</p>
          </div>
        </div>

        {/* Professional Summary */}
        <div style={{ marginBottom: '35px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 'bold', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.12em', borderBottom: '1px solid #e5e7eb', paddingBottom: '6px', marginBottom: '10px' }}>Professional Summary</h2>
          <p style={{ fontSize: '12.5px', color: '#374151', margin: 0, textAlign: 'justify' }}>
            High-impact **Technical Team Lead** with extensive experience in driving operational excellence through technology. Awarded **"Best Team" in 2025** for maintaining a **100% On-Time Delivery** record across complex SCM IT deployments. Architect of scalable business portals and automated logistics solutions that bridge the gap between technical engineering and operational strategy.
          </p>
        </div>

        {/* Main Content: Two Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '40px' }}>
          
          {/* Left Column: Sidebar-style */}
          <div style={{ borderRight: '1px solid #f3f4f6', paddingRight: '20px' }}>
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6b7280', marginBottom: '15px' }}>Expertise & Skills</h2>
              
              <div style={{ marginBottom: '15px' }}>
                <p style={{ fontSize: '11px', fontWeight: '800', color: '#111827', marginBottom: '4px' }}>LEADERSHIP</p>
                <p style={{ fontSize: '10.5px', color: '#4b5563', margin: 0 }}>Agile/Scrum, Team Mentoring, Resource Mgmt, SDLC Optimization, Project Delivery</p>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <p style={{ fontSize: '11px', fontWeight: '800', color: '#111827', marginBottom: '4px' }}>FULL-STACK TECH</p>
                <p style={{ fontSize: '10.5px', color: '#4b5563', margin: 0 }}>React, Node.js, PHP, SQL, Firebase, Cloud Architecture, Git/GitHub, CI/CD</p>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <p style={{ fontSize: '11px', fontWeight: '800', color: '#111827', marginBottom: '4px' }}>OPERATIONS IT</p>
                <p style={{ fontSize: '10.5px', color: '#4b5563', margin: 0 }}>WMS Integration, ERP Systems, Logistics APIs, Data Automation, Real-time Alerts</p>
              </div>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6b7280', marginBottom: '15px' }}>Top Awards</h2>
              <div style={{ padding: '12px', backgroundColor: '#f0f7ff', borderRadius: '8px', borderLeft: '4px solid #2563eb' }}>
                <p style={{ fontSize: '11.5px', fontWeight: 'bold', color: '#111827', margin: 0 }}>BEST TEAM AWARD</p>
                <p style={{ fontSize: '10px', color: '#2563eb', fontWeight: 'bold', margin: '2px 0 4px 0' }}>SCM IT Department – 2025</p>
                <p style={{ fontSize: '10px', color: '#4b5563', margin: 0 }}>Achieved 100% on-time delivery with zero-defect deployments.</p>
              </div>
            </section>

            <section>
              <h2 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6b7280', marginBottom: '15px' }}>Education</h2>
              <div>
                <p style={{ fontSize: '11.5px', fontWeight: 'bold', color: '#111827', margin: 0 }}>B.Com (Computer Apps)</p>
                <p style={{ fontSize: '10.5px', color: '#4b5563', margin: '2px 0 0 0' }}>Dr. N.G.P. Arts and Science College</p>
                <p style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 'bold', marginTop: '2px' }}>CONFERRED 2018</p>
              </div>
            </section>
          </div>

          {/* Right Column: Experience */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <section>
              <h2 style={{ fontSize: '13px', fontWeight: 'bold', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.12em', borderBottom: '1px solid #e5e7eb', paddingBottom: '6px', marginBottom: '20px' }}>Professional Experience</h2>
              
              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#111827', margin: 0 }}>Technical Team Lead & IT Operations</h3>
                  <span style={{ fontSize: '10.5px', fontWeight: 'bold', color: '#6b7280' }}>2024 – PRESENT</span>
                </div>
                <p style={{ color: '#2563eb', fontSize: '11px', fontWeight: 'bold', margin: '0 0 10px 0' }}>SCM IT SOLUTIONS | COIMBATORE, INDIA</p>
                <ul style={{ fontSize: '12px', color: '#374151', paddingLeft: '18px', margin: 0, listStyleType: 'square' }}>
                  <li style={{ marginBottom: '6px' }}>Directing a cross-functional team of **15+ engineers** in building mission-critical SCM portals and logistics automation tools.</li>
                  <li style={{ marginBottom: '6px' }}>Maintained a **100% On-Time Delivery** track record for all major system releases in 2024 and 2025.</li>
                  <li style={{ marginBottom: '6px' }}>Lead the successful migration of legacy local datasets to high-availability cloud infrastructure, reducing system latency by 45%.</li>
                  <li>Reduced production bug incidents by 60% through the implementation of automated testing and CI/CD pipelines.</li>
                </ul>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#111827', margin: 0 }}>Technical Team Lead</h3>
                  <span style={{ fontSize: '10.5px', fontWeight: 'bold', color: '#6b7280' }}>2019 – 2023</span>
                </div>
                <p style={{ color: '#2563eb', fontSize: '11px', fontWeight: 'bold', margin: '0 0 10px 0' }}>MOTIV8 STUDIOS / ZEROMIE | TAMIL NADU</p>
                <ul style={{ fontSize: '12px', color: '#374151', paddingLeft: '18px', margin: 0, listStyleType: 'square' }}>
                  <li style={{ marginBottom: '6px' }}>Managed the full development lifecycle for **20+ enterprise-grade** web products and role-based client dashboards.</li>
                  <li style={{ marginBottom: '6px' }}>Spearheaded UI/UX and backend performance tuning, resulting in a **40% increase** in application speed.</li>
                  <li>Successfully delivered high-performance web solutions for global clients under strict on-time project timelines.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 style={{ fontSize: '13px', fontWeight: 'bold', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.12em', borderBottom: '1px solid #e5e7eb', paddingBottom: '6px', marginBottom: '15px' }}>Key Impact Projects</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div style={{ backgroundColor: '#f9fafb', padding: '12px', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
                  <p style={{ fontSize: '11px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#111827' }}>TRAVEL LOGISTICS ENGINE</p>
                  <p style={{ fontSize: '10px', color: '#6b7280', margin: 0 }}>Built a travel portal serving 2K+ monthly users with automated secure booking and payment modules.</p>
                </div>
                <div style={{ backgroundColor: '#f9fafb', padding: '12px', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
                  <p style={{ fontSize: '11px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#111827' }}>OPERATIONAL DASHBOARDS</p>
                  <p style={{ fontSize: '10px', color: '#6b7280', margin: 0 }}>Architected complex role-based systems for academic and enterprise portal management.</p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer for PDF */}
        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #f3f4f6', textAlign: 'center' }}>
          <p style={{ fontSize: '10px', color: '#9ca3af', fontStyle: 'italic', margin: 0 }}>References and complete project portfolio are available upon professional request.</p>
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
                <Zap size={14} />
                Operations IT Specialist
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] print:text-5xl print:text-slate-900">
                RIAZ <br /> AHAMED
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-xl print:text-slate-600">
                Bridging the gap between <span className="text-blue-400">Technical Leadership</span> and <span className="text-white print:text-slate-900 underline decoration-blue-500 underline-offset-4">Supply Chain Operations</span>.
              </p>

              <div className="flex flex-wrap gap-6 text-sm text-slate-400 pt-4 print:text-slate-500">
                <ContactLink icon={<Mail size={16} />} text="riazahamedsikandar@gmail.com" href="mailto:riazahamedsikandar@gmail.com" />
                <ContactLink icon={<Phone size={16} />} text="+91 8667632957" href="tel:+918667632957" />
                <ContactLink icon={<MapPin size={16} />} text="Coimbatore, India" href="https://www.google.com/maps/place/Coimbatore,+Tamil+Nadu" />
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
                  {isDownloading ? "GENERATING..." : "DOWNLOAD PDF"}
                  <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-10" />
                </button>
                <div className="flex items-center gap-2 px-4 border border-white/10 rounded-xl bg-white/5">
                  <a href="https://github.com/riazahamedsikandar" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    <Github size={20} className="text-slate-400 hover:text-blue-400" />
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    <Globe size={20} className="text-slate-400 hover:text-blue-400" />
                  </a>
                </div>
              </motion.div>
            </motion.div>

            {/* Achievement Highlight */}
            <div className="lg:col-span-5 relative">
              <div className="hidden print:block mb-8 p-6 border-2 border-blue-600 rounded-3xl">
                <h3 className="text-xl font-black text-slate-900 mb-2 uppercase">BEST TEAM AWARD (2025)</h3>
                <p className="text-slate-600 text-sm">
                  Awarded for outstanding technical leadership and maintaining 100% On-Time project delivery record with bug-free deployments in SCM operations.
                </p>
              </div>
              
              <div className="print:hidden">
                <TiltCard>
                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/40">
                        <Trophy size={32} className="text-white" />
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-blue-400 tracking-[0.2em] uppercase">Recognition</p>
                        <p className="text-lg font-bold">2025 Award</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-black text-white leading-tight uppercase">BEST TEAM AWARD</h3>
                      <p className="text-slate-400 text-sm mt-2 font-medium">
                        Awarded in <span className="text-white">2025</span> for maintaining a <span className="text-blue-400 font-bold">100% On-Time Delivery</span> record and deploying bug-free SCM infrastructure solutions.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div className="flex -space-x-2">
                         {[0,1,2,3].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-[#1a1a1e] bg-slate-800" />
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-[#1a1a1e] bg-blue-600 flex items-center justify-center text-[10px] font-bold">
                          15+
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Team Size Managed</p>
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
          <SectionHeader title="Core Expertise" icon={<Layers className="text-blue-500" />} />
          
          <ExpertiseCard 
            title="Technical Leadership"
            description="Driving team excellence through modern SDLC practices, mentorship, and cloud-native architecture. Transformed legacy SCM systems into high-performance digital assets."
            icon={<Users className="text-blue-400" />}
            skills={["Agile/Scrum", "CI/CD Pipelines", "Code Review Standards", "Technical Mentorship"]}
          />
          <ExpertiseCard 
            title="Full-Stack Engineering"
            description="Architecture of scalable business portals using the MERN stack and PHP/SQL. Focused on high-concurrency data handling for real-time logistics tracking."
            icon={<Code2 className="text-purple-400" />}
            skills={["React/Next.js", "Node.js", "Docker", "Firebase", "Advanced SQL"]}
          />
          <ExpertiseCard 
            title="SCM Operations IT"
            description="Deep integration of IT infrastructure with Warehouse Management (WMS) and ERP systems. Bridging operational gaps with custom automation scripts."
            icon={<Zap className="text-amber-400" />}
            skills={["ERP Integration", "Warehouse Automation", "Logistics APIs", "System Architecture"]}
          />
        </section>

        {/* Strategic Impact Section - NEW */}
        <section className="space-y-12">
          <SectionHeader title="Team & Operational Impact" icon={<Trophy className="text-amber-500" />} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-blue-900/40 border border-blue-500/20"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Users size={20} className="text-blue-400" />
                Team Transformation
              </h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  Implemented **Code Quality Standards** and peer review cycles, reducing production bugs by 40%.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  Mentored 10+ junior developers, leading to 3 internal promotions and a **100% team retention rate** during my tenure.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  Established **Agile Scrum workflows**, improving project delivery speed by 25%.
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
                Technical Initiatives
              </h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                  Architected a **Unified API Layer** for SCM, consolidating disparate data sources into a single source of truth.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                  Reduced system downtime by 60% through the implementation of **real-time monitoring** and automated alert systems.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                  Automated high-volume inventory reporting, saving the operations team **20+ manual hours per week**.
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="space-y-12">
          <SectionHeader title="Professional Roadmap" icon={<Briefcase className="text-blue-500" />} />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
              <TimelineItem 
                title="Technical Team Lead & IT Operations"
                company="SCM IT Solutions (Supply Chain)"
                period="Feb 2024 – Present"
                description="Promoted to lead the technical transformation of the supply chain department. Responsible for modernizing legacy IT operations and managing a diverse team of 15+ developers and specialists."
                achievements={[
                  "Won the prestigious 'BEST TEAM AWARD' in 2025 for maintaining 100% On-Time project delivery without compromising on code quality.",
                  "Successfully spearheaded the migration of legacy data systems to a high-availability cloud architecture, achieving zero downtime during peak seasonal traffic.",
                  "Reduced technical debt by lead-refactoring core ERP modules, resulting in a 50% decrease in bug-related monthly support tickets.",
                  "Introduced highly efficient CI/CD pipelines, ensuring rapid and bug-free on-time deployment for all new SCM features."
                ]}
                active
              />

              {/* Projects Grid Integrated into Timeline area */}
              <div className="pt-8 space-y-8">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-bold uppercase tracking-tighter text-slate-400 print:text-slate-900">Featured Technical Work</h3>
                  <div className="flex-1 h-px bg-white/5 print:bg-slate-200" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ProjectCard 
                    title="Masagro Foods"
                    tech="WordPress, Dynamic, SEO"
                    description="Developed a high-concurrency food product portal with automated customer inquiry routing."
                  />
                  <ProjectCard 
                    title="Make My Holiday Tours"
                    tech="PHP, SQL, Dynamic, SEO"
                    description="Architected a travel portal serving 2K+ monthly users with secure booking and automated itineraries."
                  />
                  <ProjectCard 
                    title="KGI School Portal"
                    tech="PHP, SQL, Dynamic"
                    description="Built a role-based academic portal integrating STEAM modules for complex school operations."
                  />
                  <ProjectCard 
                    title="Experience Reboot"
                    tech="PHP, SQL, Dynamic"
                    description="Engineered a performance-optimized business engine focused on sub-2s page load speeds."
                  />
                </div>
              </div>

              <TimelineItem 
                title="Full-Stack Developer (Freelance)"
                company="Global Ventures"
                period="2023 – 2024"
                description="Architected and delivered full-stack solutions for global clients, focusing on secure portals and high-traffic dashboards."
                achievements={[
                  "Developed 15+ custom CMS and e-commerce platforms using React and PHP.",
                  "Integrated secure payment gateways (Stripe/Razorpay) and real-time notification systems."
                ]}
              />

              <TimelineItem 
                title="Technical Team Lead"
                company="Motiv8 Studios / Zeromie"
                period="2019 – 2023"
                description="Appointed as Team Lead to manage end-to-end development lifecycles for ad-driven and product-focused web applications."
                achievements={[
                  "Led a team of developers to deliver 20+ commercial projects on-time, maintaining high client satisfaction and technical standards.",
                  "Optimized high-performance web apps achieving 40% faster load times and ensuring bug-free product releases.",
                  "Designed scalable role-based authentication systems for multi-user enterprise portals."
                ]}
              />
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

              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-3xl shadow-xl shadow-blue-900/40 flex flex-col justify-between min-h-[240px] print:hidden">
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-white italic">"Leading teams to excellence."</h3>
                  <p className="text-white/80 text-sm font-medium">My philosophy is to combine technical brilliance with operational discipline.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Users size={20} className="text-white" />
                  </div>
                  <p className="text-sm font-bold">15+ Developers Led</p>
                </div>
              </div>

              <div className="p-8 rounded-3xl border border-white/10 bg-white/5 space-y-6 print:border-slate-200">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Trophy size={20} className="text-amber-500" />
                  Leadership Values
                </h3>
                <div className="space-y-4">
                  <ValueItem title="Empowerment" text="Trusting the team with ownership and clear paths for growth." />
                  <ValueItem title="Efficiency" text="Cutting operational waste through smart technical automation." />
                  <ValueItem title="Innovation" text="Leveraging AI and modern tools to solve legacy supply chain problems." />
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

