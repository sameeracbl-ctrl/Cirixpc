import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: ''
  });
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('citrix_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        phone: user.whatsapp || ''
      }));
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('343100100021184');
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handlePlaceOrder = () => {
    if (!formData.name || !formData.address || !formData.phone) {
      alert('Please fill in all delivery details.');
      return;
    }

    const itemList = cart.map(item => `• ${item.title} (x${item.quantity}) - ${item.price}`).join('\n');
    const message = `New Order from Citrix Online:\n\nItems:\n${itemList}\n\nTotal: LKR ${total.toLocaleString()}\n\nCustomer: ${formData.name}\nAddress: ${formData.address}\nPhone: ${formData.phone}\n\nPayment: Bank Transfer (People's Bank). I will send the receipt soon.`;

    const whatsappUrl = `https://wa.me/94789827123?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Optional: Clear cart after placing order
    // clearCart();
    // navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
        <span className="material-symbols-outlined text-8xl text-primary/20 mb-6 icon-enhanced">shopping_basket</span>
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Your Cart is Empty</h2>
        <button 
          onClick={() => navigate('/')}
          className="px-8 py-4 bg-primary text-surface font-black uppercase tracking-widest text-[10px] shadow-[0_0_20px_rgba(0,242,255,0.4)] hover:brightness-110 transition-all"
        >
          Return to Foundry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-primary"></div>
              <span className="text-primary text-[10px] font-black tracking-[0.4em] uppercase">Checkout Protocol</span>
            </div>
            <h1 className="font-headline text-4xl md:text-6xl font-black text-white tracking-tighter uppercase neon-glow-cyan">Finalize Order</h1>
          </div>
          <Link 
            to="/" 
            className="text-[10px] font-black text-primary/40 hover:text-primary uppercase tracking-widest flex items-center gap-2 transition-all group"
          >
            <span className="material-symbols-outlined text-sm icon-enhanced group-hover:-translate-x-1 transition-transform">arrow_back</span>
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Form & Payment */}
          <div className="space-y-12">
            {/* Delivery Info */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary icon-enhanced">local_shipping</span>
                <h3 className="text-xs font-black text-white uppercase tracking-[0.3em]">Delivery Information</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-primary/60 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-surface-container/40 border border-primary/20 p-4 text-xs font-bold text-white focus:outline-none focus:border-primary transition-all rounded-sm"
                    placeholder="ENTER YOUR FULL NAME"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-primary/60 uppercase tracking-widest ml-1">Phone Number</label>
                  <input 
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-surface-container/40 border border-primary/20 p-4 text-xs font-bold text-white focus:outline-none focus:border-primary transition-all rounded-sm"
                    placeholder="ENTER CONTACT NUMBER"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-primary/60 uppercase tracking-widest ml-1">Delivery Address</label>
                  <textarea 
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-surface-container/40 border border-primary/20 p-4 text-xs font-bold text-white focus:outline-none focus:border-primary transition-all rounded-sm min-h-[100px]"
                    placeholder="ENTER FULL DELIVERY ADDRESS"
                  />
                </div>
              </div>
            </section>

            {/* Bank Info */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary icon-enhanced">payments</span>
                <h3 className="text-xs font-black text-white uppercase tracking-[0.3em]">Payment Method: Bank Transfer</h3>
              </div>
              <div className="p-8 bg-surface-container/60 border border-primary/30 rounded-sm shadow-[inset_0_0_30px_rgba(0,242,255,0.05)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-6xl text-primary icon-enhanced">account_balance</span>
                </div>
                
                <div className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[8px] font-black text-primary/40 uppercase tracking-widest block mb-1">Bank</span>
                      <p className="text-sm font-bold text-white uppercase">People's Bank</p>
                    </div>
                    <div>
                      <span className="text-[8px] font-black text-primary/40 uppercase tracking-widest block mb-1">Branch</span>
                      <p className="text-sm font-bold text-white uppercase">Karapitiya</p>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-[8px] font-black text-primary/40 uppercase tracking-widest block mb-1">Account Name</span>
                    <p className="text-sm font-bold text-white uppercase">Citrix Computer</p>
                  </div>

                  <div>
                    <span className="text-[8px] font-black text-primary/40 uppercase tracking-widest block mb-1">Account Number</span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <p className="text-lg md:text-xl font-black text-primary tracking-widest neon-glow-cyan">343100100021184</p>
                      <button 
                        onClick={handleCopy}
                        className="flex items-center justify-center gap-2 px-3 py-1.5 border border-primary/30 rounded-sm hover:bg-primary hover:text-surface transition-all group/copy w-fit"
                      >
                        <span className="material-symbols-outlined text-sm icon-enhanced">
                          {copySuccess ? 'check' : 'content_copy'}
                        </span>
                        <span className="text-[8px] font-black uppercase tracking-widest">
                          {copySuccess ? 'Copied' : 'Copy'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[9px] font-bold text-primary/40 uppercase tracking-widest leading-relaxed">
                * Please transfer the total amount to the account above and keep the receipt. You will need to send a photo of the receipt via WhatsApp after placing the order.
              </p>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <div className="space-y-8">
            <div className="bg-surface-container/40 border border-white/5 rounded-sm p-8 lg:sticky lg:top-24">
              <div className="flex items-center gap-4 mb-8">
                <span className="material-symbols-outlined text-primary icon-enhanced">receipt_long</span>
                <h3 className="text-xs font-black text-white uppercase tracking-[0.3em]">Order Summary</h3>
              </div>
              
              <div className="space-y-6 mb-12 max-h-[400px] overflow-y-auto no-scrollbar pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-4">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-surface rounded-sm overflow-hidden border border-white/5 flex-shrink-0">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black text-white uppercase tracking-tight mb-1 line-clamp-1">{item.title}</h4>
                        <p className="text-[9px] font-bold text-primary/60 uppercase tracking-widest">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-[10px] font-black text-primary whitespace-nowrap">{item.price}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Subtotal</span>
                  <span className="text-xs font-bold text-white">LKR {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Delivery</span>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Calculated on WhatsApp</span>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-xs font-black text-white uppercase tracking-[0.2em]">Total Manifest</span>
                  <span className="text-2xl font-black text-primary neon-glow-cyan">LKR {total.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder}
                className="w-full mt-12 py-5 bg-primary text-surface font-black uppercase tracking-widest text-xs shadow-[0_0_30px_rgba(0,242,255,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-3 group"
              >
                <span className="material-symbols-outlined text-2xl icon-enhanced group-hover:scale-110 transition-transform">send</span>
                Place Order via WhatsApp
              </button>
              <p className="text-center mt-6 text-[8px] font-bold text-primary/20 uppercase tracking-[0.2em]">Secure Order Protocol v1.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
