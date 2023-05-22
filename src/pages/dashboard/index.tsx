import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { Chart, ChartDataset, registerables } from "chart.js";
import { Booking } from "@prisma/client";
import { LoadingPage } from "~/component/loading";
import Dropdown from "~/component/Dropdown";
import { getServerAuthSession } from "~/utils/session";
import { GetServerSidePropsContext } from "next";
Chart.register(...registerables);

declare global {
  interface HTMLCanvasElement {
    chart: any; // Specify the type of the 'chart' property here
  }
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = getServerAuthSession(ctx);
  if (!session) {
    return { redirect: { destination: "/login" } };
  }
  if (session.role !== ("admin" || "studioManager")) {
    return { redirect: { destination: "/" } };
  }

  return { props: {} };
}

export default function Dashboard() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const { data, isLoading, error } = api.booking.findAllBooking.useQuery();
  const katalog = api.catalogue.getAllCatalogue.useQuery();
  const [yearOptions, setYearOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [katalogNames, setKatalogNames] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    if (data) {
      // Map katalog id to katalog name
      if (katalog.data)
        setKatalogNames(
          Array.from(new Set(data.map((booking) => booking.katalogId))).map(
            (katalogId) => ({
              value: katalogId,
              label:
                katalog.data.find((katalog) => katalog.id === katalogId)
                  ?.nama || "Katalog tidak ditemukan",
            })
          )
        );

      // Set year options
      setYearOptions(
        Array.from(
          new Set(data.map((booking) => booking.jadwal.getFullYear()))
        ).map((year) => ({ value: year.toString(), label: year.toString() }))
      );

      // Set default year and month
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      setYear(currentYear.toString());
      setMonth(currentMonth.toString());

      // Update chart
      updateBookingChart(data, currentYear, currentMonth);
    }
  }, [data]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  interface MonthlyBooking {
    month: string;
    counts: { [key: string]: number };
  }

  interface DailyBooking {
    day: string;
    counts: { [key: string]: number };
  }

  function updateBookingChart(
    bookingData: Booking[],
    year: number,
    month: number
  ) {
    // Agregasi jumlah booking per bulan dan tipe paket
    const monthlyBookings: MonthlyBooking[] = [];
    const dailyBookings: DailyBooking[] = [];
    bookingData.forEach((booking) => {
      const katalogName =
        katalogNames.find((katalog) => katalog.value === booking.katalogId)
          ?.label || "Katalog Asing";
      console.log(katalogName); // penting!!
      const bookingYear = booking.jadwal.getFullYear();
      const bookingMonth = booking.jadwal.getMonth() + 1;
      if (bookingYear === year && (month === 0 || bookingMonth === month)) {
        const month = booking.jadwal.getMonth(); // Mendapatkan nilai bulan (0-11)
        const monthLabel = `${year}-${month + 1}`; // Format bulan sebagai "YYYY-MM"
        const existingMonth = monthlyBookings.find(
          (mb) => mb.month === monthLabel
        );
        if (existingMonth) {
          existingMonth.counts[katalogName] =
            (existingMonth.counts[katalogName] || 0) + 1;
        } else {
          const counts: { [key: string]: number } = {};
          counts[katalogName] = 1;
          monthlyBookings.push({ month: monthLabel, counts });
        }

        const day = booking.jadwal.getDate(); // Mendapatkan nilai tanggal (1-31)
        const dayLabel = `${year}-${month + 1}-${day}`; // Format tanggal sebagai "YYYY-MM-DD"
        const existingDay = dailyBookings.find((db) => db.day === dayLabel);
        if (existingDay) {
          existingDay.counts[katalogName] =
            (existingDay.counts[katalogName] || 0) + 1;
        } else {
          const counts: { [key: string]: number } = {};
          counts[katalogName] = 1;
          dailyBookings.push({ day: dayLabel, counts });
        }
      }
    });

    // Mengisi data kosong untuk bulan yang tidak memiliki booking
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const monthLabel = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }`;
      if (!monthlyBookings.some((mb) => mb.month === monthLabel)) {
        monthlyBookings.push({ month: monthLabel, counts: {} });
      }
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    // Mengisi data kosong untuk tanggal yang tidak memiliki booking
    const startDay = new Date(year, month - 1, 1);
    const endDay = new Date(year, month, 0);

    const currentDay = new Date(startDay);
    while (currentDay <= endDay) {
      const dayLabel = `${currentDay.getFullYear()}-${
        currentDay.getMonth() + 1
      }-${currentDay.getDate()}`;
      if (!dailyBookings.some((db) => db.day === dayLabel)) {
        dailyBookings.push({ day: dayLabel, counts: {} });
      }
      currentDay.setDate(currentDay.getDate() + 1);
    }

    let labels: string[] = [];
    const datasets: ChartDataset<"bar">[] = [];
    const uniquePackages = Array.from(
      new Set(
        bookingData.map(
          (booking) =>
            katalogNames.find((katalog) => katalog.value === booking.katalogId)
              ?.label || "Katalog Asing"
        )
      )
    );
    if (month === 0) {
      // Urutkan data per bulan berdasarkan bulan
      monthlyBookings.sort(
        (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()
      );
      labels = monthlyBookings.map((mb) => mb.month);
      uniquePackages.forEach((packageName, index) => {
        const counts = monthlyBookings.map((mb) => mb.counts[packageName] || 0);
        const backgroundColor = `rgba(75, 192, 192, ${
          (index + 1) / (uniquePackages.length + 1)
        })`;
        const borderColor = `rgba(75, 192, 192, 1)`;
        datasets.push({
          label: packageName,
          data: counts,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        });
      });
    } else {
      dailyBookings.sort(
        (a, b) => new Date(a.day).getTime() - new Date(b.day).getTime()
      );
      labels = dailyBookings.map((db) => db.day);
      uniquePackages.forEach((packageName, index) => {
        const counts = dailyBookings.map((db) => db.counts[packageName] || 0);
        const backgroundColor = `rgba(75, 192, 192, ${
          (index + 1) / (uniquePackages.length + 1)
        })`;
        const borderColor = `rgba(75, 192, 192, 1)`;
        datasets.push({
          label: packageName,
          data: counts,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        });
      });
    }

    const chartId = "bookingChart"; // ID elemen canvas untuk menampilkan chart
    const chartElement = document.getElementById(
      chartId
    ) as HTMLCanvasElement & {
      chart: Chart;
    };
    chartElement.style.height = "400px";
    chartElement.style.width = "100%";

    if (chartElement) {
      // Hapus instance chart sebelumnya jika ada
      const existingChart = Chart.getChart(chartElement);
      if (existingChart) {
        existingChart.destroy();
      }

      chartElement.chart = new Chart(chartElement, {
        type: "bar",
        data: {
          labels: labels,
          datasets: datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true,
              stacked: true,
              ticks: {
                stepSize: 1,
              },
            },
            y: {
              beginAtZero: true,
              stacked: true,
              ticks: {
                stepSize: 5,
              },
            },
          },
        },
      });
    }
  }

  function handleSelectMonth(value: string) {
    if (!data) {
      return;
    }
    setMonth(value);
    updateBookingChart(data, parseInt(year), parseInt(value));
  }

  function handleSelectYear(value: string) {
    if (!data) {
      return;
    }
    setYear(value);
    updateBookingChart(data, parseInt(value), parseInt(month));
  }

  const monthOptions = [
    { value: "0", label: "Semua" },
    { value: "1", label: "Januari" },
    { value: "2", label: "Februari" },
    { value: "3", label: "Maret" },
    { value: "4", label: "April" },
    { value: "5", label: "Mei" },
    { value: "6", label: "Juni" },
    { value: "7", label: "Juli" },
    { value: "8", label: "Agustus" },
    { value: "9", label: "September" },
    { value: "10", label: "Oktober" },
    { value: "11", label: "November" },
    { value: "12", label: "Desember" },
  ];

  return (
    <>
      <h1 className="my-8 text-center text-3xl font-bold">Studio Dashboard</h1>
      <div className="flex min-h-full items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className=" shadow sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-4 gap-6">
              <div className="col-span-3">
                <canvas id="bookingChart"></canvas>
              </div>
              <div className="">
                <label>Tahun:</label>
                <Dropdown
                  options={yearOptions}
                  selectedValue={month}
                  onSelect={handleSelectYear}
                />
                <br />
                <label>Bulan:</label>
                <Dropdown
                  options={monthOptions}
                  selectedValue={month}
                  onSelect={handleSelectMonth}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
