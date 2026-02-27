"use client";

export default function OpenCookiePreferencesButton() {
  function openPrefs() {
    const fn = (window as any).DS_OPEN_COOKIE_PREFS;
    if (typeof fn === "function") fn();
  }

  return (
    <button
      type="button"
      onClick={openPrefs}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg font-medium"
    >
      Manage cookie preferences
    </button>
  );
}