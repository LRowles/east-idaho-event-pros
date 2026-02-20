import { useParams, Navigate } from "react-router-dom";

const MenuCategory = () => {
  const { menuSlug } = useParams<{ menuSlug: string }>();
  return <Navigate to={`/menus#section-${menuSlug}`} replace />;
};

export default MenuCategory;
