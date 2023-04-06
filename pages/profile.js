import { getSession } from 'next-auth/react';
import UserProfile from '../components/profile/user-profile';

function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context){
  // Return null object if user is not auth and complete object if it is
const session = await getSession({req: context.req})

if(!session){
  return {
    redirect: {
      destination: '/auth',
      permanent: false
    }
  }
}

  return {
    props:{session},
  }
}

export default ProfilePage;
