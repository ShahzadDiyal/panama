const reviews = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO, TechVentures Inc.',
    avatar: 'SM',
    rating: 5,
    text: 'Paname completely transformed how we source components. We cut procurement time by 60% and found suppliers we never would have discovered on our own.',
  },
  {
    name: 'Ahmed Al-Rashid',
    role: 'Head of Supply Chain, GlobalTrade Co.',
    avatar: 'AR',
    rating: 5,
    text: "The verified supplier network is exceptional. Every supplier we've worked with through Paname has been reliable and professional. Highly recommended.",
  },
  {
    name: 'Li Wei',
    role: 'Procurement Manager, EcoGoods',
    avatar: 'LW',
    rating: 5,
    text: 'The deals section alone saved us over $200K last quarter. The platform is intuitive and the support team is always responsive.',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function ReviewsSection() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Testimonials</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">
            Trusted by industry leaders
          </h2>
          <p className="text-slate-400 text-lg">See what our clients say about working with Paname.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-slate-900 border border-white/10 rounded-2xl p-7 hover:border-amber-400/20 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Stars */}
              <StarRating count={review.rating} />

              {/* Quote */}
              <p className="text-slate-300 text-sm leading-relaxed mt-4 mb-6">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-900 font-bold text-sm flex-shrink-0">
                  {review.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{review.name}</p>
                  <p className="text-slate-500 text-xs">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}