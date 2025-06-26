import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Microscope, Brain, Heart, Dna, Pill, Activity, Eye, ArrowRight, ExternalLink } from 'lucide-react';

const ResearchSection: React.FC = () => {
  const [activeResearch, setActiveResearch] = useState(0);

  const researchAreas = [
    {
      id: 1,
      title: 'Neuroscience Research',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
      description: 'Advancing understanding of neurological disorders and brain function',
      projects: [
        'Alzheimer\'s Disease Biomarkers',
        'Stroke Recovery Mechanisms',
        'Neuroplasticity Studies',
        'Brain-Computer Interfaces'
      ],
      publications: 24,
      funding: '$2.3M',
      image: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      title: 'Cardiovascular Medicine',
      icon: <Heart className="w-8 h-8" />,
      color: 'from-red-500 to-red-600',
      description: 'Innovative approaches to heart disease prevention and treatment',
      projects: [
        'Cardiac Regeneration Therapy',
        'Hypertension Management',
        'Heart Failure Prevention',
        'Minimally Invasive Procedures'
      ],
      publications: 31,
      funding: '$3.1M',
      image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 3,
      title: 'Genetic Medicine',
      icon: <Dna className="w-8 h-8" />,
      color: 'from-green-500 to-green-600',
      description: 'Exploring genetic factors in disease and personalized medicine',
      projects: [
        'Gene Therapy Protocols',
        'Genetic Screening Programs',
        'Pharmacogenomics Research',
        'Rare Disease Studies'
      ],
      publications: 18,
      funding: '$1.8M',
      image: 'https://images.pexels.com/photos/3938052/pexels-photo-3938052.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 4,
      title: 'Pharmacology',
      icon: <Pill className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      description: 'Developing new therapeutic approaches and drug delivery systems',
      projects: [
        'Novel Drug Compounds',
        'Targeted Therapy Systems',
        'Drug Resistance Studies',
        'Personalized Dosing'
      ],
      publications: 22,
      funding: '$2.7M',
      image: 'https://images.pexels.com/photos/4021952/pexels-photo-4021952.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const labFacilities = [
    {
      name: 'Advanced Microscopy Lab',
      icon: <Microscope className="w-6 h-6" />,
      description: 'State-of-the-art imaging and analysis equipment'
    },
    {
      name: 'Molecular Biology Lab',
      icon: <Dna className="w-6 h-6" />,
      description: 'Genetic sequencing and molecular diagnostics'
    },
    {
      name: 'Physiological Monitoring',
      icon: <Activity className="w-6 h-6" />,
      description: 'Real-time monitoring and analysis systems'
    },
    {
      name: 'Ophthalmology Research',
      icon: <Eye className="w-6 h-6" />,
      description: 'Specialized equipment for vision research'
    }
  ];

  return (
    <section id="research" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
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
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 bg-clip-text text-transparent mb-6"
          >
            Research Excellence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            Leading breakthrough discoveries in medical science and advancing healthcare innovation
          </motion.p>
        </motion.div>

        {/* Research Area Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {researchAreas.map((area, index) => (
            <motion.button
              key={area.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveResearch(index)}
              className={`p-6 rounded-2xl transition-all duration-300 ${
                activeResearch === index
                  ? `bg-gradient-to-r ${area.color} text-white shadow-2xl`
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg hover:shadow-xl'
              }`}
            >
              <motion.div
                animate={{ rotate: activeResearch === index ? 360 : 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center mb-4"
              >
                {area.icon}
              </motion.div>
              <h3 className="font-bold text-lg mb-2">{area.title}</h3>
              <p className={`text-sm ${activeResearch === index ? 'text-blue-100' : 'text-gray-600'}`}>
                {area.description}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Active Research Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeResearch}
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
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${researchAreas[activeResearch].color} text-white flex items-center justify-center shadow-lg`}
                  >
                    {researchAreas[activeResearch].icon}
                  </motion.div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {researchAreas[activeResearch].title}
                    </h3>
                    <p className="text-lg text-gray-600">
                      {researchAreas[activeResearch].description}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-1">Publications</div>
                    <div className="text-2xl font-bold text-gray-900">{researchAreas[activeResearch].publications}</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-1">Funding</div>
                    <div className="text-2xl font-bold text-gray-900">{researchAreas[activeResearch].funding}</div>
                  </div>
                </div>

                {/* Active Projects */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Active Projects</h4>
                  <div className="space-y-3">
                    {researchAreas[activeResearch].projects.map((project, index) => (
                      <motion.div
                        key={project}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <ArrowRight className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-700 font-medium">{project}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 rounded-xl bg-gradient-to-r ${researchAreas[activeResearch].color} text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2`}
                >
                  <span>View Research Publications</span>
                  <ExternalLink className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Image */}
              <div className="relative">
                <motion.img
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  src={researchAreas[activeResearch].image}
                  alt={researchAreas[activeResearch].title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${researchAreas[activeResearch].color} opacity-20`}></div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Lab Facilities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            State-of-the-Art Facilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {labFacilities.map((facility, index) => (
              <motion.div
                key={facility.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl mb-4"
                >
                  {facility.icon}
                </motion.div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{facility.name}</h4>
                <p className="text-gray-600 text-sm">{facility.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Research Impact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Making a Global Impact
          </h3>
          <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed mb-8">
            Our research initiatives are transforming healthcare delivery and medical education,
            contributing to scientific knowledge that benefits communities worldwide.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">95+</div>
              <div className="text-blue-100">Research Publications</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$12M+</div>
              <div className="text-blue-100">Research Funding</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-blue-100">International Collaborations</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchSection;