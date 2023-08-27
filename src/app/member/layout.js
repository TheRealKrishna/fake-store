import ProfileBox from "../components/profileBox";

export default function RootLayout({ children }) {
    return (<>
        <ProfileBox element = {children}/>
        </>
    )
  }