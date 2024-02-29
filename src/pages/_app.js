import "@/styles/globals.css";
import { MainLayout } from "@/Components";
import { DataProvider } from "@/DataContext";
import Head from "next/head";
import { useEffect } from "react";
import api from "@/utils/api";

export default function App({ Component, pageProps }) {
  // useEffect(() => {
  //   // Yandex.Metrika counter script
  //   (function (m, e, t, r, i, k, a) {
  //     m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
  //     m[i].l = 1 * new Date();
  //     for (var j = 0; j < document.scripts.length; j++) {
  //       if (document.scripts[j].src === r) { return; }
  //     }
  //     k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a);
  //   })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

  //   ym(95260097, "init", {
  //     clickmap: true,
  //     trackLinks: true,
  //     accurateTrackBounce: true,
  //     webvisor: true,
  //     ecommerce: "dataLayer"
  //   });
  // }, []);

  // useEffect(() => {
  //   document.addEventListener('contextmenu', event => event.preventDefault());

  //   document.onkeydown = function (e) {
  //     // disable F12 key
  //     if (e.keyCode == 123) {
  //       return false;
  //     }

  //     // disable I key
  //     if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
  //       return false;
  //     }

  //     // disable J key
  //     if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
  //       return false;
  //     }

  //     // disable U key
  //     if (e.ctrlKey && e.keyCode == 85) {
  //       return false;
  //     }
  //   };
  // }, []);

  return (
    <DataProvider>
      <Head>
        <meta name="description" content="klaviaturada tez yozish, klaviaturada tez yozish online, klaviaturada tez yozish o'yin, Islombek Baxromov, alicoder, alicoder.uz" />
        <meta name="robots" content="klaviaturada tez yozish, klaviaturada tez yozish online, klaviaturada tez yozish o'yin, Islombek Baxromov, alicoder, alicoder.uz" />
        <meta name="googlebot" content="klaviaturada tez yozish, klaviaturada tez yozish online, klaviaturada tez yozish o'yin, Islombek Baxromov, alicoder, alicoder.uz" />
        <meta name="google" content="klaviaturada tez yozish, klaviaturada tez yozish online, klaviaturada tez yozish o'yin, Islombek Baxromov, alicoder, alicoder.uz" />
        <meta name="keywords" content="HTML, CSS, JavaScript, klaviaturada tez yozish, klaviaturada tez yozish online, klaviaturada tez yozish o'yin, Islombek Baxromov, alicoder, alicoder.uz, amaliyot, klaviaturada, klaviatura, islom, baxromov, tez yozish, klaviaturada yozish" />
        <meta name="author" content="Islom Baxromov || Alicoder.uz || Alicoder" />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.1.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <title>Yoshdasturchi</title>
      </Head>
      <MainLayout  >
        <div className="minHeight">
          <Component  {...pageProps} />
        </div>
      </MainLayout>
    </DataProvider>
  );
}
