import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='min-h-screen bg-linear-to-br from-blue-50 to-indigo-100'>

      {/* hero */}
      <div className='container mx-auto px-4 py-16'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-5xl md:text-6xl font-bold text-gray-900 mb-6'>
            Kontrak Kerja Aman?<br />
            <span className='text-blue-600'>Cek Sekarang</span>
          </h1>

          <p className='text-xl text-gray-700 mb-8 max-w-2xl mx-auto'>
            AI analyzer kontrak kerja Indonesia. Temukan red flags dalam 2 menit.
          </p>

          <Link 
            to="/upload"
            className='inline-block bg-blue-600 text-white text-lg font-semibold px-8 py-4
                      rounded-lg hover:bg-blue-700 transition shadow-lg'
          >
            Cek Kontrak Gratis →
          </Link>

          <p className='text-sm text-gray-600 mt-4'>
             ✓ 100% Gratis  ✓ Data Aman  ✓ Hasil Instant
          </p>
        </div>
      </div>

      {/* problem section */}
      <div className='bg-white py-16'>
        <div className='container mx-auto px-4'>
          <div className='max-w-3xl mx-auto'>
            <h2 className='text-3xl font-bold text-center mb-12'>
              Pernah TTD Kontrak Tanpa Paham Isinya?
            </h2>

            <div className='grid md:grid-cols-3 gap-6'>
              
              <div className='text-center p-6'>
                <div className='text-4xl mb-3'>😰</div>
                <h3 className='font-semibold mb-2'>Gaji Nggak Jelas</h3>
                <p className='text-sm text-gray-600'>
                  Breakdown nggak detail, potongan-potongan mistis
                </p>
              </div>

              <div className='text-center p-6'>
                <div className='text-4xl mb-3'>⏰</div>
                <h3 className='font-semibold mb-2'>Lembur Nggak Dibayar</h3>
                <p className='text-sm text-gray-600'>
                  Jam kerja dan job desk nggak jelas, lembur dianggap "kewajiban"
                </p>
              </div>

              <div className='text-center p-6'>
                <div className='text-4xl mb-3'>🚫</div>
                <h3 className='font-semibold mb-2'>Resign Susah</h3>
                <p className='text-sm text-gray-600'>
                  Notice period berbulan-bulan, denda jutaan
                </p>
              </div>
              
            </div>

          </div>
        </div>
      </div>

    {/* how it works */}
    <div className='py-16'>
      <div className='container mx-auto px-4'>
        <div className='max-w-3xl max-auto'>
          <h2 className='text-3xl font-bold text-center mb-12'>
            Cara Kerja
          </h2>

          <div className='space-y-6'>
            <div className='flex gap-4 items-start bg-white p-6 rounded-lg shadow'>
              <div className='shrink-0 size-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold'>
                1
              </div>
              <div>
                <h3 className='font-semibold mb-1'>Upload Kontrak Kerja (PDF)</h3>
                <p className='text-gray-600 text-sm'>
                  Drag & drop atau pilih file kontrak
                </p>
              </div>
            </div>

            <div className='flex gap-4 items-start bg-white p-6 rounded-lg shadow'>
              <div className='shrink-0 size-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold'>
                2
              </div>
              <div>
                <h3 className='font-semibold mb-1'>AI Analisis (15-40 detik)</h3>
                <p className='text-gray-600 text-sm'>
                  AI scan berdasarkan UU Ketenagakerjaan Indonesia
                </p>
              </div>
            </div>

            <div className='flex gap-4 items-start bg-white p-6 rounded-lg shadow'>
              <div className='shrink-0 size-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold'>
                3
              </div>
              <div>
                <h3 className='font-semibold mb-1'>Terima Hasil Lengkap</h3>
                <p className='text-gray-600 text-sm'>
                  Risk Score, red flags, dan rekomendasi
                </p>
              </div>
            </div>
          </div>

          <div className='text-center mt-12'>
            <Link 
              to="/upload"
              className='inline-block bg-blue-600 text-white font-semibold px-6 py-3
                        rounded-lg hover:bg-blue-700 transition'
            >
              Mulai Sekarang - Gratis
            </Link>
          </div>
        </div>
      </div>
    </div>

    {/* footer */}
    <div className='bg-gray-900 text-white py-8' >
      <div className='container mx-auto px-4 text-center'>
        <p className='text-sm text-gray-400'>
          KontrakAman © 2025 • Powered by AI
        </p>
        <p className='text-xs text-gray-500 mt-2'>
          Disclaimer: Alat bantu. Konsultasi dengan lawyer untuk keputusan legal
        </p>
      </div>
    </div>

  </div>
  )
}