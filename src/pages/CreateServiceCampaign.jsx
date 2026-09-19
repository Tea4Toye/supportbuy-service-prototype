import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useBookings } from "../bookings/BookingProvider";
import { getService } from "../data/services";
import { calculatePrice, formatMoney } from "../bookings/bookingModel";
import { BookingFacts, MissingBooking, ServicePreview } from "../bookings/BookingUI";
import { primaryButton } from "../bookings/bookingPresentation";

const categories = ["Housing & Rent", "Medical", "Education", "Personal Services", "Events", "Other"];
const fieldClass = "w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm focus:outline-none focus:border-[#b5e032] focus:bg-white transition-colors";

export default function CreateServiceCampaign() {
  const [params] = useSearchParams();
  const { getDraft } = useBookings();
  const draft = getDraft(params.get("draft"));
  const service = draft && getService(draft.serviceId);
  if (!draft || !service) return <MissingBooking />;
  if (draft.bookingId) return <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 p-8"><h1 className="text-2xl font-outfit font-bold mb-3">Booking already confirmed</h1><p className="text-gray-500 mb-6">This booking has been paid for. Open its details to view the service.</p><Link className={primaryButton} to={`/booking/${draft.bookingId}`}>View booking</Link></div>;
  return <CampaignForm key={draft.id} draft={draft} service={service} />;
}

function CampaignForm({ draft, service }) {
  const { saveDraft } = useBookings();
  const [campaign, setCampaign] = useState(() => ({ title: "", category: "", duration: "", description: "", story: "", ...draft.campaign }));
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [saved, setSaved] = useState(false);
  const price = calculatePrice(service, draft.selection);
  const summaryUrl = `/booking-summary?draft=${draft.id}`;
  const change = (field, value) => {
    setCampaign(current => ({ ...current, [field]: value }));
    setError("");
    setNotice("");
  };
  const persist = () => {
    try {
      saveDraft({ ...draft, campaign: { ...campaign, goalAmount: price.total, status: "draft" } });
      setNotice("Campaign draft saved in this browser. It has not been published.");
      return true;
    } catch (failure) {
      setError(failure.message);
      return false;
    }
  };
  const next = () => {
    if (step === 1 && (!campaign.title.trim() || !categories.includes(campaign.category) || !["14", "30", "60"].includes(campaign.duration))) {
      setError("Enter a campaign title, choose a category, and select a duration.");
      return;
    }
    if (step === 2 && !campaign.description.trim()) {
      setError("Add a short description before continuing.");
      return;
    }
    if (persist()) { setStep(current => current + 1); setError(""); }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-2">
        <Link to={summaryUrl} aria-label="Back to booking summary" className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"><span className="material-symbols-outlined text-gray-700">arrow_back</span></Link>
        <div><h1 className="text-2xl font-outfit font-bold text-[#1E232A]">Create a Campaign</h1><p className="text-sm text-gray-500">Share your story and save a draft for your service</p></div>
      </div>
      <div aria-label={`Step ${step} of 3`} className="flex gap-2 mb-8 mt-6">{[1, 2, 3].map(index => <div key={index} className={`h-1.5 flex-1 rounded-full ${step >= index ? "bg-[#b5e032]" : "bg-gray-200"}`} />)}</div>
      <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-8 shadow-sm mb-24">
        <p className="text-sm text-gray-600 rounded-xl bg-[#fafff0] border border-green-200 p-4 mb-6">Funding does not reserve an appointment slot. Your schedule must be confirmed when the service is funded.</p>
        {error && <p role="alert" className="text-sm text-red-700 mb-5">{error}</p>}
        {notice && <p role="status" className="text-sm text-green-700 mb-5">{notice}</p>}
        {saved ? <div><h2 className="text-xl font-bold text-[#1E232A] mb-3">Campaign draft saved</h2><p className="text-gray-500 text-sm mb-6">Your story and goal of {formatMoney(price.total)} are saved with this booking draft. No campaign has been published and no payment has been taken.</p><Link className={primaryButton} to={summaryUrl}>Back to booking summary</Link><button onClick={() => { setSaved(false); setNotice(""); }} className="block text-sm underline text-gray-600 mt-5">Edit campaign draft</button></div> : <>
          {step === 1 && <StepBasicInfo campaign={campaign} change={change} />}
          {step === 2 && <StepTellStory campaign={campaign} change={change} />}
          {step === 3 && <StepReview service={service} draft={draft} campaign={campaign} price={price} />}
        </>}
      </div>
      {!saved && <div className="fixed bottom-[calc(56px+max(env(safe-area-inset-bottom),0.5rem))] md:bottom-0 left-0 md:left-[260px] right-0 bg-white border-t border-gray-100 p-3 sm:p-4 z-40">
        <div className="max-w-4xl mx-auto flex justify-between items-center gap-2 sm:px-4">
          {step === 1 ? <Link to={summaryUrl} className="border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-lg text-sm">Cancel</Link> : <button onClick={() => { setStep(current => current - 1); setError(""); }} className="border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-lg text-sm">Previous</button>}
          <div className="flex gap-2">
            {step < 3 && <button onClick={persist} className="border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-3 sm:px-6 rounded-lg text-sm">Save Draft</button>}
            <button onClick={step < 3 ? next : () => { if (persist()) setSaved(true); }} className="bg-[#b5e032] hover:bg-[#a3cc2b] text-[#1E232A] font-medium py-2.5 px-4 sm:px-8 rounded-lg transition-colors text-sm">{step < 3 ? "Continue" : "Save campaign draft"}</button>
          </div>
        </div>
      </div>}
    </div>
  );
}

