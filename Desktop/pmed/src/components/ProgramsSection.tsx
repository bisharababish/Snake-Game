import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Microscope, Stethoscope, BookOpen, Users, Award, ChevronRight, Star } from 'lucide-react';

const ProgramsSection: React.FC = () => {
  const [activeProgram, setActiveProgram] = useState(0);

  const programs = [
    {
      id: 1,
      title: 'Basic Medical Education',
      subtitle: 'Foundation for Future Doctors',
      icon: <GraduationCap className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      description: 'Comprehensive medical education program covering fundamental sciences, clinical skills, and professional development.',
      features: [
        'Anatomy & Physiology Mastery',
        'Clinical Skills Training',
        'Medical Ethics & Professionalism',
        'Research Methodology',
        'Patient Communication Skills'
      ],
      duration: '6 Years',
      level: 'Undergraduate',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      title: 'Laboratory Medicine',
      subtitle: 'Advanced Diagnostic Excellence',
      icon: <Microscope className="w-8 h-8" />,
      color: 'from-emerald-500 to-emerald-600',
      description: 'Specialized training in modern laboratory techniques, diagnostic procedures, and quality assurance.',
      features: [
        'Advanced Microscopy Techniques',
        'Molecular Diagnostics',
        'Quality Control & Assurance',
        'Laboratory Management',
        'Emerging Technologies'
      ],
      duration: '2 Years',
      level: 'Postgraduate',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 3,
      title: 'Clinical Specialization',
      subtitle: 'Expert Medical Practice',
      icon: <Stethoscope className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
      description: 'Advanced training in specialized medical fields with hands-on clinical experience.',
      features: [
        'Specialized Clinical Rotations',
        'Advanced Procedures Training',
        'Multidisciplinary Collaboration',
        'Evidence-Based Medicine',
        'Leadership Development'
      ],
      duration: '3-5 Years',
      level: 'Specialty',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/4021952/pexels-photo-4021952.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 4,
      title: 'Research & Development',
      subtitle: 'Innovation in Healthcare',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'from-rose-500 to-rose-600',
      description: 'Cutting-edge research opportunities in medical sciences and healthcare innovation.',
      features: [
        'Research Methodology',
        'Data Analysis & Statistics',
        'Grant Writing & Funding',
        'Publication & Dissemination',
        'International Collaboration'
      ],
      duration: '1-3 Years',
      level: 'Research',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/3938052/pexels-photo-3938052.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const achievements = [
    { icon: <Users className="w-6 h-6" />, value: '2000+', label: 'Graduates' },
    { icon: <Award className="w-6 h-6" />, value: '95%', label: 'Employment Rate' },
    { icon: <Star className="w-6 h-6" />, value: '4.8/5', label: 'Average Rating' },
    { icon: <BookOpen className="w-6 h-6" />, value: '50+', label: 'Research Publications' }
  ];

  return (
    <section id="programs" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 left-20 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-purple-400 rounded-full blur-3xl"></div>
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
            Our Programs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            Comprehensive medical education programs designed to shape the future of healthcare
          </motion.p>
        </motion.div>

        {/* Program Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {programs.map((program, index) => (
            <motion.button
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveProgram(index)}
              className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 ${
                activeProgram === index
                  ? `bg-gradient-to-r ${program.color} text-white shadow-lg`
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              <motion.div
                animate={{ rotate: activeProgram === index ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {program.icon}
              </motion.div>
              <span className="font-semibold">{program.title}</span>
            </motion.button>
          ))}
        </div>

        {/* Active Program Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProgram}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Content */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${programs[activeProgram].color} text-white flex items-center justify-center shadow-lg`}
                  >
                    {programs[activeProgram].icon}
                  </motion.div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {programs[activeProgram].title}
                    </h3>
                    <p className="text-lg text-gray-600">
                      {programs[activeProgram].subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                  {programs[activeProgram].description}
                </p>

                {/* Program Details */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-1">Duration</div>
                    <div className="text-xl font-bold text-gray-900">{programs[activeProgram].duration}</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-1">Level</div>
                    <div className="text-xl font-bold text-gray-900">{programs[activeProgram].level}</div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Key Features</h4>
                  <div className="space-y-3">
                    {programs[activeProgram].features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <ChevronRight className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-8">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(programs[activeProgram].rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    {programs[activeProgram].rating}
                  </span>
                  <span className="text-gray-600">(Based on student feedback)</span>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 rounded-xl bg-gradient-to-r ${programs[activeProgram].color} text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  Learn More & Apply
                </motion.button>
              </div>

              {/* Image */}
              <div className="relative">
                <motion.img
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  src={programs[activeProgram].image}
                  alt={programs[activeProgram].title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${programs[activeProgram].color} opacity-20`}></div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl mb-4"
              >
                {achievement.icon}
              </motion.div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {achievement.value}
              </div>
              <div className="text-gray-600 font-medium">
                {achievement.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramsSection;