import { createRoot } from "react-dom/client";
import TodoList from "./pages/TodoList.jsx";
import CardGame from "./pages/CardGame.jsx";
import MainLayout from "./pages/ContextStudy/MainLayout.jsx";
import TodoLayout from "./pages/TodoStudy/TodoLayout.jsx";

createRoot(document.getElementById("root")).render(<TodoLayout />);
