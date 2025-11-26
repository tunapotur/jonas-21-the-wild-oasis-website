import { auth } from "@/app/_lib/auth";
import { getBookings, getCabin, getBooking } from "@/app/_lib/data-service";
import Link from "next/link";

export function generateMetadata({ params }) {
  return { title: `Edit Reservation ${params.reservationId}` };
}

export default async function Page({ params }) {
  const reservationId = parseInt(params.reservationId, 10);
  const session = await auth();
  const bookings = await getBookings(session.user.guestId);
  const reservation = bookings.find((booking) => booking.id === reservationId);

  if (!reservation)
    return (
      <main className="text-center space-y-6 mt-4">
        <h1 className="text-3xl font-semibold">This is wrong reservation :(</h1>
        <Link
          href="/account/reservations"
          className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        >
          Back to yours reservation
        </Link>
      </main>
    );

  const bookingDetail = await getBooking(reservationId);
  const cabin = await getCabin(bookingDetail.cabinId);
  const maxCapacity = cabin.maxCapacity;

  /*
    const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;
*/

  if (!bookingDetail)
    return (
      <main className="text-center space-y-6 mt-4">
        <h1 className="text-3xl font-semibold">This is wrong reservation :(</h1>
        <Link
          href="/account/reservations"
          className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        >
          Back to yours reservation
        </Link>
      </main>
    );

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{bookingDetail.id}
      </h2>

      <form className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
            defaultValue={bookingDetail.numGuests}
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
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultValue={bookingDetail.observations}
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Update reservation
          </button>
        </div>
      </form>
    </div>
  );
}
