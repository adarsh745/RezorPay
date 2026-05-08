import React from 'react';
import { Lock, Eye, FileText, ShieldCheck } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: 'Data Collection',
      icon: Eye,
      content: 'We collect information you provide directly to us when you create an account, make a purchase, or communicate with us. This includes your name, email, shipping address, and payment information.'
    },
    {
      title: 'Data Usage',
      icon: FileText,
      content: 'We use the information we collect to process your orders, provide customer support, and send you updates about our services. We never sell your personal data to third parties.'
    },
    {
      title: 'Security Measures',
      icon: ShieldCheck,
      content: 'We implement industry-standard security measures to protect your personal information. Your payment data is encrypted and processed through secure payment gateways like Razorpay.'
    },
    {
      title: 'Your Rights',
      icon: Lock,
      content: 'You have the right to access, correct, or delete your personal information at any time. You can manage your preferences through your account settings or by contacting our support team.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-600 dark:text-gray-400">Last updated: May 08, 2026</p>
      </div>

      <div className="prose dark:prose-invert max-w-none mb-12">
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          At TechStore, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
        </p>
      </div>

      <div className="grid gap-8 mb-12">
        {sections.map((section, idx) => (
          <div key={idx} className="flex gap-6 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex-shrink-0">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600">
                <section.icon className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{section.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {section.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-2xl border border-blue-100 dark:border-blue-900/30">
        <h3 className="text-lg font-bold mb-4">Questions about our policy?</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          If you have any questions or concerns regarding our privacy practices, please do not hesitate to contact our privacy officer.
        </p>
        <a href="/contact" className="text-blue-600 font-bold hover:underline">Contact Privacy Officer &rarr;</a>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
