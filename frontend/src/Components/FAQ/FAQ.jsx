import React, { useState } from 'react'
import './FAQ.scss'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    // Toggle the state: if the same one is clicked, close it, else open the clicked one
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'I got the wrong food, what should I do?',
      answer: 'If you receive the wrong food, please contact our customer service within 30 minutes of delivery. Provide your order number and details of the issue, and we will arrange a replacement or refund as appropriate.'
    },
    {
      question: 'What is the delivery time?',
      answer: 'Our standard delivery time is 30-45 minutes. However, this may vary depending on the location and time of day. You will receive an estimated delivery time when placing your order.'
    },
    {
      question: 'Can I change my order?',
      answer: 'If you need to change your order, please contact customer support immediately. We can modify your order if it has not yet been processed or dispatched.'
    },
    {
      question: 'How can I contact customer support?',
      answer: 'You can contact our customer support team via email at support@example.com or by calling our hotline at 1-800-123-4567. We are available 24/7 to assist you.'
    },
    {
      question: 'Do you offer vegetarian or vegan options?',
      answer: 'Yes, we offer a range of vegetarian and vegan options on our menu. Please check the menu for more details or contact us for specific requests.'
    },
    {
      question: 'Can I track my order?',
      answer: 'Yes, once your order is dispatched, you will receive a tracking link to monitor its progress in real-time.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit and debit cards, as well as mobile payment options such as Apple Pay and Google Pay.'
    },
    {
      question: 'Do you deliver to my area?',
      answer: 'We deliver to most areas within Olievenhoutbosch. Please enter your address during checkout to see if we deliver to your location.'
    },
    {
      question: 'Can I place an order for later delivery?',
      answer: 'Yes, you can schedule your order for a later delivery time. Simply choose your preferred time at checkout.'
    },
    // {
    //   question: 'Do you offer discounts or promotions?',
    //   answer: 'Yes, we frequently offer discounts and promotions. Be sure to subscribe to our newsletter for the latest offers!'
    // },
    {
      question: 'Can I order food for pickup?',
      answer: 'Yes, you can place an order for pickup. Choose the "Pickup" option when placing your order online.'
    },
    {
      question: 'Is there a minimum order requirement?',
      answer: 'Yes, the minimum order value for delivery is R10.00. There is no minimum for pickup orders.'
    },
    {
      question: 'What happens if I miss my delivery?',
      answer: 'If you miss your delivery, please contact customer support. We will arrange for a redelivery or refund as necessary.'
    },
    {
      question: 'How do I cancel an order?',
      answer: 'You can cancel your order within 10 minutes of placing it by contacting our customer support team. After that, cancellations may not be possible.'
    },
    {
      question: 'Are the ingredients in your food allergen-free?',
      answer: 'While we take precautions, our food may contain allergens such as nuts, gluten, and dairy. Please inform us of any allergies when placing your order.'
    }
  ];

  return (
    <div>
      <div className="faq-section" id="faq">
        <Navbar />
        <h2 className="secondary">Frequently Asked Questions</h2>

        <div className="faq">
          {faqs.map((faq, index) => (
            <div key={index} className="details">
              <summary onClick={() => handleToggle(index)}>{faq.question}</summary>
              {openIndex === index && (
                <div className="content">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />

    </div>
  )
}

export default FAQ
