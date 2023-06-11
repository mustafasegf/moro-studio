import React from "react";

export default function DraftList() {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <div className="py-5">
          <div className="mx-auto max-w-4xl px-6">
            <h1 className="my-8 text-center text-3xl font-bold">Draft Email</h1>
            <div className="mb-4 flex justify-end">
              <a
                href="createblast"
                className="rounded-md bg-blue px-6 py-2 text-white-grey hover:bg-[#6380BB]"
              >
                + Buat email blast baru
              </a>
            </div>
            <div className="flex justify-center">
              {/* Loop through blog posts here */}
              <div className="bg-white-grey border border-medium-grey w-full max-w-2xl overflow-hidden rounded-lg shadow-md">
                <div className="p-4">
                  <p className="text-sm">12/05/2013</p>
                  <p className="mt-2 text-xl font-bold">
                    Halo Ini Judul Email Blast Terkirim
                  </p>
                  <p className="mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis varius tellus ligula, at dapibus enim rutrum sit amet.
                    Nullam malesuada feugiat justo ut feugiat. Curabitur
                    venenatis bibendum arcu id semper. Sed eget velit ac ex
                    finibus facilisis.
                  </p>
                </div>
              </div>
              {/* End of loop */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
