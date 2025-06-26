import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ArrowRight, Star, Ticket } from 'lucide-react';

const EventsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingEvents = [
    {
      id: 1,
      title: 'International Palestinian Conference for Laboratory Medicine',
      date: 'August 21-23, 2025',
      time: '9:00 AM - 6:00 PM',
      location: 'Palestine Medical Center, Ramallah',
      type: 'Conference',
      attendees: 500,
      featured: true,
      description: 'A comprehensive conference bringing together leading experts in laboratory medicine from around the world.',
      image: 'https://images.pexels.com/photos/3279203/pexels-photo-3279203.jpeg?auto=compress&cs=tinysrgb&w=800',
      highlights: [
        'Keynote speakers from top universities',
        'Hands-on workshops and demonstrations',
        'Networking opportunities',
        'Latest research presentations'
      ]
    },
    {
      id: 2,
      title: 'Medical Innovation Summit',
      date: 'September 15, 2025',
      time: '10:00 AM - 4:00 PM',
      location: 'PMED Auditorium',
      type: 'Summit',
      attendees: 200,
      featured: false,
      description: 'Exploring the latest innovations in medical technology and their applications in healthcare.',
      image: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800',
      highlights: [
        'Technology demonstrations',
        'Startup pitch sessions',
        'Panel discussions',
        'Investment opportunities'
      ]
    },
    {
      id: 3,
      title: 'Clinical Skills Workshop',
      date: 'October 10, 2025',
      time: '9:00 AM - 5:00 PM',
      location: 'PMED Training Center',
      type: 'Workshop',
      attendees: 50,
      featured: false,
      description: 'Intensive hands-on training session for advanced clinical procedures and patient care.',
      image: 'https://images.pexels.com/photos/4021952/pexels-photo-4021952.jpeg?auto=compress&cs=tinysrgb&w=800',
      highlights: [
        'Practical skill development',
        'Expert instructor guidance',
        'Small group sessions',
        'Certification available'
      ]
    }
  ];

  const pastEvents = [
    {
      id: 4,
      title: 'Annual Medical Research Symposium',
      date: 'March 20, 2024',
      location: 'Jerusalem Convention Center',
      type: 'Symposium',
      attendees: 350,
      description: 'A successful gathering showcasing groundbreaking medical research and innovations.',
      image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8
    },
    {
      id: 5,
      title: 'Healthcare Leadership Forum',
      date: 'January 15, 2024',
      location: 'PMED Headquarters',
      type: 'Forum',
      attendees: 120,
      description: 'Leadership development and strategic planning for healthcare professionals.',
      image: 'https://images.pexels.com/photos/3938052/pexels-photo-3938052.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9
    }
  ];

  const eventTypes = [
    { name: 'Conferences', count: 8, color: 'from-blue-500 to-blue-600' },
    { name: 'Workshops', count: 15, color: 'from-emerald-500 to-emerald-600' },
    { name: 'Seminars', count: 12, color: 'from-purple-500 to-purple-600' },
    { name: 'Symposiums', count: 6, color: 'from-rose-500 to-rose-600' }
  ];

  return (
    <section id="events" className="py-20 bg-gradient-to-br from-gray-50 via-white to-slate-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 left-10 w-80 h-80 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6"
          >
            Events & Conferences
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            Join us for world-class medical conferences, workshops, and educational events
          </motion.p>
        </motion.div>

        {/* Event Type Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {eventTypes.map((type, index) => (
            <motion.div
              key={type.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`text-3xl font-bold bg-gradient-to-r ${type.color} bg-clip-text text-transparent mb-2`}>
                {type.count}
              </div>
              <div className="text-gray-600 font-medium">{type.name}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'upcoming'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'past'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Past Events
            </button>
          </div>
        </div>

        {/* Events Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'upcoming' ? (
              <div className="space-y-8">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 ${
                      event.featured ? 'ring-4 ring-blue-200' : ''
                    }`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      {/* Image */}
                      <div className="relative">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        {event.featured && (
                          <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                            <Star className="w-4 h-4" fill="currentColor" />
                            Featured Event
                          </div>
                        )}
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {event.type}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 lg:p-12">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                          {event.description}
                        </p>

                        {/* Event Details */}
                        <div className="space-y-4 mb-8">
                          <div className="flex items-center gap-3 text-gray-700">
                            <Calendar className="w-5 h-5 text-blue-500" />
                            <span className="font-medium">{event.date}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-700">
                            <Clock className="w-5 h-5 text-blue-500" />
                            <span className="font-medium">{event.time}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-700">
                            <MapPin className="w-5 h-5 text-blue-500" />
                            <span className="font-medium">{event.location}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-700">
                            <Users className="w-5 h-5 text-blue-500" />
                            <span className="font-medium">{event.attendees} Expected Attendees</span>
                          </div>
                        </div>

                        {/* Highlights */}
                        <div className="mb-8">
                          <h4 className="text-lg font-bold text-gray-900 mb-4">Event Highlights</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {event.highlights.map((highlight, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <ArrowRight className="w-4 h-4 text-blue-500" />
                                <span className="text-gray-700 text-sm">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* CTA Button */}
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <Ticket className="w-5 h-5" />
                          Register Now
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {pastEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {event.type}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                          <span className="text-sm font-semibold text-gray-700">{event.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-500" />
                          <span>{event.attendees} Attendees</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Don't Miss Our Next Event
          </h3>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
            Stay updated with the latest medical conferences, workshops, and educational opportunities.
            Join our community of healthcare professionals and researchers.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Subscribe to Event Updates
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;