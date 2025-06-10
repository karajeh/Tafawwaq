"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Joi from "joi";

const ScheduleALesson: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [hours, setHours] = useState(1);
  const [price, setPrice] = useState(150);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  // Joi validation schema
  const schema = Joi.object({
    username: Joi.string().required().label("Username"),
    hours: Joi.number().min(1).required().label("Total hours"),
    price: Joi.number().min(150).required().label("Total price"),
    date: Joi.string().required().label("Date"),
    time: Joi.string().required().label("Time"),
    description: Joi.string().required().label("Description"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = { username, hours, price, date, time, description };
    const { error } = schema.validate(formData, { abortEarly: false });
    if (error) {
      // Collect errors into an object
      const fieldErrors: { [key: string]: string } = {};
      error.details.forEach((detail) => {
        const field = detail.path[0] as string;
        fieldErrors[field] = detail.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Clear previous errors
    setErrors({});

    // Submit logic here
    console.log("Lesson scheduled:", {
      ...formData,
      timeZone,
    });

    onClose(); // Close modal
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 z-10 backdrop-blur bg-[#344054B2] bg-opacity-50 flex items-center justify-center"
      onClick={(e) => {
        if ((e.target as HTMLElement).id === "modal-overlay") {
          onClose();
        }
      }}
    >
      <div
        className="bg-white rounded-lg p-6 w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Schedule a Lesson</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Please update the following fields to schedule a lesson.
        </p>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border border-slate rounded-md"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p className="text-red-500 text-xs">{errors.username}</p>
            )}
          </div>

          {/* Hours and Price */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total hours <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min={1}
                className="w-full p-2 border border-slate rounded-md"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value))}
              />
              {errors.hours && (
                <p className="text-red-500 text-xs">{errors.hours}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total price <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  min={150}
                  className="w-full p-2 border border-slate rounded-s-md"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                />
                <span className="p-2 border border-slate rounded-e-md">
                  AED
                </span>
              </div>
              {errors.price && (
                <p className="text-red-500 text-xs">{errors.price}</p>
              )}
            </div>
          </div>

          {/* Date and Time */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="w-full p-2 border border-slate rounded-md"
                value={date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDate(e.target.value)}
              />
              {errors.date && (
                <p className="text-red-500 text-xs">{errors.date}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                className="w-full p-2 border border-slate rounded-md"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              {errors.time && (
                <p className="text-red-500 text-xs">{errors.time}</p>
              )}
              {timeZone && (
                <p className="text-xs text-gray-500 mt-1">
                  Time Zone: {timeZone}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full p-2 border border-slate rounded-md"
              rows={4}
              placeholder="I can help with..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs">{errors.description}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate rounded-lg text-gray-600 w-1/2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#00ADEF] text-white rounded-lg w-1/2"
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleALesson;
