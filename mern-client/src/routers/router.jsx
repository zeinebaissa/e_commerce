import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Shop from "../shop/Shop";
import About from "../components/About";
import Home from "../home/Home";
import SingleArticle from "../shop/SingleArticle";
import WhyUs from "../home/WhyUs";
import Basket from "../components/Basket";
import Information from "../components/Information";
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadArticle from "../dashboard/UploadArticle";
import ManageArticles from "../dashboard/ManageArticles";
import EditArticles from "../dashboard/EditArticles";
import ManageReview from "../dashboard/ManageReview";
import UploadPromotionCode from "../dashboard/UploadPromotionCode";
import ManagePromotionCode from "../dashboard/ManagePromotionCode";
import Orders from "../dashboard/ManageOrder";
import SignIn from "../client/SignIn";
import SignUp from "../client/SignUp";
import LogOut from "../dashboard/LogOut";
import EditUser from "../dashboard/EditUser";
import ManageUsers from "../dashboard/ManageUsers";
import EditInfo from "../components/EditInfo";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/shop',
        element: <Shop />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/whyus',
        element: <WhyUs />
      },
      {
        path: '/basket',
        element: <Basket />
      },

      {
        path: "/article/:id",
        element: <SingleArticle />,
        loader: ({ params }) => fetch(`http://localhost:5000/article/${params.id}`)
      },
      {
        path: "information/:id",
        element: <Information />,
        loader: ({ params }) => fetch(`http://localhost:5000/client/${params.id}`)
      },
      {
        path: "edit-info/:id",
        element: <EditInfo />,
        loader: ({ params }) => fetch(`http://localhost:5000/client/${params.id}`)
      },

      {
        path: "/",
        element: <Home />
      }
    ]
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,

  },


  {
    path: "/admin/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: '/admin/dashboard',
        element: <Dashboard />
      },
      {
        path: '/admin/dashboard/upload-Articles',
        element: <UploadArticle />
      },
      {
        path: '/admin/dashboard/manage-Articles',
        element: <ManageArticles />
      },
      {
        path: '/admin/dashboard/edit-Articles/:id',
        element: <EditArticles />,
        loader: ({ params }) => fetch(`http://localhost:5000/article/${params.id}`)
      },
      {
        path: '/admin/dashboard/manage-review',
        element: <ManageReview />
      },
      {
        path: '/admin/dashboard/manage-orders',
        element: <Orders />
      },
      {
        path: '/admin/dashboard/upload-promotion-code',
        element: <UploadPromotionCode />
      },
      {
        path: '/admin/dashboard/manage-promotion-code',
        element: <ManagePromotionCode />
      },
      {
        path: '/admin/dashboard/manage-users',
        element: <ManageUsers />
      },
      {
        path: '/admin/dashboard/edit-user/:id',
        element: <EditUser />,
        loader: ({ params }) => fetch(`http://localhost:5000/client/${params.id}`)
      },

      {
        path: '/admin/dashboard/logout',
        element: <LogOut />
      },
    ]
  }
]);

export default router;
