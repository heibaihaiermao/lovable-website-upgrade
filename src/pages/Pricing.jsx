
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Check, X, Star, Zap } from 'lucide-react';

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individual bloggers",
      monthlyPrice: 19,
      yearlyPrice: 15,
      features: [
        "5 blog posts per month",
        "Basic SEO optimization",
        "1 workspace",
        "Email support",
        "Basic analytics"
      ],
      limitations: [
        "No team collaboration",
        "Limited templates",
        "No API access"
      ],
      popular: false,
      cta: "Start Free Trial"
    },
    {
      name: "Professional",
      description: "For growing content teams",
      monthlyPrice: 49,
      yearlyPrice: 39,
      features: [
        "Unlimited blog posts",
        "Advanced SEO tools",
        "5 workspaces",
        "Priority support",
        "Advanced analytics",
        "Team collaboration",
        "Content calendar",
        "Brand guidelines"
      ],
      limitations: [
        "Limited API calls",
        "No white-label"
      ],
      popular: true,
      cta: "Start Free Trial"
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      monthlyPrice: 149,
      yearlyPrice: 119,
      features: [
        "Everything in Professional",
        "Unlimited workspaces",
        "24/7 phone support",
        "Custom integrations",
        "API access",
        "White-label solution",
        "Custom analytics",
        "Dedicated account manager",
        "Custom training"
      ],
      limitations: [],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  const getPrice = (plan) => {
    return billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  return (
    <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen transition-colors duration-500">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent animate-fade-in">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.1s'}}>
            Choose the perfect plan for your content creation needs. Start with a free trial and upgrade anytime.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <span className={`font-medium ${billingPeriod === 'monthly' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-14 h-8 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
            <span className={`font-medium ${billingPeriod === 'yearly' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
              Yearly
            </span>
            {billingPeriod === 'yearly' && (
              <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                Save 20%
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border transition-all duration-300 animate-fade-in ${
                  plan.popular 
                    ? 'border-violet-500 shadow-xl scale-105' 
                    : 'border-gray-200 dark:border-gray-700 hover:shadow-xl'
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-violet-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                      <Star size={16} />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">${getPrice(plan)}</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        /{billingPeriod === 'monthly' ? 'month' : 'month'}
                      </span>
                    </div>
                    {billingPeriod === 'yearly' && (
                      <p className="text-sm text-gray-500 mt-1">
                        Billed annually (${getPrice(plan) * 12}/year)
                      </p>
                    )}
                  </div>

                  <button className={`w-full py-3 rounded-lg font-semibold transition-all mb-8 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-violet-500 to-blue-500 text-white hover:brightness-110'
                      : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}>
                    {plan.cta}
                  </button>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        What's included
                      </h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-sm">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.limitations.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <X className="w-5 h-5 text-gray-400" />
                          Not included
                        </h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-sm text-gray-500">
                              <X className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              {limitation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                question: "Can I change my plan anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes, we offer a 14-day free trial for all plans. No credit card required to start."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans."
              },
              {
                question: "Can I cancel anytime?",
                answer: "Absolutely. You can cancel your subscription at any time with no cancellation fees."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Join thousands of content creators who trust BlogForge</p>
          <button className="px-8 py-4 bg-gradient-to-r from-violet-500 to-blue-500 text-white rounded-xl font-semibold hover:brightness-110 transition-all flex items-center gap-2 mx-auto">
            <Zap size={20} />
            Start Your Free Trial
          </button>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
