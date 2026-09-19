export const primaryButton = "bg-primary hover:bg-[#b5e032] text-[#1E232A] font-medium py-3 px-5 rounded-xl inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
export const secondaryButton = "border border-gray-200 bg-white hover:bg-gray-50 text-[#1E232A] font-medium py-3 px-5 rounded-xl inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-50";
export const inputClass = "w-full min-w-0 bg-[#F5F6F8] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1E232A] focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600";
export const locationLabels = { customer: "At your address", provider: "At the provider", online: "Online", route: "Pickup and destination" };
export const statusLabels = { confirmed: "Confirmed", in_progress: "In progress", awaiting_confirmation: "Awaiting your confirmation", completed: "Completed", issue_reported: "Issue reported", checked_in: "Checked in", deposit_pending: "Deposit review" };
export const unitLabels = { hour: "hour", day: "day", night: "night", session: "session", package: "package", item: "item", trip: "trip" };

export function quantityText(service, price) {
  const unit = unitLabels[service.billingUnit];
  return `${price.quantity} ${unit}${price.quantity === 1 ? "" : "s"}`;
}
