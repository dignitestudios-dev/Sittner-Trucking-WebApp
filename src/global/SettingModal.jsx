import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { db, doc, setDoc, getDoc } from "../firbase/FirebaseInit";
import { toast } from "react-toastify";

export default function SettingModal({ isOpen, setIsOpen }) {
  const [days, setDays] = useState(7); // default
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // ✅ Fetch the current reminder setting from Firestore
  useEffect(() => {
    const fetchSetting = async () => {
      try {
        setFetching(true);
        const ref = doc(db, "settings", "reminder");
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          setDays(data.days || 7);
        }
      } catch (err) {
        console.error("Error fetching reminder setting:", err);
        toast.error("Failed to fetch reminder setting.");
      } finally {
        setFetching(false);
      }
    };

    if (isOpen) fetchSetting(); // fetch only when modal opens
  }, [isOpen]);

  const handleSave = async () => {
    try {
      if (!days || days <= 0) {
        toast.error("Please enter a valid number of days.");
        return;
      }

      setLoading(true);

      // 🔥 Save in Firestore
      await setDoc(doc(db, "settings", "reminder"), {
        days: Number(days),
        updatedAt: new Date(),
      });

      toast.success("Reminder setting saved successfully!");
      setIsOpen(false);
    } catch (err) {
      console.error("Error saving setting:", err);
      toast.error("Failed to save setting.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="h-screen">
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="w-[450px] h-auto">
          <div className="border-0 rounded-[16px] p-5 shadow-lg flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-[600] text-[18px]">
                Set Reminder Email Setting
              </h3>
              <button onClick={() => setIsOpen(false)}>
                <IoMdClose size={22} />
              </button>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-4">
              <label className="font-medium text-[15px] text-gray-700">
                Send reminder after how many days?
              </label>

              {fetching ? (
                <p className="text-gray-500 text-sm">Loading current setting...</p>
              ) : (
                <input
                  type="number"
                  min="1"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  placeholder="Enter number of days"
                />
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end mt-5">
              <button
                onClick={handleSave}
                disabled={loading || fetching}
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Setting"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* background overlay */}
      <div className="opacity-25 fixed h-screen inset-0 z-40 bg-black"></div>
    </div>
  );
}
