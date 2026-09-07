import { useState } from "react";
import { useLocation, Link, Navigate, useNavigate } from "react-router-dom";

export default function CreateServiceCampaign() {
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state?.service;
  const bookingDetails = location.state?.bookingDetails;
  
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  if (!service) return <Navigate to="/services" />;

  const handleNext = () => setStep(s => Math.min(s + 1, totalSteps));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
          <span className="material-symbols-outlined text-gray-700">arrow_back</span>
        </button>
        <div>
          <h1 className="text-2xl font-outfit font-bold text-[#1E232A]">Create a Campaign</h1>
          <p className="text-sm text-gray-500">Share your story and make a difference in your community</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-2 mb-8 mt-6">
        {[1, 2, 3].map(i => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${step >= i ? 'bg-[#b5e032]' : 'bg-gray-200'}`}></div>
        ))}
      </div>

      {/* Content Box */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm mb-24">
        {step === 1 && <StepBasicInfo />}
        {step === 2 && <StepTellStory />}
        {step === 3 && <StepReview service={service} bookingDetails={bookingDetails} />}
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-[calc(56px+max(env(safe-area-inset-bottom),0.5rem))] md:bottom-0 left-0 md:left-[260px] right-0 bg-white border-t border-gray-100 p-4 z-40">
        <div className="max-w-4xl mx-auto flex justify-between items-center px-4">
          <button 
            onClick={step === 1 ? () => navigate(-1) : handlePrev}
            className="flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-6 rounded-lg transition-colors text-sm"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            {step === 1 ? 'Cancel' : 'Previous'}
          </button>

          <div className="flex gap-3">
            <button className="hidden sm:block border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-6 rounded-lg transition-colors text-sm">
              Save Draft
            </button>
            {step < totalSteps ? (
              <button 
                onClick={handleNext}
                className="bg-[#b5e032] hover:bg-[#a3cc2b] text-[#1E232A] font-medium py-2.5 px-8 rounded-lg flex items-center gap-2 transition-colors text-sm"
              >
                Continue
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            ) : (
              <Link 
                to="/campaigns"
                className="bg-[#b5e032] hover:bg-[#a3cc2b] text-[#1E232A] font-medium py-2.5 px-8 rounded-lg flex items-center gap-2 transition-colors text-sm"
              >
                Launch Campaign
                <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepBasicInfo() {
  return (
    <div>
      <h2 className="text-xl font-bold text-[#1E232A] mb-1">Basic Information</h2>
      <p className="text-gray-500 text-sm mb-8">Let's start with the essentials of your campaign</p>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-[#1E232A] mb-1">Campaign Title *</label>
          <p className="text-xs text-gray-500 mb-2">Choose a clear, compelling title that describes your cause</p>
          <input type="text" placeholder="e.g., Emergency Medical Expenses for Surgery" className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm focus:outline-none focus:border-[#b5e032] focus:bg-white transition-colors" />
          <p className="text-[10px] text-gray-400 mt-1">0/100 characters</p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1E232A] mb-1">Category *</label>
          <p className="text-xs text-gray-500 mb-2">Select the category that best fits your campaign</p>
          <div className="relative">
            <select className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm appearance-none focus:outline-none focus:border-[#b5e032] focus:bg-white transition-colors text-gray-500">
              <option>Select a category</option>
              <option>Housing & Rent</option>
              <option>Medical</option>
              <option>Education</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-3 text-gray-400 pointer-events-none">expand_more</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1E232A] mb-1">Campaign Duration *</label>
          <p className="text-xs text-gray-500 mb-2">How long will your campaign run?</p>
          <div className="relative">
            <select className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm appearance-none focus:outline-none focus:border-[#b5e032] focus:bg-white transition-colors text-gray-500">
              <option>Select duration</option>
              <option>14 days</option>
              <option>30 days</option>
              <option>60 days</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-3 text-gray-400 pointer-events-none">expand_more</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepTellStory() {
  return (
    <div>
      <h2 className="text-xl font-bold text-[#1E232A] mb-1">Tell Your Story</h2>
      <p className="text-gray-500 text-sm mb-8">A compelling story helps people connect with your cause</p>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-[#1E232A] mb-1">Short Description *</label>
          <p className="text-xs text-gray-500 mb-2">A brief summary that will appear in campaign previews</p>
          <textarea placeholder="Summarize your campaign in 1-2 sentences..." className="w-full h-24 bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm focus:outline-none focus:border-[#b5e032] focus:bg-white transition-colors resize-none"></textarea>
          <p className="text-[10px] text-gray-400 mt-1">0/200 characters</p>
        </div>
        <div>
          <div className="flex justify-between items-end mb-1">
            <label className="block text-sm font-semibold text-[#1E232A]">Full Campaign Story</label>
            <button className="flex items-center gap-1 text-blue-600 text-xs font-medium hover:underline">
              <span className="material-symbols-outlined text-[14px]">info</span> Tips for a compelling story
            </button>
          </div>
          <p className="text-xs text-gray-500 mb-2">Share the complete story. Include specific details about your situation.</p>
          <textarea placeholder="Tell your story here... Be specific about:&#10;• What happened and why you need support&#10;• How the funds will be used&#10;• The impact donations will make&#10;• Any relevant background information" className="w-full h-48 bg-gray-50 border border-gray-100 rounded-lg p-4 text-sm focus:outline-none focus:border-[#b5e032] focus:bg-white transition-colors resize-none"></textarea>
          <p className="text-[10px] text-gray-400 mt-1">0 characters</p>
        </div>
      </div>
    </div>
  );
}

function StepReview({ service, bookingDetails }) {
  const goalAmount = bookingDetails ? bookingDetails.formattedTotal : service.price;

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1E232A] mb-6">Review & Launch</h2>
      
      <div className="space-y-6">
        {/* Service Selected Card */}
        <div className="border border-green-200 rounded-xl p-6 bg-[#fafff0]">
          <div className="flex gap-4 items-start mb-2">
            <span className="material-symbols-outlined text-green-600 mt-0.5">check_circle</span>
            <div>
              <h3 className="font-bold text-[#1E232A] text-sm">Service Selected</h3>
              <p className="text-sm font-medium mt-1">{service.title} <span className="font-normal text-gray-500">from {service.merchant}</span></p>
            </div>
          </div>
          <p className="text-sm text-gray-600 pl-10">
            Your campaign goal will be set to <strong className="text-[#1E232A]">{goalAmount}</strong> to cover the full service cost. When the goal is reached, the service will be automatically booked with {service.merchant}.
          </p>
        </div>

        {/* Beneficiary Details (Placeholder for 'Delivery Address' equivalent) */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
            <span className="material-symbols-outlined text-gray-500 text-[18px]">person</span>
            <h3 className="font-bold text-[#1E232A] text-sm">Beneficiary Details</h3>
          </div>
          <div className="p-4 bg-[#fafff0] border-b border-green-200 cursor-pointer">
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-green-600">check_circle</span>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-[#1E232A] text-sm">My Account</h4>
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">Default</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Hello, Champ</p>
                <p className="text-xs text-gray-500 mt-0.5">hello@supportbuy.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
