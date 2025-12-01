import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("../pages/Home"));
const Result = lazy(() => import("../pages/Result"));
const Saved = lazy(() => import("../pages/Saved"));

export default function SiteRoute() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/saved' element={<Saved />} />
      </Routes>
    </Suspense>
  );
}