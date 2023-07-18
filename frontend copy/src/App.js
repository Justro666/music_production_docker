import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/Layouts/RootLayout';
import ErrorPage from './components/Layouts/ErrorPage';
import HomePage from './pages/Home/HomePage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Artworks from './pages/Home/Artworks';
import DesignArtwork from './pages/Home/DesignArtwork';
import EditArtwork from './pages/Home/EditArtwork';
import Mastering from './pages/Home/Mastering';
import EditMastering from './pages/Home/EditMastering';
import PreviewMastering from './pages/Home/PreviewMastering';
import ProductManager from './pages/ProductManager/ProductManager';
import AddMusicData from './pages/ProductManager/AddMusicData';
import PreviewMusicData from './pages/ProductManager/PreviewMusicData';
import Identity from './pages/Identity/Identity';
import MyCollections from './pages/MyCollections/MyCollections';
import Music from './pages/Music/Music';
import PreviewIdentity from './pages/Identity/PreviewIdentity';
import TeamMember from './pages/TeamMember/TeamMember';
import Settings from './pages/Settings/Settings';
import EditDocuments from './pages/Settings/EditDocuments';
import Profile from './pages/Profile/Profile';
import PreviewProfile from './pages/Profile/PreviewProfile';
import TeamMemberPermission from './pages/TeamMember/TeamMemberPermission';
import AddMember from './pages/TeamMember/AddMember';
import UploadingMusic from './pages/UploadingMusic/UploadingMusic';
import RequestMember from './pages/TeamMember/RequestMember';
import JoinArtists from './pages/Login/JoinArtists';
import { useState } from 'react';
import Notifications from './pages/Notifications/Notifications';
import RouteGuard from './shares/RouteGuard';
import RouteGuardAuth from './shares/RouteGuardAuth';
import Lobby from './pages/Login/Lobby';

function App() {
  const [mainTitle, setMainTitle] = useState(
    'Welcome To Your Client Dashboard,'
  );

  const cloud = () => {
    setMainTitle('Welcome to your Cloud Storage');
  };

  const otherPage = () => {
    setMainTitle('Welcome To Your Client Dashboard,');
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <RouteGuard>
          <RootLayout
            mainTitle={mainTitle}
            cloud={cloud}
            otherPage={otherPage}
          />
        </RouteGuard>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <RouteGuard>
              <HomePage />
            </RouteGuard>
          ),
        },
        {
          path: 'uploadingMusic',
          element: (
            <RouteGuard>
              <UploadingMusic />
            </RouteGuard>
          ),
        },
        {
          path: 'artworks',
          element: (
            <RouteGuard>
              <Artworks />
            </RouteGuard>
          ),
        },
        {
          path: 'artworks/designArtwork',
          element: (
            <RouteGuard>
              <DesignArtwork />
            </RouteGuard>
          ),
        },
        {
          path: 'artworks/edit/:id',
          element: (
            <RouteGuard>
              <EditArtwork />
            </RouteGuard>
          ),
        },
        {
          path: 'mastering',
          element: (
            <RouteGuard>
              <Mastering />
            </RouteGuard>
          ),
        },
        {
          path: 'mastering/edit/:id',
          element: (
            <RouteGuard>
              <EditMastering />
            </RouteGuard>
          ),
        },
        {
          path: 'mastering/edit/:id/preview',
          element: (
            <RouteGuard>
              <PreviewMastering />
            </RouteGuard>
          ),
        },
      ],
    },
    {
      path: '/mycollections',
      element: (
        <RouteGuard>
          <RootLayout
            mainTitle={mainTitle}
            cloud={cloud}
            otherPage={otherPage}
          />
        </RouteGuard>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <RouteGuard>
              <MyCollections />
            </RouteGuard>
          ),
        },
      ],
    },
    {
      path: '/productManager',
      element: (
        <RouteGuard>
          <RootLayout
            mainTitle={mainTitle}
            cloud={cloud}
            otherPage={otherPage}
          />
        </RouteGuard>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <RouteGuard>
              <ProductManager />
            </RouteGuard>
          ),
        },
        {
          path: 'edit/:id',
          element: (
            <RouteGuard>
              <AddMusicData />
            </RouteGuard>
          ),
        },
        {
          path: 'edit/:id/preview',
          element: (
            <RouteGuard>
              <PreviewMusicData />
            </RouteGuard>
          ),
        },
      ],
    },
    {
      path: '/music',
      element: (
        <RouteGuard>
          <RootLayout
            mainTitle={mainTitle}
            cloud={cloud}
            otherPage={otherPage}
          />
        </RouteGuard>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <RouteGuard>
              <Music />
            </RouteGuard>
          ),
        },
      ],
    },
    {
      path: '/teamMember',
      element: (
        <RouteGuard>
          <RootLayout
            mainTitle={mainTitle}
            cloud={cloud}
            otherPage={otherPage}
          />
        </RouteGuard>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <RouteGuard>
              <TeamMember />
            </RouteGuard>
          ),
        },
        {
          path: 'permission',
          element: (
            <RouteGuard>
              <TeamMemberPermission />
            </RouteGuard>
          ),
        },
        {
          path: 'permission/addMember',
          element: (
            <RouteGuard>
              <AddMember />
            </RouteGuard>
          ),
        },
        {
          path: 'requestMember',
          element: (
            <RouteGuard>
              <RequestMember />
            </RouteGuard>
          ),
        },
      ],
    },
    {
      path: '/notifications',
      element: (
        <RouteGuard>
          <RootLayout
            mainTitle={mainTitle}
            cloud={cloud}
            otherPage={otherPage}
          />
        </RouteGuard>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <RouteGuard>
              <Notifications />
            </RouteGuard>
          ),
        },
      ],
    },
    {
      path: '/settings',
      element: (
        <RouteGuard>
          <RootLayout
            mainTitle={mainTitle}
            cloud={cloud}
            otherPage={otherPage}
          />
        </RouteGuard>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <RouteGuard>
              <Settings />
            </RouteGuard>
          ),
        },
        {
          path: 'documents/edit/:id',
          element: (
            <RouteGuard>
              <EditDocuments />
            </RouteGuard>
          ),
        },
      ],
    },
    {
      path: '/profile',
      element: (
        <RouteGuard>
          <RootLayout
            mainTitle={mainTitle}
            cloud={cloud}
            otherPage={otherPage}
          />
        </RouteGuard>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <RouteGuard>
              <Profile />
            </RouteGuard>
          ),
        },
        {
          path: 'previewProfile',
          element: (
            <RouteGuard>
              <PreviewProfile />
            </RouteGuard>
          ),
        },
        {
          path: 'identity',
          element: (
            <RouteGuard>
              <Identity />
            </RouteGuard>
          ),
        },
        {
          path: 'previewIdentity',
          element: (
            <RouteGuard>
              <PreviewIdentity />
            </RouteGuard>
          ),
        },
      ],
    },
    {
      path: '/login',
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <RouteGuardAuth>
              <Login />
            </RouteGuardAuth>
          ),
        },
        {
          path: 'joinArtists',
          element: (
            <RouteGuardAuth>
              <JoinArtists />
            </RouteGuardAuth>
          ),
        },
      ],
    },
    {
      path: '/register',
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <RouteGuardAuth>
              <Register />
            </RouteGuardAuth>
          ),
        },
      ],
    },
    {
      path: '/lobby',
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <RouteGuardAuth>
              <Lobby />
            </RouteGuardAuth>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
