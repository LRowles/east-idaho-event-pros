import { Navigate, useLocation } from "react-router-dom";
import { resolveLegacyPath } from "@/lib/legacyRoutes";
import NotFound from "@/pages/NotFound";

const LegacyRedirect = () => {
  const location = useLocation();
  const target = resolveLegacyPath(location.pathname);
  if (!target) return <NotFound />;
  return <Navigate replace to={`${target}${location.search}${location.hash}`} />;
};

export default LegacyRedirect;