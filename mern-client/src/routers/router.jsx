import {
  createBrowserRouter
} from "react-router-dom";
import App from "../App";
import Shop from "../shop/Shop";
import About from "../components/About";

import Home from "../home/Home";

//import SingleCar from "../shop/SingleCar";

import WhyUs from "../home/WhyUs";
import Contact from "../components/Contact";
import Basket from "../components/Basket";
import Information from "../components/Information";
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import Upload from "../dashboard/UploadCar";
import ManageCars from "../dashboard/ManageCars";
import EditCars from "../dashboard/EditCars";
import ManageContact from "../dashboard/ManageContact";
import ManageReview from "../dashboard/ManageReview";
import UploadService from "../dashboard/UploadService";
import ManageService from "../dashboard/ManageService";
import EditService from "../dashboard/EditService";
import SignIn from "../client/SignIn";
import SignUp from "../client/SignUp";
import ChangePassword from "../dashboard/ChangePassword";
import LogOut from "../dashboard/LogOut";
import SingleArticle from "../shop/SingleArticle";
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
        element:<Basket/>
      },
      {
        path: '/information',
        element: <Information />
      },


      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: "/car/:id",
        element: <SingleArticle />,
        loader: ({ params }) => fetch(`http://localhost:5000/car/${params.id}`)
      },





    ]
  },
  {
    path: '/signin',
    element: <SignIn />
  },
  {
    path: '/signup',
    element: < SignUp />
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
        path: '/admin/dashboard/upload-cars',
        element: <Upload />
      },
      {
        path: '/admin/dashboard/manage-cars',
        element: <ManageCars />
      },
      {
        path: '/admin/dashboard/edit-cars/:id',
        element: <EditCars />,
        loader: ({ params }) => fetch(`http://localhost:5000/article/${params.id}`)
      },
      {
        path: '/admin/dashboard/manage-contact',
        element: <ManageContact />

      },
      {
        path: '/admin/dashboard/manage-review',
        element: <ManageReview />

      },
      {
        path: '/admin/dashboard/upload-services',
        element: <UploadService />
      },
      {
        path: '/admin/dashboard/manage-service',
        element: <ManageService />

      },
      {
        path: '/admin/dashboard/edit-service/:id',
        element: <EditService />,
        loader: ({ params }) => fetch(`http://localhost:5000/promo/${params.id}`)
      },
      {
        path: '/admin/dashboard/change-password/:id',
        element: <ChangePassword />,
        loader: ({ params }) => fetch(`http://localhost:5000/signin/${params.id}`)
      },
      {
        path: '/admin/dashboard/logout',
        element: <LogOut />

      }

    ]
  }

]);
export default router;