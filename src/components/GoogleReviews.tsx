export default function GoogleReviews() {
  const reviews = [
    {
      id: 1,
      name: "Adeesha Ganegoda",
      avatar: "https://ui-avatars.com/api/?name=Adeesha+Ganegoda&background=8B5CF6&color=fff",
      time: "2 months ago",
      rating: 5,
      text: "I recently attended a wedding reception at Royal Chance Palace Banquets, and I was truly impressed. The venue is beautiful, spacious, and very well maintained. The food was delicious with a great variety, and everything was served fresh. The staff were courteous, attentive, and ensured the event ran smoothly from start to finish. The ambiance, decorations, and overall organization created a wonderful experience for all the guests. I would definitely recommend Royal Chance Palace Banquets to anyone looking for a high-quality venue for weddings and special occasions.",
      isLocalGuide: false
    },
    {
      id: 2,
      name: "Yasas Chandrasiri",
      avatar: "https://ui-avatars.com/api/?name=Yasas+Chandrasiri&background=F59E0B&color=fff",
      time: "8 months ago",
      rating: 5,
      text: "Luxury banquet hall.Can put 400+ pax easily.It is located in 50m to Kandy road at Yakkala, Bogamuwa (Horagolla Road). Also the place has quite big space inside and out! Very beautiful Hall Highly Recommend",
      isLocalGuide: true
    },
    {
      id: 3,
      name: "Janitha Wikramarachchi",
      avatar: "https://ui-avatars.com/api/?name=Janitha+Wikramarachchi&background=F97316&color=fff",
      time: "2 months ago",
      rating: 5,
      text: "Had a great experience at Royal Chance Palace Banquet. The place is very beautiful and well arranged. The food was really tasty, and the service team was very friendly and helpful. The atmosphere was nice, and everything was managed properly. A good place for weddings and special functions. Highly recommended.",
      isLocalGuide: false
    }
  ];

  // Replace this URL with your actual Google My Business Review Link
  const writeReviewUrl = "https://www.google.com/search?q=Royal+Chance+Palace+Banquets";

  return (
    <section className="py-16 sm:py-24 bg-gray-50 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Royal Chance Palace Banquets</h2>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-3xl font-bold text-gray-900">4.4</span>
              <div className="flex text-amber-500">
                {[...Array(4)].map((_, i) => (
                  <svg key={i} className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
                {/* Half Star */}
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1.05 4.28L12 15.4z" opacity=".3"/>
                  <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1v9.3z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-500 ml-1">286 reviews</span>
              <svg className="h-4 w-4 text-gray-400 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Write a Review Button */}
          <div>
            <a
              href={writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-blue-600 shadow-sm transition-all hover:bg-blue-50 hover:border-blue-200"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
              Write a review
            </a>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-lg hover:-translate-y-1 relative flex flex-col">
              {/* Google G Logo inside card */}
              <div className="absolute top-6 right-6 opacity-10">
                <svg className="h-8 w-8" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <img src={review.avatar} alt={review.name} className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover shadow-sm" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base">{review.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    {review.isLocalGuide && (
                      <span className="text-[10px] text-gray-500 flex items-center gap-1">
                         <svg className="h-3 w-3 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                         </svg>
                         Local Guide
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`h-4 w-4 ${i < review.rating ? 'text-amber-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-500">{review.time}</span>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed flex-1">
                {review.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://www.google.com/search?q=Royal+Chance+Palace+Banquets#lrd=0x3ae2fd61f2c07b73:0xdfeb7e859a1d2ce0,3,,,,"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Read all 286 reviews on Google
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}