function StepBasicInfo({ campaign, change }) {
  return <div>
    <h2 className="text-xl font-bold text-[#1E232A] mb-1">Basic Information</h2>
    <p className="text-gray-500 text-sm mb-8">Start with the essentials of your campaign</p>
    <div className="space-y-6">
      <div><label htmlFor="campaign-title" className="block text-sm font-semibold text-[#1E232A] mb-1">Campaign Title *</label><p className="text-xs text-gray-500 mb-2">Choose a title that describes your cause</p><input id="campaign-title" type="text" maxLength={100} required placeholder="e.g., Tutoring support for the new school term" value={campaign.title} onChange={event => change("title", event.target.value)} className={fieldClass} /><p className="text-[10px] text-gray-400 mt-1">{campaign.title.length}/100 characters</p></div>
      <div><label htmlFor="campaign-category" className="block text-sm font-semibold text-[#1E232A] mb-1">Category *</label><p className="text-xs text-gray-500 mb-2">Select the category that best fits your campaign</p><select id="campaign-category" required value={campaign.category} onChange={event => change("category", event.target.value)} className={fieldClass}><option value="">Select a category</option>{categories.map(category => <option key={category}>{category}</option>)}</select></div>
      <div><label htmlFor="campaign-duration" className="block text-sm font-semibold text-[#1E232A] mb-1">Campaign Duration *</label><p className="text-xs text-gray-500 mb-2">How long would your campaign run?</p><select id="campaign-duration" required value={campaign.duration} onChange={event => change("duration", event.target.value)} className={fieldClass}><option value="">Select duration</option>{["14", "30", "60"].map(days => <option key={days} value={days}>{days} days</option>)}</select></div>
    </div>
  </div>;
}

function StepTellStory({ campaign, change }) {
  return <div>
    <h2 className="text-xl font-bold text-[#1E232A] mb-1">Tell Your Story</h2><p className="text-gray-500 text-sm mb-8">Explain how this service will help</p>
    <div className="space-y-6">
      <div><label htmlFor="campaign-description" className="block text-sm font-semibold text-[#1E232A] mb-1">Short Description *</label><p className="text-xs text-gray-500 mb-2">A brief summary for your campaign</p><textarea id="campaign-description" required maxLength={200} placeholder="Summarize your campaign in 1–2 sentences..." value={campaign.description} onChange={event => change("description", event.target.value)} className={`${fieldClass} h-24 resize-none`} /><p className="text-[10px] text-gray-400 mt-1">{campaign.description.length}/200 characters</p></div>
      <div><label htmlFor="campaign-story" className="block text-sm font-semibold text-[#1E232A] mb-1">Full Campaign Story</label><p className="text-xs text-gray-500 mb-2">Describe the support you need and how the funds will be used.</p><textarea id="campaign-story" maxLength={5000} placeholder="Tell your story here..." value={campaign.story} onChange={event => change("story", event.target.value)} className={`${fieldClass} h-48 resize-none`} /><p className="text-[10px] text-gray-400 mt-1">{campaign.story.length}/5000 characters</p></div>
    </div>
  </div>;
}

function StepReview({ service, draft, campaign, price }) {
  return <div>
    <h2 className="text-xl font-bold text-[#1E232A] mb-6">Review & Save</h2>
    <div className="space-y-6">
      <div className="border border-green-200 rounded-xl p-5 sm:p-6 bg-[#fafff0]"><ServicePreview service={service} price={price} /><p className="text-sm text-gray-600 mt-4">Your campaign goal is <strong className="text-[#1E232A]">{formatMoney(price.total)}</strong> to cover the full listed service cost.</p></div>
      <div className="border border-gray-200 rounded-xl p-4 space-y-3"><h3 className="font-bold text-[#1E232A] break-words">{campaign.title}</h3><p className="text-xs text-gray-500">{campaign.category} · {campaign.duration} days</p><p className="text-sm whitespace-pre-wrap break-words">{campaign.description}</p>{campaign.story && <p className="text-sm text-gray-600 whitespace-pre-wrap break-words">{campaign.story}</p>}</div>
      <div className="border border-gray-200 rounded-xl overflow-hidden"><div className="bg-gray-50 px-4 py-3 border-b border-gray-200"><h3 className="font-bold text-[#1E232A] text-sm">Booking details</h3></div><div className="p-4"><BookingFacts service={service} selection={draft.selection} contact={draft.contact?.name ? draft.contact : undefined} /></div></div>
    </div>
  </div>;
}
