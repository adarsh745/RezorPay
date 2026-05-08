import React from 'react';
import { Shield, Target, Users, Zap } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Founded', value: '2023', icon: Zap },
    { label: 'Customers', value: '50k+', icon: Users },
    { label: 'Products', value: '1.2k+', icon: Target },
    { label: 'Secure Payments', value: '100%', icon: Shield },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          About TechStore
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We're on a mission to bring the latest technology to your doorstep, combining innovation with exceptional customer service.
        </p>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            Founded with a vision to revolutionize the tech shopping experience, TechStore has grown from a small startup to a leading destination for gadget enthusiasts. We believe that technology should be accessible, reliable, and exciting.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            Every product in our catalog is carefully curated and tested to ensure it meets our high standards of quality and performance. We don't just sell gadgets; we provide the tools that empower your digital lifestyle.
          </p>
        </div>
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl">
             <img 
               src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" 
               alt="Team working" 
               className="rounded-lg w-full h-64 object-cover mb-6"
             />
             <div className="grid grid-cols-2 gap-4">
               {stats.map((stat, idx) => (
                 <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
                   <stat.icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                   <div className="text-2xl font-bold">{stat.value}</div>
                   <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'Quality First', description: 'We only partner with brands that share our commitment to excellence.' },
          { title: 'Customer Centric', description: 'Our support team is available 24/7 to help you with any queries.' },
          { title: 'Innovation', description: 'Staying ahead of the curve with the latest tech trends and products.' }
        ].map((value, idx) => (
          <div key={idx} className="p-8 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-4 text-blue-600">{value.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
