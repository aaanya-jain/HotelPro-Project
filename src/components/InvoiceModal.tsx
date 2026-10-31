import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Building2, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  CreditCard,
  User,
  Share2
} from 'lucide-react';
import { Booking } from '../types';

interface InvoiceModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ booking, isOpen, onClose }) => {
  if (!isOpen || !booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-4 animate-in fade-in zoom-in-95 duration-200 print:shadow-none print:border-none print:m-0 print:max-w-none">
        
        {/* Action Header (Hidden during browser print) */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between no-print border-b border-slate-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-serif font-bold text-base text-white">
              Official Booking Receipt & Invoice
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 border border-slate-700"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              Print / PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div className="p-8 space-y-6 text-slate-800" id="hotelpro-invoice-body">
          
          {/* Top Brand & Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="font-serif text-2xl font-bold tracking-tight text-slate-900">
                    HotelPro Resort & Suites
                  </h1>
                  <p className="text-xs text-slate-500">Luxury Hospitality Group</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                742 Ocean Blvd, Seaside Haven, FL 33139
              </p>
              <p className="text-xs text-slate-500">reservations@hotelpro.luxury · +1 (800) 555-HOTEL</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-xs font-bold uppercase tracking-wider mb-2">
                Status: {booking.paymentStatus === 'Paid' ? 'PAID & CONFIRMED' : 'RESERVATION HELD'}
              </span>
              <p className="text-xs text-slate-500">Booking Confirmation No.</p>
              <p className="text-lg font-mono font-bold text-slate-900">{booking.id}</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Issued on {new Date(booking.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>

          {/* Guest and Stay Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <p className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-600" />
                Guest Details
              </p>
              <p className="font-bold text-slate-800 text-sm">{booking.guestName}</p>
              <p className="text-slate-600 mt-0.5">{booking.guestEmail}</p>
              <p className="text-slate-600">{booking.guestPhone}</p>
              <p className="text-slate-500 mt-1">Occupancy: {booking.guestsCount} Registered Guest(s)</p>
            </div>

            <div>
              <p className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                Stay Details
              </p>
              <p className="font-bold text-slate-800 text-sm">
                Room {booking.roomNumber} - {booking.roomTitle}
              </p>
              <p className="text-slate-600 mt-0.5">Category: {booking.roomCategory}</p>
              <div className="mt-1 flex items-center gap-4 text-slate-700 font-medium">
                <div>Check-in: <strong className="text-slate-900">{booking.checkInDate}</strong></div>
                <div>Check-out: <strong className="text-slate-900">{booking.checkOutDate}</strong></div>
              </div>
              <p className="text-amber-800 font-semibold mt-1">Total Nights: {booking.nights} night(s)</p>
            </div>
          </div>

          {/* Line Items Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              Itemized Charges & Tax Statement
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-4">Description</th>
                    <th className="py-2.5 px-4 text-center">Qty / Rate</th>
                    <th className="py-2.5 px-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-2.5 px-4">
                      <p className="font-semibold text-slate-800">{booking.roomTitle}</p>
                      <p className="text-[11px] text-slate-500">Room #{booking.roomNumber} standard accommodation</p>
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      {booking.nights} night(s) @ ${(booking.baseAmount / (booking.nights || 1)).toFixed(2)}
                    </td>
                    <td className="py-2.5 px-4 text-right font-medium">
                      ${booking.baseAmount.toFixed(2)}
                    </td>
                  </tr>

                  {booking.addOnsAmount > 0 && (
                    <tr>
                      <td className="py-2.5 px-4">
                        <p className="font-semibold text-slate-800">Hospitality Add-ons & Experiences</p>
                        <p className="text-[11px] text-slate-500">Breakfast / Spa / Chauffeur privileges</p>
                      </td>
                      <td className="py-2.5 px-4 text-center">{booking.nights} night(s)</td>
                      <td className="py-2.5 px-4 text-right font-medium">
                        ${booking.addOnsAmount.toFixed(2)}
                      </td>
                    </tr>
                  )}

                  <tr>
                    <td className="py-2.5 px-4">
                      <p className="font-semibold text-slate-800">Resort Hospitality & Service Fee</p>
                      <p className="text-[11px] text-slate-500">High-speed Wi-Fi, pool & fitness access</p>
                    </td>
                    <td className="py-2.5 px-4 text-center">Flat</td>
                    <td className="py-2.5 px-4 text-right font-medium">
                      ${booking.serviceFee.toFixed(2)}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2.5 px-4">
                      <p className="font-semibold text-slate-800">State Tourism & Luxury Occupancy Tax</p>
                      <p className="text-[11px] text-slate-500">Statutory 12% hotel levy</p>
                    </td>
                    <td className="py-2.5 px-4 text-center">12%</td>
                    <td className="py-2.5 px-4 text-right font-medium">
                      ${booking.taxAmount.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
                <tfoot className="bg-slate-50/80 font-semibold border-t border-slate-200">
                  <tr>
                    <td colSpan={2} className="py-3 px-4 text-right text-slate-700 text-sm">
                      Total Invoice Amount:
                    </td>
                    <td className="py-3 px-4 text-right text-slate-900 font-serif text-lg font-bold">
                      ${booking.totalAmount.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Payment Method Statement & Notes */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs text-slate-500 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>
                Payment Settlement: <strong className="text-slate-800">{booking.paymentMethod || 'Credit Card'}</strong> ({booking.paymentStatus})
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Check-in Time: 3:00 PM · Check-out Time: 11:00 AM
            </div>
          </div>

          {/* Terms Footer */}
          <div className="bg-amber-50/60 p-3 rounded-lg border border-amber-200/60 text-[11px] text-amber-900/80 leading-relaxed">
            <strong>Guest Notice:</strong> Please present this confirmation slip along with a valid government-issued photo ID upon check-in. Cancellations made 48 hours prior to arrival are fully refundable.
          </div>
        </div>

        {/* Modal Bottom Close (No Print) */}
        <div className="bg-slate-50 px-6 py-4 flex items-center justify-end gap-3 no-print border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Done & Return
          </button>
        </div>

      </div>
    </div>
  );
};
