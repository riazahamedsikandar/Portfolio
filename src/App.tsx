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
  BarChart3
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
        <div style={{ borderBottom: '3px solid #1e40af', paddingBottom: '25px', marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '42px', fontWeight: '800', color: '#111827', margin: '0 0 5px 0', letterSpacing: '-0.04em' }}>RIAZ AHAMED</h1>
              <p style={{ fontSize: '18px', color: '#1e40af', fontWeight: '700', margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Operations Team Lead & Technical Specialist</p>
            </div>
            <div style={{ textAlign: 'right', fontSize: '12px', color: '#4b5563', fontWeight: '500' }}>
              <p style={{ margin: '0 0 3px 0' }}>riazahamedsikandar@gmail.com</p>
              <p style={{ margin: '0 0 3px 0' }}>+91 8667632957</p>
              <p style={{ margin: '0 0 3px 0' }}>Coimbatore, Tamil Nadu, India</p>
              <p style={{ margin: '0', fontWeight: 'bold', color: '#1e40af' }}>github.com/riazahamedsikandar</p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div style={{ marginBottom: '35px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '800', color: '#1e40af', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #e5e7eb', paddingBottom: '6px', marginBottom: '12px' }}>Professional Profile</h2>
          <p style={{ fontSize: '13.5px', color: '#374151', margin: 0, textAlign: 'left', lineHeight: '1.6' }}>
            High-impact <span style={{ fontWeight: 'bold' }}>Team Leader</span> and <span style={{ fontWeight: 'bold' }}>Operations Specialist</span> with over 5 years of experience in driving organizational excellence. Awarded <span style={{ fontWeight: 'bold' }}>"Best Team" in 2025</span> for maintaining a flawless <span style={{ fontWeight: 'bold' }}>100% On-Time Delivery</span> record for complex mission-critical operations. Expert in <span style={{ fontWeight: 'bold' }}>managing large-scale personnel (15+)</span>, optimizing supply chain workflows, and bridging the gap between technical infrastructure and real-world operational strategy. Proven track record in reducing operational costs while improving service quality across diverse industries.
          </p>
        </div>

        {/* Grid Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '40px' }}>
          
          {/* Main Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
            
            {/* Experience */}
            <section>
              <h2 style={{ fontSize: '14px', fontWeight: '800', color: '#1e40af', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #e5e7eb', paddingBottom: '6px', marginBottom: '20px' }}>Professional Experience</h2>
              
              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111827', margin: 0 }}>Operations Team Lead & Technical Specialist</h3>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#6b7280' }}>Feb 2024 – Present</span>
                </div>
                <p style={{ color: '#1e40af', fontSize: '12.5px', fontWeight: '800', margin: '0 0 10px 0' }}>SCM IT SOLUTIONS | COIMBATORE</p>
                <ul style={{ fontSize: '12.5px', color: '#374151', paddingLeft: '15px', margin: 0, listStyleType: 'square' }}>
                  <li style={{ marginBottom: '8px' }}>Managing and coordinating a diverse team of <span style={{ fontWeight: 'bold' }}>15+ personnel</span>, ensuring 24/7 operational continuity and high-standard guest service delivery for SCM stakeholders.</li>
                  <li style={{ marginBottom: '8px' }}>Maintained a flawless <span style={{ fontWeight: 'bold' }}>100% On-Time Delivery</span> record for all service releases and operational milestones in the 2024–2025 performance cycle.</li>
                  <li style={{ marginBottom: '8px' }}>Optimized internal reporting workflows and shift planning, leading to a <span style={{ fontWeight: 'bold' }}>30% improvement in team response times</span> and staff productivity.</li>
                  <li style={{ marginBottom: '8px' }}>Spearheaded the integration of real-time inventory tracking systems, reducing manual audit cycles and inventory losses by <span style={{ fontWeight: 'bold' }}>25%</span> through automation.</li>
                  <li>Directly responsible for <span style={{ fontWeight: 'bold' }}>Guest Experience Management</span>, ensuring zero-defect technical interfaces for high-volume logistics tracking.</li>
                </ul>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111827', margin: 0 }}>Technical Team Lead</h3>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#6b7280' }}>2019 – 2023</span>
                </div>
                <p style={{ color: '#1e40af', fontSize: '12.5px', fontWeight: '800', margin: '0 0 10px 0' }}>MOTIV8 STUDIOS / ZEROMIE | TAMIL NADU</p>
                <ul style={{ fontSize: '12.5px', color: '#374151', paddingLeft: '15px', margin: 0, listStyleType: 'square' }}>
                  <li style={{ marginBottom: '8px' }}>Spearheaded the development of <span style={{ fontWeight: 'bold' }}>20+ enterprise-grade</span> web portals for global commercial clients using the MERN stack and PHP.</li>
                  <li style={{ marginBottom: '8px' }}>Reduced application load times by <span style={{ fontWeight: 'bold' }}>40%</span> through strategic caching, performance tuning, and database infrastructure upgrades.</li>
                  <li style={{ marginBottom: '8px' }}>Managed the full project lifecycle (SDLC) from discovery to deployment, ensuring zero-defect releases for high-stakes educational and fintech dashboards.</li>
                  <li style={{ marginBottom: '8px' }}>Mentored and trained a cross-functional team of 10+ junior specialists on operational discipline and technical best practices.</li>
                  <li>Instituted **Standard Operating Procedures (SOPs)** that improved project turnaround speed by 15%.</li>
                </ul>
              </div>
            </section>

            {/* Key Technical Projects */}
            <section>
              <h2 style={{ fontSize: '14px', fontWeight: '800', color: '#1e40af', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #e5e7eb', paddingBottom: '6px', marginBottom: '20px' }}>Strategic Projects</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: '800', color: '#111827', margin: '0 0 4px 0' }}>MASAGRO FOODS PORTAL</p>
                  <p style={{ fontSize: '11px', color: '#4b5563', margin: 0, lineHeight: '1.4' }}>High-concurrency e-commerce portal with automated lead routing and dynamic inventory sync.</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: '800', color: '#111827', margin: '0 0 4px 0' }}>MAKE MY HOLIDAY ENGINE</p>
                  <p style={{ fontSize: '11px', color: '#4b5563', margin: 0, lineHeight: '1.4' }}>Integrated travel booking engine serving 2K+ monthly users with real-time vendor API links.</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: '800', color: '#111827', margin: '0 0 4px 0' }}>KGI ACADEMIC DASHBOARD</p>
                  <p style={{ fontSize: '11px', color: '#4b5563', margin: 0, lineHeight: '1.4' }}>Role-based enterprise infrastructure for tracking student performance and staff metrics.</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: '800', color: '#111827', margin: '0 0 4px 0' }}>SCM AUTOMATION LAYER</p>
                  <p style={{ fontSize: '11px', color: '#4b5563', margin: 0, lineHeight: '1.4' }}>Custom middleware connecting warehouse data with customer-facing tracking portals.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column (Sidebar) */}
          <div style={{ borderLeft: '1px solid #f3f4f6', paddingLeft: '25px' }}>
            
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6b7280', marginBottom: '15px' }}>Core Expertise</h2>
              
              <div style={{ marginBottom: '15px' }}>
                <p style={{ fontSize: '11px', fontWeight: '800', color: '#111827', marginBottom: '4px' }}>LEADERSHIP & OPERATIONS</p>
                <p style={{ fontSize: '10.5px', color: '#4b5563', margin: 0, lineHeight: '1.4' }}>Team Management (15+), Shift Planning, Resource Allocation, Workflow Optimization.</p>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <p style={{ fontSize: '11px', fontWeight: '800', color: '#111827', marginBottom: '4px' }}>SERVICE EXCELLENCE</p>
                <p style={{ fontSize: '10.5px', color: '#4b5563', margin: 0, lineHeight: '1.4' }}>Guest Experience Mgmt, Quality Control, Infrastructure Integrity, Real-time Operations.</p>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <p style={{ fontSize: '11px', fontWeight: '800', color: '#111827', marginBottom: '4px' }}>TECHNICAL EXECUTION</p>
                <p style={{ fontSize: '10.5px', color: '#4b5563', margin: 0, lineHeight: '1.4' }}>ERP Systems, Full-Stack Dev, API Integration, Cloud Data Management, Inventory Automation.</p>
              </div>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6b7280', marginBottom: '15px' }}>Key Strengths</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Analytical Problem Solving', 'Stakeholder Management', 'Process Automation', 'Operational Efficiency'].map(s => (
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
                <p style={{ fontSize: '13px', fontWeight: '800', color: '#1e40af', margin: 0, textTransform: 'uppercase' }}>BEST TEAM AWARD</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', margin: '4px 0' }}>
                  <Trophy size={14} color="#3b82f6" />
                  <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#3b82f6', margin: 0 }}>2024–2025 Recognition</p>
                </div>
                <p style={{ fontSize: '10.5px', color: '#1e40af', margin: 0, fontWeight: '500', lineHeight: '1.4' }}>Recognized for achieving the <span style={{ fontWeight: 'bold' }}>Highest Operational Efficiency</span> and maintaining zero critical defects across all SCM IT service releases.</p>
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
            Proven record of 100% on-time delivery. Portfolio & references available at github.com/riazahamedsikandar
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
                <Users size={14} />
                Operations Team Lead
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] print:text-5xl print:text-slate-900">
                RIAZ <br /> AHAMED
              </h1>
              
              <p className="text-lg md:text-2xl text-slate-400 font-medium max-w-xl print:text-slate-600">
                Bridging the gap between <span className="text-blue-400">Operations Leadership</span> and <span className="text-white print:text-slate-900 underline decoration-blue-500 underline-offset-4">Technical Strategy</span>.
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
                      <div className="flex -space-x-3">
                         {['RA', 'SK', 'AG', 'TN'].map((initial, i) => (
                          <div 
                            key={i} 
                            className={`w-11 h-11 rounded-full border-2 border-[#111114] flex items-center justify-center text-[11px] font-black text-white shadow-xl
                              ${i === 0 ? 'bg-blue-600' : i === 1 ? 'bg-purple-600' : i === 2 ? 'bg-slate-700' : 'bg-emerald-600'}`}
                            style={{ zIndex: 5 - i }}
                          >
                            {initial}
                          </div>
                        ))}
                        <div className="w-11 h-11 rounded-full border-2 border-[#111114] bg-blue-600 flex items-center justify-center text-xs font-black shadow-lg shadow-blue-500/40 z-10">
                          15+
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active Personnel Managed</p>
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
          {/* Strategic Operational Impact (New Section) */}
          <SectionHeader title="Operational Impact" icon={<Zap className="text-yellow-400" />} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#1a1a1e] border border-white/5 p-8 rounded-3xl"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="text-green-400" />
                Crisis & Risk Management
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Proven ability to lead teams through high-pressure operational crises. Established protocols that reduced system recovery time by **50% during critical outages**.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Disaster Recovery", "Incident Response", "Safety Protocols"].map(s => (
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
                Efficiency Optimization
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Redesigned personnel shift rotations and workflow pathways to handle **200% more volume** without increasing staff overhead, using data-driven insights.
              </p>
              <div className="flex flex-wrap gap-2">
                {["KPI Tracking", "LEAN Workflow", "Resource Mgmt"].map(s => (
                  <span key={s} className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-slate-400 font-bold uppercase tracking-widest">{s}</span>
                ))}
              </div>
            </motion.div>
          </div>

          <SectionHeader title="Core Expertise" icon={<Layers className="text-blue-500" />} />
          
              <ExpertiseCard 
                title="Operations Management"
                description="Managing high-volume guest traffic and 24/7 staff operations. Expert in shift rotations, security protocols, and maintaining premium service standards for large-scale facilities."
                icon={<Users className="text-blue-400" />}
                skills={["Duty Management", "Crowd Control", "Staff Deployment", "Inventory Audit"]}
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
                  Optimized **Staff Allocation** and workflow designs, resulting in a 30% increase in team productivity.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  Mentored 15+ personnel, fostering a high-performance culture and achieving a **100% On-Time Delivery** record for all operations.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  Established robust **Conflict Resolution** protocols and crisis management strategies for complex 24/7 operations.
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
                  Spearheaded the **Guest Experience Digital Layer**, ensuring zero-defect customer interfaces for thousands of users.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                  Digitized core administrative processes, reducing manual paperwork by **60% through custom dashboard solutions**.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                  Managed the deployment of **Integrated ERP Systems**, consolidating purchase, inventory, and staff data into a unified platform.
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Technical Arsenal - NEW */}
        <section className="space-y-12">
          <SectionHeader title="Technical Arsenal" icon={<Code2 className="text-blue-500" />} />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "React / Next.js", icon: "⚛️" },
              { name: "Node.js", icon: "🟢" },
              { name: "TypeScript", icon: "📘" },
              { name: "MERN Stack", icon: "📦" },
              { name: "Docker", icon: "🐋" },
              { name: "AWS / Cloud", icon: "☁️" },
              { name: "Firebase", icon: "🔥" },
              { name: "PostgreSQL", icon: "🐘" },
              { name: "PHP / Laravel", icon: "🐘" },
              { name: "Tailwind CSS", icon: "🎨" },
              { name: "SCM ERPs", icon: "⚙️" },
              { name: "AI/LLM Ops", icon: "🤖" },
            ].map((tech) => (
              <motion.div 
                key={tech.name}
                whileHover={{ y: -5 }}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 text-center transition-colors hover:bg-blue-600/10 hover:border-blue-500/30"
              >
                <span className="text-3xl">{tech.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">{tech.name}</span>
              </motion.div>
            ))}
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
                title="Operations Team Lead"
                company="Motiv8 Studios / Zeromie"
                period="2019 – 2023"
                description="Appointed as Team Lead to manage end-to-end operational lifecycles for ad-driven and product-focused business applications."
                achievements={[
                  "Led a cross-functional team to deliver 20+ commercial projects on-time, maintaining high client satisfaction and operational discipline.",
                  "Optimized high-performance applications achieving 40% faster load times and ensuring flawless product releases.",
                  "Managed staff workflows and complex role-based infrastructure for global enterprise clients."
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
                  <p className="text-sm font-bold">15+ Personnel Managed</p>
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

