import NotFound from "@/views/not-found/NotFound.vue";
import Employee from "@/views/employee/Employee.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "",
      redirect: "/employee",
    },
    {
      path: "/employee",
      component: Employee,
    },
    {
      path: "/:pathMatch(.*)*",
      component: NotFound,
    },
  ],
});

export default router;
