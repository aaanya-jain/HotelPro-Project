import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Award, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Reservation Enquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section className="py-20 bg-slate-50 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Intro Header & Two-Column Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="text-amber-700 font-semibold text-xs uppercase tracking-widest">
              The HotelPro Heritage
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-slate-900 leading-tight">
              A Legacy of Uncompromising Elegance & Personalized Service
            </h2>
            <p className="mt-4 text-slate-600 text-sm leading-relaxed">
              Founded on the belief that genuine luxury resides in the details, HotelPro combines neoclassical architectural splendor with cutting-edge guest management technology.
            </p>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              From our bespoke linen program to Michelin-accredited culinary showcases, every touchpoint is designed to cater to international dignitaries, executive travelers, and vacationing families seeking unforgettable serenity.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-200">
              <div>
                <p className="font-serif text-3xl font-bold text-amber-700">99.4%</p>
                <p className="text-xs text-slate-500 mt-1">Guest Satisfaction</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-bold text-amber-700">18,500+</p>
                <p className="text-xs text-slate-500 mt-1">Stays Hosted</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-bold text-amber-700">42</p>
                <p className="text-xs text-slate-500 mt-1">Hospitality Awards</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80"
                alt="HotelPro Architecture and Pool"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Overlay Experience Card */}
            <div className="absolute -bottom-6 -left-6 bg-slate-900 text-white p-5 rounded-2xl shadow-xl max-w-xs border border-slate-800 hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Forbes 5-Star</h4>
                  <p className="text-xs text-slate-400">Awarded 2024, 2025 & 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Location Section */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-5">
          
          {/* Left Details Card */}
          <div className="lg:col-span-2 bg-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <span className="text-amber-400 font-semibold text-xs uppercase tracking-widest">
                Direct Communication
              </span>
              <h3 className="font-serif text-2xl font-bold mt-1 text-white">
                Contact Concierge & Reservations
              </h3>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                Our front desk team and concierge associates are stationed 24 hours a day to assist with custom room requests, events, and transfer arrangements.
              </p>

              <div className="space-y-4 mt-8 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Resort Location:</strong>
                    <span>742 Ocean Blvd, Seaside Haven, FL 33139</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <strong className="block text-white">Direct Line:</strong>
                    <span>+1 (800) 555-HOTEL (4683)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <strong className="block text-white">Official Correspondence:</strong>
                    <span>concierge@hotelpro.luxury</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <strong className="block text-white">Front Desk & Security:</strong>
                    <span>Open 24 Hours / 365 Days</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-800 text-slate-400 text-xs">
              <p>Valet parking is complimentary for registered overnight suite guests.</p>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-3 p-8 sm:p-10">
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-1">
              Send an Enquiry or Special Request
            </h3>
            <p className="text-slate-500 text-xs mb-6">
              Fill in your details below and our reservations manager will respond within 2 hours.
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-lg font-bold text-slate-900">Enquiry Dispatched</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you for contacting HotelPro. A copy of your inquiry has been logged in our front desk communications log.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="eleanor@example.com"
                      className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  >
                    <option value="Reservation Enquiry">Reservation Enquiry</option>
                    <option value="Private Event or Wedding">Private Event or Wedding</option>
                    <option value="Corporate Retreat">Corporate Retreat</option>
                    <option value="Dining & Spa Reservation">Dining & Spa Reservation</option>
                    <option value="VIP & Concierge Request">VIP & Concierge Request</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Message *</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your dates, preferences, or questions..."
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Message
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
