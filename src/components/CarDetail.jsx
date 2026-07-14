import React, { useState, useEffect, useCallback } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, Calendar, Gauge, Users, Clock, ChevronLeft, ChevronRight, ChevronDown, Send, Play, Shield, Truck, CircleCheck as CheckCircle, X, Cog, Car, Images } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import DateRangePicker from './ui/DateRangePicker';

export default function CarDetail() {
  const car = useLoaderData();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    request_type: 'booking',
    vehicle: '',
    start_date: '',
    end_date: '',
    tell_us_about_your_request: '',
    name: '',
    email: '',
    phone: '',
    first_timer_discount: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!car) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Car not found</h1>
          <button 
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700"
          >
            Return to fleet
          </button>
        </div>
      </div>
    );
  }

  const galleryImages = car.images || [];
  const heroImage = car.image || galleryImages[0];

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  const openGallery = (startIndex = 0) => {
    setCurrentImageIndex(startIndex);
    setShowGallery(true);
  };

  const closeGallery = () => {
    setShowGallery(false);
  };

  useEffect(() => {
    if (!showGallery) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') nextImage();
      else if (e.key === 'ArrowLeft') prevImage();
      else if (e.key === 'Escape') closeGallery();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [showGallery, nextImage, prevImage]);

  // Initialize form with car name
  useEffect(() => {
    if (car?.name) {
      setFormData(prev => ({
        ...prev,
        vehicle: car.name
      }));
    }
  }, [car?.name]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 'Yes' : '') : value
    }));
  };

  const handleDateSelect = (startDate, endDate) => {
    setFormData(prev => ({
      ...prev,
      start_date: startDate,
      end_date: endDate
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get current timestamp for the time field
    const currentTime = new Date().toLocaleString();

    try {
      // Create form data with all required fields for EmailJS
      const emailData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        vehicle: formData.vehicle || car?.name || 'Not specified',
        start_date: formData.start_date || 'Not specified',
        end_date: formData.end_date || 'Not specified',
        tell_us_about_your_request: formData.tell_us_about_your_request,
        first_timer_discount: formData.first_timer_discount || 'No',
        time: currentTime
      };

      // Create a temporary form for EmailJS
      const tempForm = document.createElement('form');
      Object.keys(emailData).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = emailData[key];
        tempForm.appendChild(input);
      });

      // 1. Internal email to you/your team
      await emailjs.sendForm(
        'Rad Rides BCR Inquiries',
        'template_8r2jylj',
        tempForm,
        'A-HdMpoJwY4IWoljY'
      );

      // 2. Auto-reply to customer
      await emailjs.sendForm(
        'Rad Rides BCR Inquiries',
        'template_vtv2jgm',
        tempForm,
        'A-HdMpoJwY4IWoljY'
      );

      toast.success('Booking request sent successfully!');

      // Track conversion in Google Ads
      if (window.gtag) {
        window.gtag('event', 'conversion', { 
          'send_to': `${import.meta.env.VITE_GOOGLE_ADS_ID}/${import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL}` 
        });
      }

      // Track form submission in Google Analytics 4
      if (window.gtag) {
        window.gtag('event', 'form_submission', {
          'form_name': 'Car Detail Page Form',
          'vehicle_of_interest': formData.vehicle || car?.name || 'Not specified',
          'request_type': 'booking',
          'first_timer_discount': formData.first_timer_discount || 'No'
        });
      }

      setFormData({
        request_type: 'booking',
        vehicle: car?.name || '',
        start_date: '',
        end_date: '',
        tell_us_about_your_request: '',
        name: '',
        email: '',
        phone: '',
        first_timer_discount: ''
      });

      // Close form after successful submission
      setShowBookingForm(false);
    } catch (error) {
      console.error('EmailJS error:', error);
      toast.error('Failed to send booking request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToContact = () => {
    setShowBookingForm(true);
  };

  // Get pricing based on car name
  const getPricing = (carName) => {
    switch (carName) {
      case 'McLaren 570S Spider':
        return '$1,000';
      case 'Corvette C8 Z06':
        return '$750';
      case 'Cadillac Escalade Sport Platinum':
        return '$450';
      case 'Fiat 500 Abarth':
        return '$350';
      case 'Jeep Wrangler Rubicon 4xe':
        return '$400';
      default:
        return 'Contact for pricing';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" />
      
      {/* Hero Section with Car Image */}
      <div className="relative h-[70vh] lg:h-screen">
        {/* Back Button */}
        <div className="absolute top-8 left-8 z-50">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Fleet
          </button>
        </div>

        {/* Main Car Image - single static hero */}
        <div className="relative w-full h-full overflow-hidden">
          {heroImage && (
            <img
              src={heroImage}
              alt={car.name}
              className="w-full h-full object-cover object-center"
              loading="eager"
              fetchPriority="high"
            />
          )}

        </div>
      </div>

      {/* Car Info + Browse Photos - below header */}
      <div className="bg-white px-4 sm:px-8 py-5 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="car-detail-brand text-gray-500 mb-1">
              {car.name.split(' ')[0]}
            </div>
            <h1 className="car-detail-model text-gray-900">
              {car.name}
            </h1>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {galleryImages.length > 0 && (
              <button
                onClick={() => openGallery(0)}
                className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm"
              >
                <Images className="w-4 h-4" />
                Browse Photos
                <span className="bg-gray-100 rounded px-1.5 py-0.5 text-xs text-gray-500">{galleryImages.length}</span>
              </button>
            )}
            <button
              onClick={scrollToContact}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2 shadow-sm"
            >
              <Phone className="w-4 h-4" />
              Request a Quote
            </button>
          </div>
        </div>
      </div>

      {/* Photo Gallery Lightbox Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4 flex-shrink-0">
            <span className="text-white/70 text-sm font-medium">
              {currentImageIndex + 1} / {galleryImages.length}
            </span>
            <span className="text-white font-semibold">{car.name}</span>
            <button
              onClick={closeGallery}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Close gallery"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main image area */}
          <div className="flex-1 relative flex items-center justify-center min-h-0 px-16">
            {/* Prev arrow */}
            <button
              onClick={prevImage}
              className="absolute left-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Current image */}
            <img
              key={currentImageIndex}
              src={galleryImages[currentImageIndex]}
              alt={`${car.name} photo ${currentImageIndex + 1}`}
              className="max-h-full max-w-full object-contain select-none"
              style={{ maxHeight: 'calc(100vh - 220px)' }}
              loading="eager"
            />

            {/* Next arrow */}
            <button
              onClick={nextImage}
              className="absolute right-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Thumbnail strip */}
          <div className="flex-shrink-0 py-4 px-4">
            <div className="flex gap-2 justify-center overflow-x-auto scrollbar-hide pb-1">
              {galleryImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => selectImage(index)}
                  className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all duration-150 ${
                    index === currentImageIndex
                      ? 'border-blue-400 opacity-100 scale-105'
                      : 'border-white/20 opacity-50 hover:opacity-80 hover:border-white/50'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${car.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Car Details Section */}
      <div className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Overview */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Overview</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {car.overview}
              </p>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{car.acceleration}</div>
                  <div className="text-gray-600">0-60 mph</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{car.horsepower}</div>
                  <div className="text-gray-600">Horsepower</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{car.seats}</div>
                  <div className="text-gray-600">Seats</div>
                </div>
              </div>
            </div>

            {/* Right Column - Features & Booking */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Features</h2>
              <ul className="space-y-3 mb-8">
                {car.features?.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Deposit Info */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Deposit Required</h3>
                <p className="text-gray-700">
                  A refundable deposit of <span className="font-semibold">{car.depositAmount}</span> is required to secure your booking.
                </p>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Book This Car</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="hidden" name="request_type" value="booking" />
                  <input type="hidden" name="vehicle" value={car?.name || ''} />

                  <DateRangePicker
                    onDateChange={(dates) => {
                      setFormData(prev => ({
                        ...prev,
                        start_date: dates.startDate,
                        end_date: dates.endDate
                      }));
                    }}
                    initialStartDate={formData.start_date}
                    initialEndDate={formData.end_date}
                    placeholder="Select rental dates"
                    className="w-full"
                  />

                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full bg-white border border-gray-300 p-3 text-gray-900 rounded-lg placeholder-gray-500 focus:border-blue-500 focus:ring-0 transition-colors"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Your email"
                      className="w-full bg-white border border-gray-300 p-3 text-gray-900 rounded-lg placeholder-gray-500 focus:border-blue-500 focus:ring-0 transition-colors"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Your phone number"
                      className="w-full bg-white border border-gray-300 p-3 text-gray-900 rounded-lg placeholder-gray-500 focus:border-blue-500 focus:ring-0 transition-colors"
                    />
                  </div>

                  <textarea
                    name="tell_us_about_your_request"
                    value={formData.tell_us_about_your_request}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your rental needs"
                    className="w-full bg-white border border-gray-300 p-3 text-gray-900 h-24 rounded-lg resize-none placeholder-gray-500 focus:border-blue-500 focus:ring-0 transition-colors"
                  />

                  <label className="flex items-center gap-3 text-sm text-gray-700">
                    <input 
                      type="checkbox" 
                      name="first_timer_discount" 
                      checked={formData.first_timer_discount === 'Yes'}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                    />
                    This is my first time renting with Rad Rides
                  </label>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-semibold btn-primary"
                  >
                    {isSubmitting ? 'Sending...' : 'Request Quote'}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Alternative Contact Button */}
              <button
                onClick={scrollToContact}
                className="w-full bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call/Text for Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative bg-gray-900 rounded-xl shadow-2xl border border-gray-700 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setShowBookingForm(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Content */}
            <div className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2 font-inter">
                  Request Quote for {car?.name}
                </h2>
                <p className="text-gray-300 text-sm">
                  Fill out the form below and we'll get back to you right away
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="request_type" value="booking" />
                <input type="hidden" name="vehicle" value={car?.name || ''} />

                <DateRangePicker
                  onDateChange={(dates) => {
                    setFormData(prev => ({
                      ...prev,
                      start_date: dates.startDate,
                      end_date: dates.endDate
                    }));
                  }}
                  initialStartDate={formData.start_date}
                  initialEndDate={formData.end_date}
                  placeholder="Select rental dates"
                />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full bg-gray-800 border border-gray-600 p-3 text-white text-sm placeholder-gray-400 rounded focus:border-blue-500 focus:ring-0 transition-colors"
                />

                <textarea
                  name="tell_us_about_your_request"
                  value={formData.tell_us_about_your_request}
                  onChange={handleChange}
                  required
                  placeholder="Tell us about your rental needs"
                  className="w-full bg-gray-800 border border-gray-600 p-3 text-white h-24 text-sm placeholder-gray-400 rounded focus:border-blue-500 focus:ring-0 transition-colors resize-none"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your email"
                  className="w-full bg-gray-800 border border-gray-600 p-3 text-white text-sm placeholder-gray-400 rounded focus:border-blue-500 focus:ring-0 transition-colors"
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Your phone number"
                  className="w-full bg-gray-800 border border-gray-600 p-3 text-white text-sm placeholder-gray-400 rounded focus:border-blue-500 focus:ring-0 transition-colors"
                />

                <label className="flex items-center gap-3 text-sm text-white">
                  <input 
                    type="checkbox" 
                    name="first_timer_discount" 
                    checked={formData.first_timer_discount === 'Yes'}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                  />
                  This is my first time renting with Rad Rides
                </label>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold btn-primary"
                >
                  {isSubmitting ? 'Sending...' : 'Request Quote'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}