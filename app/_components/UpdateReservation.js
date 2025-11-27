"use client";

import { useTransition } from "react";
import { updateReservation } from "@/app/_lib/actions";
import SpinnerMini from "./SpinnerMini";

function UpdateReservation({ bookingDetail, maxCapacity }) {
  const [isPending, startTransition] = useTransition();

  function handleUpdate(formData) {
    startTransition(() => updateReservation(bookingDetail.id, formData));
  }

  return (
    <form
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      action={handleUpdate}
    >
      <div className="space-y-2">
        <label htmlFor="numGuests">How many guests?</label>
        <select
          name="numGuests"
          id="numGuests"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:bg-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed"
          required
          defaultValue={bookingDetail.numGuests}
          disabled={isPending}
        >
          <option value="" key="">
            Select number of guests...
          </option>
          {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          name="observations"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
          defaultValue={bookingDetail.observations}
          disabled={isPending}
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <button
          className="bg-accent-500 px-8 py-4  text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-400 w-64 flex flex-row items-center justify-center"
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex flex-row items-center gap-3">
              <SpinnerMini />
              <span>Updating...</span>
            </div>
          ) : (
            "Update reservation"
          )}
        </button>
      </div>
    </form>
  );
}

export default UpdateReservation;
