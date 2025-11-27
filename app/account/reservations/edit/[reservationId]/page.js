import UpdateReservation from "@/app/_components/UpdateReservation";
import { auth } from "@/app/_lib/auth";
import { getBookings, getCabin, getBooking } from "@/app/_lib/data-service";
import Link from "next/link";
import { redirect } from "next/navigation";

export function generateMetadata({ params }) {
  return { title: `Edit Reservation ${params.reservationId}` };
}

export default async function Page({ params }) {
  const session = await auth();
  if (!session) redirect("/account");

  const reservationId = parseInt(params.reservationId, 10);
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(reservationId))
    return (
      <main className="text-center space-y-6 mt-4">
        <h1 className="text-3xl font-semibold">
          You are not allowed to update this booking
        </h1>
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

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{bookingDetail.id}
      </h2>

      <UpdateReservation
        bookingDetail={bookingDetail}
        maxCapacity={maxCapacity}
      />
    </div>
  );
}
