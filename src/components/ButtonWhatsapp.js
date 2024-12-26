export default function WhatsAppButton({ phoneNumber, message }) {
    const openWhatsApp = () => {
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${phoneNumber}`;
      window.open(whatsappUrl, "_blank");
    };
  
    return (
      <div>
        <button
          onClick={openWhatsApp}
          className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 mt-2"
        >
          Order
        </button>
      </div>
    );
  }
  