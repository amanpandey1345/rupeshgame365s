import Header from '@/components/Header';

import '@/designs/style.css'
import 'bootstrap/dist/css/bootstrap.css';
import Nav from '@/components/Nav';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import RoomNav from '@/components/RoomNav';


export const metadata = {
  title: 'Bluestar365',
  description: 'Bluestar365 Betting App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <AuthProvider>
        <Header/>
        <Nav/>
        <RoomNav/>
        {children}
        </AuthProvider>
      </body>
    </html>
  )
}
