import { useState } from 'react'

const faqs = [
  {
    question: 'How does Paname verify its suppliers?',
    answer: 'Every supplier on Paname goes through a rigorous multi-step verification process including business registration checks, financial audits, quality certifications review, and reference checks. Only suppliers that meet our high standards are listed on the platform.',
  },
  {
    question: 'What industries does Paname cover?',
    answer: 'Paname covers a wide range of industries including manufacturing, electronics, textiles, food & beverages, chemicals, automotive, and more. Our platform has verified suppliers from over 150 countries across virtually all B2B sectors.',
  },
  {
    question: 'How quickly can I find and connect with a supplier?',
    answer: 'Most buyers find suitable suppliers within 24 hours of signing up. Our AI-powered matching system instantly recommends relevant suppliers based on your requirements, and you can contact them directly through our platform.',
  },
  {
    question: 'Is there a free trial available?',
    answer: 'Yes! We offer a 14-day free trial with full access to all features. No credit card required. You can browse suppliers, view deals, and even send up to 10 connection requests during your trial period.',
  },
  {
    question: 'How does Paname ensure secure transactions?',
    answer: 'Paname uses bank-level encryption for all communications and financial transactions. We also offer escrow services for larger deals, ensuring both buyers and suppliers are protected throughout the entire transaction process.',
  },
  {
    question: 'Can I use Paname for one-time purchases or only ongoing contracts?',
    answer: 'Both! Paname supports everything from one-time spot purchases to long-term supply contracts. You can browse deals for immediate purchases or negotiate framework agreements with suppliers for ongoing business.',
  },
]

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors duration-200"
      >
        <span className="text-white font-medium text-sm pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-amber-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`transition-all duration-300 overflow-hidden ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="px-5 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/10 pt-4">
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function FaqSection() {
  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">FAQ</span>
          <h2 className="text-4xl font-bold text-white mt-3 mb-4">Frequently asked questions</h2>
          <p className="text-slate-400">Everything you need to know about Paname.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem key={i} {...faq} />
          ))}
        </div>

      </div>
    </section>
  )
}