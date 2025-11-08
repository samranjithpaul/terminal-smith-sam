import React, { useState } from 'react';
import { TypeWriter } from '@/components/TypeWriter';
import { Github, Linkedin, Mail, Download, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Message sent successfully!', {
      description: 'I\'ll get back to you soon.',
    });

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-6 lg:space-y-8 animate-fade-in max-w-5xl">
      {/* Command Output Header */}
      <div className="flex items-center gap-2 text-terminal-text-dim text-xs sm:text-sm lg:text-base mb-6 sm:mb-8 md:mb-6 lg:mb-8">
        <span className="text-terminal-accent">$</span>
        <TypeWriter
          text="contact --info"
          delay={50}
          showCursor={false}
          onComplete={() => setTimeout(() => setShowForm(true), 300)}
        />
      </div>

      {showForm && (
        <div className="space-y-8 sm:space-y-10 md:space-y-8 lg:space-y-12 pl-3 sm:pl-4 lg:pl-8">
          {/* Contact Info */}
          <div className="space-y-4 sm:space-y-5 md:space-y-4 lg:space-y-6">
            <div className="text-terminal-accent terminal-glow font-semibold mb-4 sm:mb-5 md:mb-4 lg:mb-6 text-sm sm:text-base lg:text-xl xl:text-2xl">
              [CONTACT INFORMATION]
            </div>

            <div className="space-y-3 sm:space-y-4 md:space-y-3 lg:space-y-4">
              {[
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'sam@example.com',
                  href: 'mailto:sam@example.com',
                },
                {
                  icon: Github,
                  label: 'GitHub',
                  value: '@samranjithpaul',
                  href: 'https://github.com/samranjithpaul',
                },
                {
                  icon: Linkedin,
                  label: 'LinkedIn',
                  value: '/samranjithpaul',
                  href: 'https://linkedin.com/in/samranjithpaul',
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4 text-terminal-text-dim hover:text-terminal-accent transition-all group text-xs sm:text-sm lg:text-lg xl:text-xl"
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:terminal-glow flex-shrink-0" />
                  <span className="text-terminal-accent-dim w-16 sm:w-24 lg:w-32">{label}:</span>
                  <span className="group-hover:terminal-glow break-all">{value}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Resume Download */}
          <div className="pt-6 sm:pt-8 md:pt-6 lg:pt-10 border-t border-terminal-border">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 sm:gap-3 lg:gap-4 px-3 sm:px-4 lg:px-6 py-2 lg:py-3 bg-terminal-surface border border-terminal-accent text-terminal-accent hover:bg-terminal-accent hover:text-terminal-bg transition-all terminal-box-glow text-xs sm:text-sm lg:text-lg"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
              <span>Download Resume</span>
            </a>
          </div>

          {/* Contact Form */}
          <div className="pt-6 sm:pt-8 md:pt-6 lg:pt-10 border-t border-terminal-border">
            <div className="text-terminal-accent terminal-glow font-semibold mb-4 sm:mb-5 md:mb-4 lg:mb-6 text-sm sm:text-base lg:text-xl xl:text-2xl">
              [SEND MESSAGE]
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-4 lg:space-y-6">
              <div className="space-y-2 sm:space-y-3 md:space-y-2 lg:space-y-3">
                <label className="text-terminal-text-dim text-xs sm:text-sm lg:text-lg flex items-center gap-2 lg:gap-3">
                  <span className="text-terminal-accent-dim">$</span>
                  <span>name:</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-terminal-surface border border-terminal-border text-terminal-text px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-3 focus:border-terminal-accent focus:outline-none transition-all font-mono text-xs sm:text-sm lg:text-base"
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2 sm:space-y-3 md:space-y-2 lg:space-y-3">
                <label className="text-terminal-text-dim text-xs sm:text-sm lg:text-lg flex items-center gap-2 lg:gap-3">
                  <span className="text-terminal-accent-dim">$</span>
                  <span>email:</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-terminal-surface border border-terminal-border text-terminal-text px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-3 focus:border-terminal-accent focus:outline-none transition-all font-mono text-xs sm:text-sm lg:text-base"
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2 sm:space-y-3 md:space-y-2 lg:space-y-3">
                <label className="text-terminal-text-dim text-xs sm:text-sm lg:text-lg flex items-center gap-2 lg:gap-3">
                  <span className="text-terminal-accent-dim">$</span>
                  <span>message:</span>
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full bg-terminal-surface border border-terminal-border text-terminal-text px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-3 focus:border-terminal-accent focus:outline-none transition-all font-mono resize-none text-xs sm:text-sm lg:text-base"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 sm:gap-3 lg:gap-4 px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-3 bg-terminal-accent text-terminal-bg hover:bg-terminal-accent-bright transition-all disabled:opacity-50 disabled:cursor-not-allowed terminal-box-glow text-xs sm:text-sm lg:text-lg"
              >
                <Send className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
