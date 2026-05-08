import React from 'react';
import { RefreshCcw, Package, CreditCard, Clock } from 'lucide-react';

const RefundPolicy = () => {
  const steps = [
    {
      title: 'Initiate Return',
      icon: RefreshCcw,
      description: 'Log in to your account and go to your orders to request a return within 7 days of delivery.'
    },
    {
      title: 'Pack Item',
      icon: Package,
      description: 'Carefully pack the item in its original packaging with all accessories and manuals included.'
    },
    {
      title: 'Verification',
      icon: Clock,
      description: 'Once we receive the item, our team will inspect it to ensure it meets our return criteria.'
    },
    {
      title: 'Refund Processed',
      icon: CreditCard,
      description: 'Approved refunds are processed back to your original payment method within 5-7 business days.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Refund & Return Policy</h1>
        <p className="text-gray-600 dark:text-gray-400">We want you to be completely satisfied with your purchase.</p>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">?</span>
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="mb-4 text-blue-600">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-4 -right-4 w-8 h-[2px] bg-gray-200 dark:bg-gray-800"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <section className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-bold mb-4">Eligible Items</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li>Items must be in original, unused condition.</li>
            <li>Original packaging, tags, and all accessories must be included.</li>
            <li>Request must be made within 7 days of receiving the item.</li>
            <li>Proof of purchase (invoice) is required.</li>
          </ul>
        </section>

        <section className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-bold mb-4">Non-Returnable Items</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Certain items are not eligible for return due to hygiene and software licensing reasons:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li>Opened software or digital downloads.</li>
            <li>In-ear headphones (once opened).</li>
            <li>Items with signs of wear or damage.</li>
            <li>Customized or personalized products.</li>
          </ul>
        </section>
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-500 mb-4">Still have questions about returns?</p>
        <a href="/contact" className="inline-block px-8 py-3 bg-gray-900 dark:bg-white dark:text-black text-white rounded-full font-bold hover:opacity-90 transition-opacity">
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default RefundPolicy;
