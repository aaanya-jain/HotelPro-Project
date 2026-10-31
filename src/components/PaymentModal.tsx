import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  ArrowRight,
  Landmark,
  Smartphone,
  Loader2
} from 'lucide-react';
import { PaymentMethod } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDraft: any;
  onPaymentSuccess: (confirmedBooking: any) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  bookingDraft,
  onPaymentSuccess
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('Credit Card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState(bookingDraft?.guestName || '');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isOpen || !bookingDraft) return null;

  const handleAutofillTestCard = () => {
    setCardNumber('4242 •••• •••• 4242');
    setCardHolder(bookingDraft.guestName || 'Eleanor Vance');
    setExpiry('12/28');
    setCvv('789');
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment gateway authentication and sandbox authorization
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      const confirmedBooking = {
        ...bookingDraft,
        paymentStatus: 'Paid',
        paymentMethod: selectedMethod
      };

      setTimeout(() => {
        onPaymentSuccess(confirmedBooking);
      }, 1200);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base text-white">
                  HotelPro Pay Gateway
                </h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded border border-amber-500/30 uppercase tracking-wider">
                  Test Sandbox
                </span>
              </div>
              <p className="text-xs text-slate-400">256-bit SSL End-to-End Encrypted</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {paymentSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h4 className="font-serif text-2xl font-bold text-slate-900">
                Payment Authorized!
              </h4>
              <p className="text-sm text-slate-600 mt-1">
                Your reservation at HotelPro has been confirmed. Generating your official invoice...
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Redirecting to your booking receipt & pass</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePay} className="p-6 space-y-5">
            {/* Amount Summary Header */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Payable Amount for {bookingDraft.nights} Nights</p>
                <p className="text-xs font-semibold text-slate-800">{bookingDraft.roomTitle}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-serif font-bold text-slate-900">
                  ${bookingDraft.totalAmount.toFixed(2)}
                </span>
                <span className="block text-[10px] text-emerald-600 font-semibold">Taxes Included</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Choose Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMethod('Credit Card')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                    selectedMethod === 'Credit Card'
                      ? 'border-amber-500 bg-amber-50 text-slate-900 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-amber-600" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('PayPal')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                    selectedMethod === 'PayPal'
                      ? 'border-amber-500 bg-amber-50 text-slate-900 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-amber-600" />
                  <span>Instant Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('Cash at Counter')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                    selectedMethod === 'Cash at Counter'
                      ? 'border-amber-500 bg-amber-50 text-slate-900 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Landmark className="w-4 h-4 text-amber-600" />
                  <span>Desk / Bank</span>
                </button>
              </div>
            </div>

            {/* Card Fields */}
            {selectedMethod === 'Credit Card' && (
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Card details (Sandbox Mode)</span>
                  <button
                    type="button"
                    onClick={handleAutofillTestCard}
                    className="text-xs text-amber-600 font-bold hover:text-amber-700 flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200"
                  >
                    <Sparkles className="w-3 h-3" />
                    Fill Test Card
                  </button>
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 •••• •••• 4242"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="Eleanor Vance"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">CVV / CVC</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="•••"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedMethod !== 'Credit Card' && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-2">
                <p className="font-semibold text-slate-800">Direct Reservation Guarantee</p>
                <p>
                  Your booking will be reserved instantly in our system. You will receive an official booking pass and can present payment upon check-in at the HotelPro Concierge counter.
                </p>
              </div>
            )}

            <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Sandbox mode active. No actual bank charges will occur.</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isProcessing}
                className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isProcessing}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-sm rounded-xl shadow-md shadow-amber-500/20 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Processing Authorization...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Pay ${bookingDraft.totalAmount.toFixed(2)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
